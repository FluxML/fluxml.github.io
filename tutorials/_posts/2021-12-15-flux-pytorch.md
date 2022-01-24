# Flux for PyTorch users

This tutorial is supposed to point PyTorch users to the right places to find equivalent operations and patterns in Flux.

## Arrays

Let's start with an array. Its simple enough in PyTorch.

```python
>>> import torch
>>> z = torch.zeros([1,2,3], dtype = torch.float32)
>>> z
tensor([[[0., 0., 0.],
         [0., 0., 0.]]])
>>> type(z)
<class 'torch.Tensor'>
```

In Flux, we use regular Julia arrays:

```julia
julia> zeros(Float32, 1, 2, 3)
1×2×3 Array{Float32, 3}:
[:, :, 1] =
 0.0  0.0

[:, :, 2] =
 0.0  0.0

[:, :, 3] =
 0.0  0.0
```

Notice that the way to pass in the "dtype" or element types is different between the two. Another difference is the shape of the retured array. While PyTorch leans on the Numpy array semantics by being row major, arrays in Julia are column major and are thus stored differently in memory.

Flux will support any number types or scientific quantities we throw at it out of the box as long as the number types have a reasonable coverage of the arithmetic/ numerical operations APIs.

## Defining a Model

PyTorch supports both an Object-oriented frontend API as well as a functional API (think `torch.nn.functional`). Flux does that too! Most of Flux models either support both, or reuse Julia Base functions to achieve the same effect. Flux does not differentiate between API written specifically in Flux or by other packages and the Julia Language.

```python
>>> from torch import nn
>>> neural_network = nn.Sequential(
...   nn.Linear(3,3),
...   nn.Linear(3,3))
```

```julia
julia> using Flux

julia> neural_network = Chain(
         Dense(3,3),
         Dense(3,3))
Chain(
  Dense(3, 3),                          # 12 parameters
  Dense(3, 3),                          # 12 parameters
)                   # Total: 4 arrays, 24 parameters, 352 bytes.
```

To define activations, PyTorch typically uses built-in versions for example:

```python
>>> sequence = nn.Sequential(
...   nn.Linear(3,3),
...   nn.ReLU())
```

In Flux, these activations and nonlinearities can be supplied either as separate transformations, or as part of the layer definition.

```julia
julia> Chain(
         Dense(3,3, relu),
         Dense(3,3))
Chain(
  Dense(3, 3, relu),                    # 12 parameters
  Dense(3, 3),                          # 12 parameters
)                   # Total: 4 arrays, 24 parameters, 352 bytes.
```

Of course, one can also substitute their own functions and those from other libraries from the Julia ecosystem as well.

```julia
julia> Dense(3,3, x -> x .+ one(x))
```

The `x -> ...` is an anonymous function; this is a regular Julia function albeit without a name. The closest analog in python is the `lambda` operator.

Flux tries to keep its API minimal but effective, which is why you wouldn't see a `linear` or `dense` functional analog to the `Dense` layer. Of course, Flux has functional forms of most other popular layers (ex. `conv`, `maxpool`). More details can be found in the [documentation for the layers](https://fluxml.ai/Flux.jl/stable/models/layers/).

## Backend Accelerator Support (GPUs, MKL, etc)

With most frameworks, the accelerator and BLAS support need to be explicitly handled by the frameworks including writing code that optimises specifically for the hardware the operations are expected to run on. In PyTorch this is handled by the `ATen` library and its subpackages that handle special support for CUDA. In Julia, we prefer to compose with libraries which implement such support generically.

In PyTorch, this is handled by `torch.cuda` and related packages. Typically, users are expected to manage where the objects live via the `torch.cude.device` invocation. Similarly, it is the users' resposiblity to ensure that accelerator backend such as MKL as available to PyTorch and active. This increases the complexity of both `PyTorch` itself and the user code. In Julia, the accelerator support is significantly more generic.

