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

Flux provides GPU support. For more information on obtaining GPU support, see [CUDA.jl](https://github.com/JuliaGPU/CUDA.jl) and [Flux documentation on GPU support](https://fluxml.ai/Flux.jl/stable/gpu/).

<br>

## Getting Help

If you run into any issues on your journey learning Flux.jl, please post on Stack Overflow under the [Flux.jl tag](https://stackoverflow.com/questions/tagged/flux.jl) or ask a question on the [Julia Discourse under the Machine Learning domain](https://discourse.julialang.org/c/domain/ml/).

## Create your first model 

In this tutorial, you'll create your first machine learning model using Flux. This is a simple linear regression model that attempts to recover a linear function by looking at noisy examples.

<br>

### Step 1: Import Flux

To import Flux add the following:

```julia
using Flux
```
<br>

### Step 2: Create the training data
First, we'll write a function that generates our "true" data. We'll use to use Flux to recover `W_actual` and `b_actual` by looking only at examples of the `actual_model` function.

```julia
W_actual = [1 2 3 4 5;
            5 4 3 2 1]
b_actual = [- 1.0; -2.0]
actual_model(x) = W_actual * x + b_actual
```
<br>

Next, we generate our training data by passing random vectors into the true model. We'll also add Gaussian noise using `randn()` so that it's not *too* easy for Flux to figure out the model.

```julia
x_train = [ 5 .* rand(5) for _ in 1:10_000 ]
y_train = [ actual_model(x) + 0.2 .* randn(2) for x in x_train 
```

In most real machine learning scenarios, you would not have access to `actual_model`, and would just get `x_train` and `y_train` as input data.

### Step 3: Define your model

Next, we define the model we want to use to learn the data. We'll use the same form that we used for our training data:

```julia
training_model(x) = W_learned*x + b_learned
```
<br>

We need to set the parameters of the model (`W_learned` and `b_learned`) to some initial values. It's fairly common to use random values, so we'll do that:

```julia
W_learned = rand(2, 5)
b_learned = rand(2)
```
<br>

### Step 4: Define a loss function

A loss function evaluates a machine learning model's performance. In other words, it measures how far the model is from its target prediction. Flux lets you define your own custom loss function, or you can use one of the [Loss Functions](https://fluxml.ai/Flux.jl/stable/training/training/#Loss-Functions-1) that Flux provides. 

For this example, we'll define a loss function that measures the squared distance from the predicted output to the actual output:

```julia
function loss(x, y)
  ŷ = training_model(x)
  sum((y - ŷ).^2)
end
```

<br>

### Step 5: Set an optimiser

You train a machine learning model by running an optimization algorithm (optimiser) that finds the best parameters (`W` and `b`). The best parameters for a model are the ones that achieve the best score of the `loss` function. Flux provides [Optimisers](https://fluxml.ai/Flux.jl/stable/training/optimisers/) that you can use to train a model. 

For this tutorial, we'll use a classic gradient descent optimiser with learning rate η = 0.01:

```julia
opt = Descent(0.01)
```
<br>

### Step 6: Train your model

Training a model is the process of computing the gradients with respect to the parameters for each input in the data. At every step, the optimiser updates all of the parameters until it finds a good value for them. This process can be written as a loop: we iterate over the examples in `x_train` and `y_train` and update the model for each example.

To indicate that we want all derivatives of `W_learned` and `b_learned`, we write `ps = params(W_learned, b_learned)`. This is a convenience function that Flux provides so that we don't have to explicitly list every gradient we want. Check out the section on [Taking Gradients](https://fluxml.ai/Flux.jl/stable/models/basics/#Taking-Gradients) if you want to learn more about how this works.

We can now execute the training procedure for our model:

```julia
train_data = zip(x_train, y_train)
ps = params(W_learned, b_learned)

for d in train_data
  gs = Flux.gradient(ps) do
    loss(d...)  # Unpacks d into x,y and passes those two arguments to loss()
  end
  Flux.Optimise.update!(opt, ps, gs)
end
```

<br>


>**Note:** With this pattern, it is easy to add more complex learning routines that make use of control flow, distributed compute, scheduling optimisations, etc. Note that the pattern above is a simple Julia *for loop* but it could also be replaced with a *while loop*.

<br>

While writing your own loop is powerful, sometimes you just want to do the simple thing without writing too much code. Flux lets you do this with [Flux.train!](https://fluxml.ai/Flux.jl/stable/training/training/#Training-1), which runs one training epoch over a dataset. `Flux.train!` computes gradients and updates model parameters for every sample or batch of samples. In our case, we could have replaced the above loop with the following statement:

```julia
Flux.train!(loss, params(W_learned, b_learned), train_data, opt)
```

<br>

For more ways to train a model in Flux, see [Training](https://fluxml.ai/Flux.jl/stable/training/training/#Training-1).

<br>

### Step 7: Examine the Results

The training loop we ran modified `W_learned` and `b_learned` to be closer to the values used to generate the training data (`W_actual` and `b_actual`). We can see how well we did by printing out the difference between the learned and actual matrices.

```julia
println("The value of W_learned is:")
display(W_learned)
print("The largest element-wise difference between W_learned and W_actual is ")
println(maximum(abs.(W_learned - W_actual))
```

Because the data and initialization are random, your results may vary slightly, but in most cases, the largest difference between the elements of learned and actual `W` matrix is no more than 4%.

### Step 8: Run the script

Finally, create a file with extension `.jl` with the code above in any IDE and run it as `julia name-of-your-file.jl `. You can use [Juno IDE](https://junolab.org/) or [Julia VSCode extension](https://www.julia-vscode.org/) to edit and run Julia code. Alternatively, you can run Julia code on a Jupyter notebook (see [IJulia](https://github.com/JuliaLang/IJulia.jl)). Here is the full version of the code:

```julia
using Flux

# Define the model that the training data comes from
W_actual = [1 2 3 4 5;
            5 4 3 2 1]
b_actual = [- 1.0; -2.0]
actual_model(x) = W_actual * x + b_actual

# Generate training data using the actual model and a little bit of noise
x_train = [ 5 .* rand(5) for _ in 1:10_000 ]
y_train = [ actual_model(x) + 0.2 .* randn(2) for x in x_train ]

# Create the model that we will train using Flux
training_model(x) = W_learned * x + b_learned

# Set random initial weights for the parameters of the model
W_learned = rand(2,5)
b_learned = rand(2)

# Define a simple squared-distance loss function
function loss(x, y)
  ŷ = training_model(x)
  sum((y - ŷ).^2)
end

# Set the optimizer (gradient descent) and its parameters (in this case, just η)
opt = Descent(0.01)

# Creates an iterator of (x,y) pairs corresponding to pairs in x_train, y_train
# e.g. the first element of train_data is (x_train[1], y_train[1]), the second
# element is (x_train[2], y_train[2]) and so on
train_data = zip(x_train, y_train) 

# Tracks all derivatives of W and b
ps = params(W_learned , b_learned)

# Train the model by looping over all training data and updating the model
for d in train_data
  gs = Flux.gradient(ps) do
    loss(d...)  # Unpacks d into x,y and passes those two arguments to loss()
  end
  Flux.Optimise.update!(opt, ps, gs)
end

# We could have replaced the above for-loop with this single call to train!, 
# which handles the looping, gradient computations, and updates for us.
# Flux.train!(loss, params(W_learned, b_learned), train_data, opt)

# Print some information about how well the training process worked.
print("The value of W_learned is: ")
display(W_learned)
println()
print("The largest element-wise difference between W_learned and W_actual is ")
println(maximum(abs.(W_learned - W_actual)))
println()
print("The value of b_learned is: ")
display(b_learned)
println()
print("The largest element-wise difference between b_learned and b_actual is ")
println(maximum(abs.(b_learned - b_actual)))
```

<br>


## What's next

Congratulations! You have created written and trained a model using Flux. Now, you can continue exploring Flux's capabilities:

* [60-minute blitz tutorial](tutorials/2020/09/15/deep-learning-flux.html) is a quick intro to Flux loosely based on [PyTorch's tutorial](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html).
* [Flux Model Zoo](https://github.com/FluxML/model-zoo) contains various demonstrations of Flux. 
* [JuliaAcademy](https://juliaacademy.com/) offers introductory courses to Julia and Flux.
* [Flux's official documentation](https://fluxml.ai/Flux.jl/stable/).

As you continue to progress through your Flux and Julia journey, please feel free to share it on [Twitter and tag us](https://twitter.com/FluxML), we would love to see what awesome things the #FluxML community is up to.
