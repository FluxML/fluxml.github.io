---
title: Using Torch kernels inside Flux.jl
author: Dhairya Gandhi, Mike Innes
layout: blog
---

With [Flux.jl](https://github.com/Flux/Flux.jl), we built a flexible [differentiable programming](./2019-03-05-dp-vs-rl.md) framework. Using [Julia's GPU compiler](https://juliagpu.org), Flux is able to target [GPUs](https://fluxml.ai/Flux.jl/stable/gpu/). It is also able to target [TPUs](https://arxiv.org/pdf/1810.09868.pdf).

Here, we introduce [Torch.jl](https://github.com/FluxML/Torch.jl), a package that wraps the optimised kernels in Torch and PyTorch, for use in Julia. Even though Julia's GPU compiler is already pretty good for general use and under heavy development, we provide this package to leverage well-debugged high performance kernels that have been built by the community, much in the way we use BLAS and LAPACK for Linear Algebra. As an example we time the inference pass on a couple popular object detection models - ResNet50, ResNet101 and VGG19 - and compare these with our existing tooling.

![resnet50][../assets/2020-06-03-using-Torch-with-Flux-2/resnet50.png =500x400]
![resnet101][../assets/2020-06-03-using-Torch-with-Flux-2/resnet101.png =500x400]
![vgg][../assets/2020-06-03-using-Torch-with-Flux-2/vgg.png =500x400]
*All runs are with a Tesla K40 (12 GB), julia v1.4.2, Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz and 32 GB of DDR3 Memory*

This brings state of the art performance to Julia users who need it, and also identifies areas of improvement in the Julia GPU compiler stack, especially in the area of memory management.

## Usage

Adding the package using the Pkg, Julia's package manager is easy. However, note that at the time of writing, Torch.jl assumes the presence of a CUDA enabled GPU on the device it's being added to, and assumes linux as the OS.

### Moving models over to Torch kernels; introducing `torch`

With this package, we expect to make the move to using torch kernels as easy as it can be. Users of Flux would be familiar with calling `gpu(model)` to move large nested models over to using the CUDA kernels. The API for torch kernels is just as simple.

```julia
julia> using Metalhead

julia> resnet = ResNet()

julia> torch_resnet = resnet |> torch
```

Of course this is not just limited to `ResNet`. Many architectures would benefit from this, be they `VGG`, `DenseNet`, `Inception`s etc. Check out [Metalhead.jl](https://github.com/FluxML/Metalhead.jl) for some of these. It would also be useful for more performance critical models such as YOLO via [ObjectDetector.jl](https://github.com/r3tex/ObjectDetector.jl). In addition large, hard to train models like RCNNs would benefit from these kernels as well.

### Installation

```julia
# Type `]` to enter Pkg mode in the Julia REPL.
pkg> add Torch
[...] # Note that this downloads the Torch artifact, which is quite large

julia> using Torch
```

Once it has been installed, we can talk about the different functions that Torch.jl makes available.

## Simple, intuitive API

In addition, we expect to make as few but relevant assumptions about the kind of models that the ML community has been developing, and how we see their use grow in more fields than ever before, which is why we want these `Tensor`s to mimic Julia arrays closely

Torch.jl provides the `Tensor` type which closely follows the semantics of a regular Julia array, albeit being managed by torch. One can create a tensor with an API similar to `rand` or `zeros` etc.

```julia
julia> z = Tensor(3,3)
3×3 Tensor{Float32,2} :
 0.0  0.0  0.0
 0.0  0.0  0.0
 0.0  0.0  0.0
```

To control the device the tensor is loaded on (the default being on CPU), we use the `dev` keyword, available in most functions.

```julia
julia> z = Tensor(3,3, dev = 0)
3×3 Tensor{Float32,2} :
 0.0  0.0  0.0
 0.0  0.0  0.0
 0.0  0.0  0.0
```

Note that setting `dev` to `-1` implies the CPU, and `[0,...]` represent the id of the GPU we intend to load the tensor on. The default GPU is assumed to be `0`, for functions revelant to moving these tensors around. Torch.jl also emits the `torch` function which behaves like the `gpu` function already in Flux, moving over structs to Torch instead of CUDA.

```julia
julia> using Flux, Metalhead, Torch

julia> using Torch: torch

julia> resnet = ResNet() # from Metalhead
ResNet()

julia> tresnet = resnet |> torch
ResNet()
```

We can verify that that in fact moved our parameters of the model over to Torch by checking out the `params`.

```julia
julia> typeof.(Flux.params(tresnet))
212-element Array{DataType,1}:
 Tensor{Float32,4}
 Tensor{Float32,1}
[...]
```

It is also possible to move regular Julia arrays to and from torch using the `tensor` helper function.

```julia
julia> r = rand(Float32, 3,3)
3×3 Array{Float32,2}:
 0.435017  0.287086  0.105608
 0.636305  0.398222  0.0682819
 0.74551   0.944293  0.387852

julia> tr = tensor(r, dev = 0) # 0 => GPU:0
3×3 Tensor {Float32,2}:
 0.435017  0.287086  0.105608
 0.636305  0.398222  0.0682819
 0.74551   0.944293  0.387852

julia> collect(tr)
3×3 Array{Float32,2}:
 0.435017  0.287086  0.105608
 0.636305  0.398222  0.0682819
 0.74551   0.944293  0.387852
```

## Taking gradients

It is possible to use Julia's [Zygote.jl](https://github.com/Flux/Zygote.jl) reverse mode AD to differentiate the models, using Torch tensors as we would regular Julia `Array`s.

```julia
julia> ip = rand(Float32, 224, 224, 3, 1);

julia> tip = tensor(ip, dev = 0);

julia> gs = gradient(Flux.params(tresnet)) do
         sum(tresnet(tip))
       end;
```

We can now use this gradient to train our models.

## Additional Remarks

In Torch.jl, our aim is also to change as little user code as possible, making it easy to get started with. We further plan to integrate more kernels and provide features from Torch that Julia users might be interested in. For feature requests and issues you might have using Torch.jl, please open issues on our [GitHub issue tracker](https://github.com/Flux/Torch.jl/issues). Contributions via pull requests are highly encouraged!

Looking forward to seeing folks make use of it. Cheers!
