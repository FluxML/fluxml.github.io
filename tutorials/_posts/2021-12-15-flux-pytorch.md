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
