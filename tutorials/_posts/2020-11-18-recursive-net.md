---
title: Recursive net on IMDB sentiment treebank
author: Adarsh Kumar, Mike J Innes
layout: blog
tag: Text
---

First, we save the following code as `data.jl`.

```julia
using Flux
using Flux: onehot
using Flux.Data.Sentiment
using Flux.Data: Tree, leaves

function getdata()
    traintrees = Sentiment.train()

    # Get the raw labels and phrases as separate trees.
    labels  = map.(x -> x[1], traintrees)
    phrases = map.(x -> x[2], traintrees)

    # All tokens in the training set.
    tokens = vcat(map(leaves, phrases)...)

    # Count how many times each token appears.
    freqs = Dict{String,Int}()
    for t in tokens
      freqs[t] = get(freqs, t, 0) + 1
    end

    # Replace singleton tokens with an "unknown" marker.
    # This roughly cuts our "alphabet" of tokens in half.
    phrases = map.(t -> get(freqs, t, 0) == 1 ? "UNK" : t, phrases)

    # Our alphabet of tokens.
    alphabet = unique(vcat(map(leaves, phrases)...))

    # One-hot-encode our training data with respect to the alphabet.
    phrases_e = map.(t -> t == nothing ? t : onehot(t, alphabet), phrases)
    labels_e  = map.(t -> onehot(t, 0:4), labels)

    train = map.(tuple, phrases_e, labels_e)
    return train
end
```
<br>

Run  `data.jl`:

```bash
julia data.jl
```
<br>
Now, we define the model and the train function.

```julia
using Flux
using Flux: logitcrossentropy, throttle
using Flux.Data: Tree, children, isleaf
using Parameters: @with_kw
include("data.jl")

@with_kw mutable struct Args
    lr::Float64 = 1e-3    # Learning rate
    N::Int = 300
    throttle::Int = 10    # Throttle timeout
end

function train(; kws...)
    # Initialize HyperParameters
    args = Args(; kws...)
    # load data
    @info("Loading Data...")
    train_data = getdata(args)    

    @info("Constructing model....")
    embedding = param(randn(Float32, N, length(alphabet)))

    W = Dense(2*N, N, tanh)
    combine(a, b) = W([a; b])

    sentiment = Chain(Dense(N, 5))

    function forward(tree)
      if isleaf(tree)
        token, sent = tree.value
        phrase = embedding * token
        phrase, logitcrossentropy(sentiment(phrase), sent)
      else
        _, sent = tree.value
        c1, l1 = forward(tree[1], embedding)
        c2, l2 = forward(tree[2], embedding)
        phrase = combine(c1, c2)
        phrase, l1 + l2 + logitcrossentropy(sentiment(phrase), sent)
      end
    end

    loss(tree) = forward(tree)[2]
 
    opt = ADAM(args.lr)
    ps = params(embedding, W, sentiment)
    evalcb = () -> @show loss(train[1])
    @info("Training Model...")
    Flux.train!(loss, ps, zip(train_data), opt,cb = throttle(evalcb, args.throttle))
end
```
<br>

Finally, we train the model.

```julia
cd(@__DIR__)
train()
```