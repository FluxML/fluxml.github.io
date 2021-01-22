---
layout: page
title: Getting Started
---

Welcome! This section contains information on how to create your first machine learning model using Flux.

Flux is 100% pure-Julia stack and provides lightweight abstractions on top of Julia's native GPU and AD support. It makes the easy things easy while remaining fully hackable. Also, Flux has a next-generation Automatic Differentiation (AD) system [Zygote](https://github.com/FluxML/Zygote.jl).


## Before you start

Before you begin using Flux, you need to install Julia version 1.3 or later. For more information on installing Julia, see [Download Julia](https://julialang.org/downloads/).

After installing Julia, you can install Flux by running the following command in the Julia REPL:

```julia
julia> ] add Flux
```

<br>


Alternatively, you can run the following:

```julia
julia> using Pkg; Pkg.add("Flux")
```

<br>

Flux provides GPU support. For more information on obtaining GPU support, see [CUDA.jl](https://github.com/JuliaGPU/CUDA.jl) and [Flux documentation on GPU suppoort](https://fluxml.ai/Flux.jl/stable/gpu/).

<br>

## Create your first model 

In this tutorial, you'll create your first machine learning model using Flux. This is a simple linear regression model that predicts an output array `y` from an input array `x`.

<br>

### Step 1: Import Flux

To import Flux add the following:

```julia
using Flux
```
<br>

### Step 2: Create some train data
For this example, create some random train data `x` and `y` arrays:

```julia
x = rand(5)
y = rand(2) 
```
<br>

### Step 3: Define your model

Define a simple regression model by defining the following function:

```julia
model(x) = W*x .+ b
```
<br>

Then, set the parameters of the model (`W` and `b`) to some initial random values:  

```julia
W = rand(2, 5)
b = rand(2)
```
<br>

### Step 4: Define a loss function

A loss function evaluates a machine learning model's performance. In other words, it measures how far the model is from its target prediction. Flux enables you to define your own custom loss function or you can use one of the [Loss Functions](https://fluxml.ai/Flux.jl/stable/training/training/#Loss-Functions-1) that Flux provides. 

For this example, define a custom loss function:

```julia
function loss(x, y)
  ŷ = model(x)
  sum((y .- ŷ).^2)
end
```
<br>

This function computes the model's prediction for the input `x` and returns the loss for the output `ŷ`.

<br>

### Step 5: Set an optimiser

You train a machine learning model by running an optimization algorithm (optimiser) that finds the best parameters (`W` and `b`). The best parameters for a model are the ones that achieve the best score of the `loss` function. Flux provides [Optimisers](https://fluxml.ai/Flux.jl/stable/training/optimisers/) that you can use to train a model. 

Set a classic gradient descent optimiser with learning rate η = 0.1:

```julia
opt = Descent(0.1)
```
<br>

### Step 6: Train your model

Training a model is the process of computing the gradients with respect to the parameters for each data point in the data. At every step, the optimiser updates all of the parameters until it finds a good value for them. In fact, you can write this process as a *for loop*. 

You can execute the training process of a model as follows:

```julia
for d in data
  gs = Flux.gradient(ps) do
    loss(d...)
  end
  Flux.Optimise.update!(opt, ps, gs)
end
```

<br>

where:

* **opt** is an optimiser
* **ps** are the parameters of the model
* **gs** are the gradients being computed


>**Note:** With this pattern, it is trivial to add more complex learning routines that make use of control flow, distributed compute, scheduling optimisation etc. Note that the pattern above is a simple julia *for loop* but it could also be replaced with a *while loop*.

<br>

Flux enables you to execute the same process with the [Flux.train!](https://fluxml.ai/Flux.jl/stable/training/training/#Training-1) function. It executes one training step, and you can put the `Flux.train!` function inside a *for loop* to execute more training steps. For more information on training a model in Flux, see [Training](https://fluxml.ai/Flux.jl/stable/training/training/#Training-1). Notice that before calling this function you need to zip the training data as `data = zip(x, y)`. 

```julia
Flux.train!(loss, params(model), data, opt)
```

<br>

where:
* **loss** is the loss function that you defined in [Step 3](#step-3-define-a-loss-function).
* **params(model)** are the trainable parameters of the model. It uses the [params Flux function](https://fluxml.ai/Flux.jl/stable/training/training/#Model-parameters-1) to track the parameters.
* **data** is a collection of data points. This data must be of the same dimension as the input of the `model` function.
* **opt** is an optimiser.


<br>

### Step 7: Run the script

Finally, create a file with extension `.jl` with the code above in any IDE and run it as `julia name-of-your-file.jl `. You can use [Juno IDE](https://junolab.org/) or [Julia VSCode extension](https://www.julia-vscode.org/) to edit and run Julia code. Alternatively, you can run Julia code on a Jupyter notebook (see [IJulia](https://github.com/JuliaLang/IJulia.jl)). Here is the full version of the code:

```julia
#Import Flux
using Flux

#Create some train data
x = rand(5)
y = rand(2) 

#Define your model
model(x) = W*x .+ b

#Set initial random weights for your model
W = rand(2, 5)
b = rand(2)

#Define a loss function
function loss(x, y)
    ŷ = model(x)
    sum((y .- ŷ).^2)
  end

#Set an optimiser
opt = Descent(0.1)

#Zip the train data
data = zip(x, y)

#Execute one training step
Flux.train!(loss, params(model), data, opt)
```

<br>


## What's next

Congratulations! You have created your first model and ran a training step using Flux. Now, you can continue exploring Flux's capabilities:

* [60-minute blitz tutorial](tutorials/2020/09/15/deep-learning-flux.html) is a quick intro to Flux loosely based on [PyTorch's tutorial](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html).
* [Flux Model Zoo](https://github.com/FluxML/model-zoo) contains various demonstrations of Flux. 
* [JuliaAcademy](https://juliaacademy.com/) offers introductory courses to Julia and Flux.
* [Flux's official documentation](https://fluxml.ai/Flux.jl/stable/).
