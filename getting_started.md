---
layout: page
title: Getting Started
---

Welcome! This section contains information on how to install Flux and create your first machine learning model with it.

Flux is 100% pure-Julia stack and provides lightweight abstractions on top of Julia's native GPU and AD support. It makes the easy things easy while remaining fully hackable. It has a next-generation Automatic Differentiation (AD) system [Zygote](https://github.com/FluxML/Zygote.jl).

<br>

# Installing Flux

First, you need to install Julia version 1.3 or later. For more information on installing Julia, see [Download Julia](https://julialang.org/downloads/).

After installing Julia, you can install Flux by running the following command in the Julia REPL:

```julia
julia> ] add Flux
```

<br>


Alternatively, you can run the following command to install Flux:

```julia
julia> using Pkg; Pkg.add("Julia")
```

<br>

Flux has GPU support. For more information on obtaining GPU support, see [CUDA.jl](https://github.com/JuliaGPU/CUDA.jl) and [Flux documentation on GPU suppoort](https://fluxml.ai/Flux.jl/stable/gpu/).

<br>

# Creating your first model

In this tutorial, you'll create your first machine learning model using flux. This is a simple linear regression model that predicts an output array `y` from an input `x`.

You need to create a `.jl` file in any IDE. However, you can use [Juno IDE](https://junolab.org/) or [Julia VSCode extension](https://www.julia-vscode.org/). Alternatively, you can run Julia code on a Jupyter notebook (see [IJulia](https://github.com/JuliaLang/IJulia.jl)).

### Step 1: Import Flux

To start using Flux, you just need to add the following line:

```julia
import Flux
```
<br>

### Step 2: Define a model

Define the simple regression model by defining the following prediction function:

```julia
predict(x) = W*x .+ b
```
<br>
Then, set the parameters of the model (`W` and `B`) to some initial random values:  

```julia
W = rand(2, 5)
b = rand(2)
```
<br>

### Step 3: Define a loss function

A loss function evaluates a machine learning model's performance (how far the model is from its target prediction). Flux enables you to define your own custom loss function or use one the [Flux's loss functions](https://fluxml.ai/Flux.jl/stable/training/training/#Loss-Functions-1). For this tutorial, define a custom loss function as follows:

```julia
function loss(x, y)
  ŷ = predict(x)
  sum((y .- ŷ).^2)
end
```
<br>

### Step 4: Set an optimization algorithm

A machine learning model needs to learn patterns from data so it can predict new values. You train a machine learning model by finding the best parameters (`W` and `B`) for the prediction function using an optimization algorithm (optimizer). Flux has several [optimisers](https://fluxml.ai/Flux.jl/stable/training/optimisers/) that you can use to train a model. 

Set a classic gradient descent optimiser with learning rate η = 0.1:

```julia
opt = Descent(0.1)
```
<br>

### Step 5: Train the model

You traing a machine learning model by steps. In Flux, you can execute one training step with the [train!](https://fluxml.ai/Flux.jl/stable/training/training/#Training-1) function:


```julia
Flux.train!(loss, params(model), data, opt)
```

<br>

This function requires the following parameters:
* **loss:** The loss function that you defined in [Step 3](#step-3-define-a-loss-function).
* **params(model):** Trainable parameters of the model. It uses the [params Flux function](https://fluxml.ai/Flux.jl/stable/training/training/#Model-parameters-1).
* **data:** A collection of data points (dataset).
* **opt:** An optimization algorithm.
  
Flux also enables you to define your own training functions.

### Step 6: Train your model
Finally, you can execute on training step for your model with some random data:

```julia
import Flux

predict(x) = W*x .+ b

W = rand(2, 5)
b = rand(2)

function loss(x, y)
  ŷ = predict(x)
  sum((y .- ŷ).^2)
end

opt = Descent(0.1)

x = rand(100)
y = 0.5x + rand(100) 

xd = reduce(hcat, x)
yd = reduce(hcat, y)

data = [(xd, yd)]

Flux.train!(loss, params(model), data, opt)
```

<br>
Of course you can also use an existing dataset to train a machine learning model. For more information, see [Datasets section from Flux's documentation](https://fluxml.ai/Flux.jl/stable/training/training/#Model-parameters-1). Furthermore, you could put the above `Flux.train!` function inside a for loop to execute more training steps.

# What's Next

Now that you have created your first model, you can continue exploring Flux's capabilities:

* [Flux Model Zoo](https://github.com/FluxML/model-zoo) contains various demonstrations of Flux.
* [60-minute blitz tutorial](tutorials/2020/09/15/deep-learning-flux.html) is a quick intro to Flux loosely based on [PyTorch's tutorial](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html). 
* [JuliaAcademy](https://juliaacademy.com/) offers introductory courses to Julia and Flux.
* [Flux's official documentation](https://fluxml.ai/Flux.jl/stable/).

