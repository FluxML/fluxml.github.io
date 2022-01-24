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

## Handling Data

* Link the JuliaData org for different types of data formats
* Differences in batching (first dim (PyTorch) vs last dim (Flux))

## Defining a Loss Function

PyTorch loss functions can be built with a number of inbuilt loss functions as well as compositions of PyTorch implementations of base linear algebra methods.

```python
>>> mae = nn.L1Loss()
>>> crossentropy = nn.CrossEntropyLoss()
```

Since Flux is written to be generic, it can make use of functions defined in Base julia, or indeed any function written in Julia. Flux does come with a prebaked library of common loss functions in the `Flux.Losses` module.

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

## Concluding Remarks
