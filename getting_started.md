+++
title = "Getting Started"
+++

Welcome! This section contains information on how to create your first machine learning model using Flux.

Flux is 100% pure-Julia stack and provides lightweight abstractions on top of Julia's native GPU and AD support. It makes the easy things easy while remaining fully hackable. Also, Flux has a next-generation Automatic Differentiation (AD) system [Zygote](https://github.com/FluxML/Zygote.jl).


## Before you start

Before you begin using Flux, you need to install Julia version 1.3 or later. For more information on installing Julia, see [Download Julia](https://julialang.org/downloads/).

After installing Julia, you can install Flux by running the following command in the Julia REPL:

```julia
julia> ] add Flux
```

Alternatively, you can run the following:

```julia
julia> using Pkg; Pkg.add("Flux")
```

Flux provides GPU support. For more information on obtaining GPU support, see [CUDA.jl](https://github.com/JuliaGPU/CUDA.jl) and [Flux documentation on GPU support](https://fluxml.ai/Flux.jl/stable/gpu/).

## Getting Help

If you run into any issues on your journey learning Flux.jl, please post on Stack Overflow under the [Flux.jl tag](https://stackoverflow.com/questions/tagged/flux.jl) or ask a question on the [Julia Discourse under the Machine Learning domain](https://discourse.julialang.org/c/domain/ml/).

## Create your first model 

In this tutorial, you'll create your first machine learning model using Flux. This is a simple linear regression model that attempts to recover a linear function by looking at noisy examples.

### Step 1: Import Flux

To import Flux add the following:

```julia
using Flux
```

### Step 2: Create the training data
First, we'll write a function that generates our "true" data. We'll use to use Flux to recover `W_truth` and `b_truth` by looking only at examples of the `ground_truth` function.

```julia
W_truth = [1 2 3 4 5;
            5 4 3 2 1]
b_truth = [-1.0; -2.0]
ground_truth(x) = W_truth*x .+ b_truth
```

Next, we generate our training data by passing random vectors into the ground truth function. We'll also add Gaussian noise using `randn()` so that it's not *too* easy for Flux to figure out the model.

```julia
x_train = [ 5 .* rand(5) for _ in 1:10_000 ]
y_train = [ ground_truth(x) + 0.2 .* randn(2) for x in x_train ]
```

There are two important things to note in this example which differ from real
machine learning problems:
  - Our variables are individual vectors, stored inside another vector. Usually, 
    we would have a collection of N-dimensional arrays (N >= 2) as our data.
  - In a real learning scenario, we would not have access to our ground truth,
    only the training examples.

### Step 3: Define your model

Next, we define the model we want to use to learn the data. We'll use the same form that we used for our training data:

```julia
model(x) = W*x .+ b
```

We need to set the parameters of the model (`W` and `b`) to some initial values. It's fairly common to use random values, so we'll do that:

```julia
W = rand(2, 5)
b = rand(2)
```

You can learn more about defining models in this video:

~~~
<div style="display: flex; justify-content: center;">
            <iframe style="width: 60%; height:400px;" src="https://www.youtube.com/embed/XrAUGRX998E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
~~~

### Step 4: Define a loss function

A loss function evaluates a machine learning model's performance. In other words, it measures how far the model is from its target prediction. Flux lets you define your own custom loss function, or you can use one of the [Loss Functions](https://fluxml.ai/Flux.jl/stable/training/training/#Loss-Functions-1) that Flux provides. 

For this example, we'll define a loss function that measures the squared distance from the predicted output to the actual output:

```julia
function loss(x, y)
  ŷ = model(x)
  sum((y .- ŷ).^2)
end
```

### Step 5: Set an optimiser

You train a machine learning model by running an optimization algorithm (optimiser) that finds the best parameters (`W` and `b`). The best parameters for a model are the ones that achieve the best score of the `loss` function. Flux provides [Optimisers](https://fluxml.ai/Flux.jl/stable/training/optimisers/) that you can use to train a model. 

For this tutorial, we'll use a classic gradient descent optimiser with learning rate η = 0.01:

```julia
opt = Descent(0.01)
```

### Step 6: Train your model

Training a model is the process of computing the gradients with respect to the parameters for each input in the data. At every step, the optimiser updates all of the parameters until it finds a good value for them. This process can be written as a loop: we iterate over the examples in `x_train` and `y_train` and update the model for each example.

To indicate that we want all derivatives of `W` and `b`, we write `ps = Flux.params(W, b)`. This is a convenience function that Flux provides so that we don't have to explicitly list every gradient we want. Check out the section on [Taking Gradients](https://fluxml.ai/Flux.jl/stable/models/basics/#Taking-Gradients) if you want to learn more about how this works.

We can now execute the training procedure for our model:

```julia
train_data = zip(x_train, y_train)
ps = Flux.params(W, b)

for (x,y) in train_data
  gs = Flux.gradient(ps) do
    loss(x,y)
  end
  Flux.Optimise.update!(opt, ps, gs)
end
```

> **Note:** With this pattern, it is easy to add more complex learning routines that make use of control flow, distributed compute, scheduling optimisations, etc. Note that the pattern above is a simple Julia *for loop* but it could also be replaced with a *while loop*.

While writing your own loop is powerful, sometimes you just want to do the simple thing without writing too much code. Flux lets you do this with [Flux.train!](https://fluxml.ai/Flux.jl/stable/training/training/#Training-1), which runs one training epoch over a dataset. `Flux.train!` computes gradients and updates model parameters for every sample or batch of samples. In our case, we could have replaced the above loop with the following statement:

```julia
Flux.train!(loss, Flux.params(W, b), train_data, opt)
```

For more ways to train a model in Flux, see [Training](https://fluxml.ai/Flux.jl/stable/training/training/#Training-1).

### Step 7: Examine the Results

The training loop we ran modified `W` and `b` to be closer to the values used to generate the training data (`W` and `b`). We can see how well we did by printing out the difference between the learned and actual matrices.

```julia
@show W
@show maximum(abs, W .- W_truth)
```

Because the data and initialization are random, your results may vary slightly, but in most cases, the largest difference between the elements of learned and actual `W` matrix is no more than 4%.

### Step 8: Run the script

Finally, create a file with extension `.jl` with the code above in any IDE and run it as `julia name-of-your-file.jl `. You can use the [Julia VSCode extension](https://www.julia-vscode.org/) to edit and run Julia code. Alternatively, you can run Julia code on a Jupyter notebook (see [IJulia](https://github.com/JuliaLang/IJulia.jl)). Here is the full version of the code:

```julia
using Flux

# Define the ground truth model. We aim to recover W_truth and b_truth using
# only examples of ground_truth()
W_truth = [1 2 3 4 5;
            5 4 3 2 1]
b_truth = [-1.0; -2.0]
ground_truth(x) = W_truth*x .+ b_truth

# Generate the ground truth training data as vectors-of-vectors
x_train = [ 5 .* rand(5) for _ in 1:10_000 ]
y_train = [ ground_truth(x) + 0.2 .* randn(2) for x in x_train ]

# Define and initialize the model we want to train
model(x) = W*x .+ b
W = rand(2, 5)
b = rand(2)

# Define pieces we need to train: loss function, optimiser, examples, and params
function loss(x, y)
  ŷ = model(x)
  sum((y .- ŷ).^2)
end
opt = Descent(0.01)
train_data = zip(x_train, y_train)
ps = Flux.params(W, b)

# Execute a training epoch
for (x,y) in train_data
  gs = gradient(ps) do
    loss(x,y)
  end
  Flux.Optimise.update!(opt, ps, gs)
end

# An alternate way to execute a training epoch
# Flux.train!(loss, Flux.params(W, b), train_data, opt)

# Print out how well we did
@show W
@show maximum(abs, W .- W_truth)
```


## What's next

Congratulations! You have created and trained a model using Flux. Now, you can continue exploring Flux's capabilities:

* [60-minute blitz tutorial](tutorials/2020/09/15/deep-learning-flux.html) is a quick intro to Flux loosely based on [PyTorch's tutorial](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html).
* [Flux Model Zoo](https://github.com/FluxML/model-zoo) contains various demonstrations of Flux. 
* [JuliaAcademy](https://juliaacademy.com/) offers introductory courses to Julia and Flux.
* [Flux's official documentation](https://fluxml.ai/Flux.jl/stable/).

As you continue to progress through your Flux and Julia journey, please feel free to share it on [Twitter and tag us](https://twitter.com/FluxML), we would love to see what awesome things the #FluxML community is up to.