[CUDA.jl](https://cuda.juliagpu.org/stable/) implements the CUDA backend for Julia packages and exposes `CuArray`, a CUDA backed `Array` implementation. Using it, we are also able to get access to optimised libraries such as CUDNN and CUSPARSE. Flux exposes the `cpu` and `gpu` utility functions to control where objects live. Since Flux operations are largely generic, GPU backed arrays can be used efficiently with the same functions as CPU arrays. More details about the GPU support in Flux can be found in the [documentation section](https://fluxml.ai/Flux.jl/stable/gpu/).  Another example is the [MKL.jl](https://github.com/JuliaLinearAlgebra/MKL.jl). With Julia v1.7, it is possible to replace the BLAS library used at runtime. Julia uses OpenBLAS by default, but it is possible to use MKL in such a manner that no code changes are required to user code (or Flux, for that matter).

```julia
julia> using Flux, LinearAlgebra, BenchmarkTools

julia> LinearAlgebra.BLAS.get_config()
LinearAlgebra.BLAS.LBTConfig
Libraries:
└ [ILP64] libopenblas64_.so

julia> d = Dense(1000, 100, tanh)
Dense(1000, 100, tanh)  # 100_100 parameters

julia> x = rand(Float32, 1000, 128);

julia> @btime $d($x);
  304.097 μs (4 allocations: 100.09 KiB)

julia> @btime gradient((m,x) -> sum(m(x)), $d, $x);
  696.492 μs (134 allocations: 1.07 MiB)

julia> using MKL

julia> LinearAlgebra.BLAS.get_config()
LinearAlgebra.BLAS.LBTConfig
Libraries:
└ [ILP64] libmkl_rt.so  # <--- notice this has now changed to use MKL

julia> @btime $d($x);
  258.107 μs (4 allocations: 100.09 KiB)

julia> @btime gradient((m,x) -> sum(m(x)), $d, $x);
  530.214 μs (134 allocations: 1.07 MiB)
```

## Handling Data

* Differences in batching (first dim (PyTorch) vs last dim (Flux))

As discussed previously, Julia `Array`s are column major. This inflenes how data is structured in Flux. PyTorch follows "NCHW" (or in general, batch-first) dimensions. Flux follows "WHCN" with the batch dimension last. This is because most fused operations written for column major arrays would iterate over the outermost dimension first.

All the arrays used with Flux follow the convention of having the batch dimension in the end. While not a strict requirement, default implementations of layers in Flux are written with this assumption in mind, and therefore careful use of `transpose` and `permutedims` may be required to get correct results. This is in contrast to PyTorch (or more specifically, numpy) which is column major and requires users to stack their data accordingly.

Both PyTorch and Flux implement a [standard `DataLoader`](https://fluxml.ai/Flux.jl/dev/data/dataloader/#DataLoader). The `DataLoader` in Flux acts very similarly to its PyTorch analog with some notable exceptions.

It is helpful to recall how models are trained. Typically, a loss function takes in a number of arguments. In Flux, a `DataLoader` typically produces a tuple of arguments that can be input into the `loss`. In terms of pseudocode, this looks like:

```julia
dataloader = Flux.Data.DataLoader(...)
ps = params(model)
for args in dataloader
  gs = gradient(ps) do
    loss(args...)
  end
  Flux.Optimise.update!(opt, ps, gs)
end
```

Note that `args` is a tuple of arguments to the loss function, and any iterable producing this tuple is a valid input to the `train!` function. The `DataLoader` is designed such that it can take as input a tuple of data corresponding to the structure of the tuple of `args` that is expected by the loss.

```julia
X = rand(Float32, 224, 224, 3, 128)
Y = Flux.onehotbatch(rand(1:10, 128), 1:10)
dataloader = Flux.Data.DataLoader((X,Y), batchsize = 16)
```

## Defining a Loss Function

In Flux, we don't have a strict demarkation between loss functions and layers and transforms. This simplifies library design at the cost of requiring more sophistacted tooling to analyse library code.

PyTorch loss functions can be built with a number of inbuilt loss functions as well as compositions of PyTorch implementations of base linear algebra methods.

```python
>>> mae = nn.L1Loss()
>>> crossentropy = nn.CrossEntropyLoss()
```

Since Flux is written to be generic, it can make use of functions defined in Base julia, or indeed any function written in Julia. Flux does come with a prebaked library of common loss functions in the [`Flux.Losses`](https://fluxml.ai/Flux.jl/dev/models/losses/#Loss-Functions) module. It houses a number of commonly used loss functions.

```julia
help?> Flux.Losses.mae
  mae(ŷ, y; agg = mean)

  Return the loss corresponding to mean absolute error:

  agg(abs.(ŷ .- y))

  Example
  ≡≡≡≡≡≡≡≡≡

  julia> y_model = [1.1, 1.9, 3.1];

  julia> Flux.mae(y_model, 1:3)
  0.10000000000000009
```

As you can see, the API for all the loss functions defined in Flux is uniform, and can be composed with aggregration functions depending on the use case. Optionally, the `agg` keyword will also manage how the reduction is done.

As eluded to earlier, since Flux purposefully doesn't define custom `Array` types, it is generic across specialised `Array` types defined elsewhere in the Julia ecosystem. For example, with [NamedDims.jl](https://github.com/invenia/NamedDims.jl) one can define arrays with named dimensions to make it easier to track what an array is supposed to represent. Additionally, images in Julia are defined as matrices of `Colorant` types, which can be used directly as well, given they define mathematical and linear algebra operations commonly used in Machine Learning.

## Defining a Layer

Custom layers are required for modern machine learning models. Be that for Transformers or graph based neural networks, it is conveneint to be able to define layers that perform specialised functions not available in the framework. In PyTorch, this is the `nn.Module` class that one has to inherit to "register" a layer with PyTorch. Using this new `class` one is then expected to write the various methods required to make the layer operable. Typically, every layer overrides the `forward` function. PyTorch also comes with a variety of utilities to mark trainable and non trainable parameters as well as other metadata. This makes PyTorch generate a very dynamic graph of the execution of operations.

Here is an example of a PyTorch `Attention` layer taken from a [Vision Transformer implementation](https://github.com/lucidrains/vit-pytorch).

```python
class Attention(nn.Module):
    def __init__(self, dim, heads=8, dim_head=64, dropout=0.):
        super().__init__()
        inner_dim = dim_head * heads
        self.heads = heads
        self.scale = dim_head ** -0.5

        self.attend = nn.Softmax(dim=-1)
        self.to_qkv = nn.Linear(dim, inner_dim * 3, bias=False)

        self.to_out = nn.Sequential(
            nn.Linear(inner_dim, dim),
            nn.Dropout(dropout)
        )

    def forward(self, x):
        qkv = self.to_qkv(x).chunk(3, dim=-1)
        q, k, v = map(lambda t: rearrange(
            t, 'b p n (h d) -> b p h n d', h=self.heads), qkv)

        dots = torch.matmul(q, k.transpose(-1, -2)) * self.scale
        attn = self.attend(dots)
        out = torch.matmul(attn, v)
        out = rearrange(out, 'b p h n d -> b p n (h d)')
        return self.to_out(out)
```

Flux doesn't have very strict definitions of layers. The abstraction used for ML in Flux is a "trasform". Any operation can be a composition of one or more transforms. This is because Flux is generic to implementations and interfaces to support the differentiable programming paradigm. As such, while there are some common code patterns, there is no strict requirement to follow them. As eluded to earlier, this also gives Flux a functional API compatible with the rest of the Flux ecosystem for free. This can be seen as analogous to PyTorch's `nn.functional` module.

To give an example of a corresponding layer in Flux, we would define a regular Julia `struct`

```julia
struct Attention
  heads
  attend
  to_qkv
  to_out
end
```

In this example, we didn't need to import any libraries or use any "blessed" incantations. Furthermore, in order to make the `struct` callable, Julia allows overloading a callable function as follows:

```julia
function (attn::Attention)(x)
  ...
end
```

This is similar in spirit to the `forward` method in the PyTorch case. `attn` is an instance of the type `Attention` and can be referred to in the function body.

---
!!! Note:
    While it is the case that the callable definition is a common idiom, it is not a requirement. Custom `struct`s that can be consumed by functions will work identiacally.

```julia
function f(attn::Attention, x)
  ...
end

# This code pattern is identical to the previous callable method definition.
```
---

Once we have the `Attention` type defined, Flux exposes the `Flux.@functor` macro, which helps collect all the parameters associated with the type. Be default, Flux would try to iterate over every possible field in the type, but that can be controlled by providing a list of fields that limits which fields Flux is allowed to traverse while collecting its parameters.

```julia
Flux.@functor Attention

# or

Flux.@functor Attention (to_qkv, to_out)
```

`@functor` is a convenience macro, but as with other patterns, it is not required that users call this line. In general, it helps automate the process of collecting and moving parameters to different backends such as CUDA. More information can be found in the [relevant section of the documentation](https://fluxml.ai/Flux.jl/dev/models/basics/#Layer-helpers).

## Trainable Parameters

Users coming from PyTorch may be familiar with the `torch.Tensor` type. It is the ubiquitous type backing all the arrays that PyTorch is familiar with. An interesting keyword argument that `Tensor` accepts is the `reuires_grad` flag. It tells PyTorch which arrays requires gradients and therefore must be tracked to be trained on. Accute readers may hae noticed that Flux does not have a corresonding design, instead opting to use Base arrays. This brings up an interesting conundrum about deciding which arrays should be trained on, and which not.

The behaviour of trainables may be customised in several ways. Flux supports both implicit parameters (similar to PyTorch's `Tensor`'s behaviour) as well as explicit parameters.

### Implicit Parameters

Implicit parameters are the parameters that can be reached by `Flux.params`. `Flux.params` uses the `Flux.@functor` machinery (discussed above) to look for arrays. Any array accessible by `Flux.params` is considered trainable by default and therefore will have associated gradients to allow for them to be trained.

```julia
julia> m = Chain(Dense(3,3), Dense(3,3))
Chain(
  Dense(3, 3),                          # 12 parameters
  Dense(3, 3),                          # 12 parameters
)                   # Total: 4 arrays, 24 parameters, 352 bytes.

julia> Flux.params(m)
Params([Float32[-0.8401953 -0.79835474 -0.71581304; -0.8089365 -0.33885276 0.7647673; -0.95136285 -0.23751235 0.41876876], Float32[0.0, 0.0, 0.0], Float32[-0.20259118 -0.601972 -0.9414909; 0.074624896 0.85491776 0.97785044; -0.7683604 -0.45177686 0.3358878], Float32[0.0, 0.0, 0.0]])

```

If we wish to omit the first layer from being trained on, we can simply not pass it to the `params` function while training.

```julia
julia> Flux.params(m[2:end])
Params([Float32[-0.20259118 -0.601972 -0.9414909; 0.074624896 0.85491776 0.97785044; -0.7683604 -0.45177686 0.3358878], Float32[0.0, 0.0, 0.0]])
```

Or we can pick and choose even more granularly

```julia
julia> Flux.params(attn.to_out, m[2].weight, m[1].bias) # to pick specific parameters
```

We can mark any arbitrary array as a parameter too!

```julia
julia> x = rand(Float32, 100, 100);

julia> ps = Flux.params(m, x) # <-- to track parameters from both `m` and `x`
```

There isn't a strict analogue in PyTorch apart from the `requires_grad` keyword, but it is helpful to note that such patterns can be easily extended in Flux, since it is very helpful for transfer learning. More details about this can found in the [transfer learning tutorial](https://fluxml.ai/tutorials/2020/10/18/transfer-learning.html), and a deeper technical dive can be found in the [documentation section](https://fluxml.ai/Flux.jl/dev/models/advanced/#Freezing-Layer-Parameters).

### Explicit Parameters

In some cases, it is easier to use the parameters more explcitly. Since Flux uses source-to-source automatic differentiation (see [Zygote.jl's documentation](https://fluxml.ai/Zygote.jl/latest/), one can differentiate arbitrary Julia code.

```julia
julia> d = Dense(1000, 100, tanh)
Dense(1000, 100, tanh)  # 100_100 parameters

julia> x = rand(Float32, 1000, 128);

julia> gradient(d) do d
         sum(d(x))
       end
((weight = Float32[53.795525 56.33463 … 54.849754 51.29177; 42.558075 44.57393 … 39.769882 41.53542; … ; 50.273113 52.79153 … 47.997196 48.444897; 42.443985 45.09008 … 45.482098 41.623707], bias = Float32[103.92901, 79.98, 102.63555, 52.23432, 109.12472, 84.64445, 102.826996, 83.86936, 39.432716, 108.40317  …  92.063065, 99.198296, 74.44044, 61.24802, 105.96952, 94.65458, 77.4249, 79.236206, 96.53704, 84.543045], σ = nothing),)
```

---
!!! Note:
    The `f(args...) do ... end` syntax is equivalent to passing an anonymous function as the first argument to `f`

---

With calling `gradient` Flux returned the gradients of the models `d` in the same form as the object `d` itself. That is to say, the gradients follow the same type hierarchy as the original object, albeit represented as a `NamedTuple`. [Optimisers.jl](https://github.com/FluxML/Optimisers.jl) can easily then consume `d` and the gradients in this explicit form and produce a new model `d′` with updated parameters.

## Training Models

PyTorch famously does not have a training loop API, instead opting to use let users define their own training loops, to suit their own needs. Offshoot packages such as [ignite](https://pytorch-ignite.ai) also help fill that gap. Flux also supports a [first-class loop based training API](https://fluxml.ai/Flux.jl/stable/training/training/#Custom-Training-loops). In addition, Flux also exposes a [`Flux.train!`](https://fluxml.ai/Flux.jl/stable/training/training/#Flux.Optimise.train!) function which takes care of most of the common training cases seen in deep learning in practice.

## Distributed and Large Scale Training

## Concluding Remarks

As can be seen, there are several similarities between Flux and PyTorch. The dissimilarities are design choices that Flux has made in order to be generic across the Julia package ecosystem and make use of intelligent abstractions that the Julia Programming Language gives us access to. Further, we wish to support the scintific machine learning and differentiable programming use cases as a natural extension to the Flux design philosophy without limiting the flexiblity and performance that Julia's users have come to expect of it. Flux shares the same feature set as PyTorch but deliberately does not define some of the utilities which are better expressed as compositions of existing libraries and Base functions.

The tradeoffs made in Flux are expected to make sense for training of conventional deep learning models (including training at scale), as well as for emergent techniques in the ML landscape as more and more domain knowledge is available to Flux users. We wish to do this without requiring boilerplate code and without needing to rewrite any of the domain tooling as would have been the case otherwise.

