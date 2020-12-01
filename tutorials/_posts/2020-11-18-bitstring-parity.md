---
title: BitString Parity Challenge
author: Adarsh Kumar, Mike J Innes, 
layout: blog
tag: Other and contributed
---

This is an implementation of [this Warmup problem](https://openai.com/blog/requests-for-research-2/). It states the following:

⭐ Train an LSTM to solve the XOR problem: that is, given a sequence of bits, determine its parity. The LSTM should consume the sequence, one bit at a time, and then output the correct answer at the sequence’s end. Test the two approaches below:

* Generate a dataset of random 100,000 binary strings of length 50. Train the LSTM; what performance do you get?
* Generate a dataset of random 100,000 binary strings, where the length of each string is independently and randomly chosen between 1 and 50. Train the LSTM. Does it succeed? What explains the difference?

First, we obtain the data. Save the following code as `data.jl`.

```julia
using Flux: onehot, onehotbatch
using Random

const alphabet = [false, true]  # 0, 1

parity(x) = reduce(xor, x)

gendata(n::Int, k::Int) = gendata(n, k:k)

function gendata(n::Int, k::UnitRange{Int})
    X = bitrand.(rand(k, n))
    return [(onehotbatch(x, alphabet), onehot(y, alphabet)) for (x, y) in zip(X, parity.(X))]
end
```
<br>

## Model for 2 bit strings.

```julia
include("data.jl")
using Flux, Statistics
using Flux: onehot, onehotbatch, throttle, logitcrossentropy, reset!, onecold
using Parameters: @with_kw

@with_kw mutable struct Args
    lr::Float64 = 1e-3    # Learning rate
    epochs::Int = 20      # Number of epochs for training
    train_len::Int = 100  # Length of training data to be generated
    val_len::Int = 10     # Length of Validation Data
    throttle::Int = 10    # Throttle timeout
end

function getdata(args)
    # Using gendata function defined in data.jl
    train = gendata(args.train_len, 2)	
    val = gendata(args.val_len, 2)
    return train, val
end

function build_model()
    scanner = LSTM(length(alphabet), 20)
    encoder = Dense(20, length(alphabet))
    return scanner, encoder
end

function model(x, scanner, encoder)
    state = scanner.(x.data)[end]
    reset!(scanner)
    encoder(state)
end

function train(; kws...)
    # Initialize the parameters
    args = Args(; kws...)
    
    # Load Data 
    train_data, val_data = getdata(args)

    @info("Constructing Model...")
    scanner,encoder = build_model()
   
    loss(x, y) = logitcrossentropy(model(x, scanner, encoder), y)
    batch_loss(data) = mean(loss(d...) for d in data)

    opt = ADAM(args.lr)
    ps = params(scanner, encoder)
    evalcb = () -> @show batch_loss(val_data)

    @info("Training...")
    for i=1:args.epochs
        Flux.train!(loss, ps, train_data, opt, cb=throttle(evalcb, args.throttle))
    end
    return scanner, encoder
end

function test(scanner, encoder)
    # sanity test
    tx = map(c -> onehotbatch(c, alphabet), [
        [false, true], # 01 -> 1
        [true, false], # 10 -> 1
        [false, false], # 00 -> 0
        [true, true]]) # 11 -> 0
    @info("Test...")
    out = [onecold(model(x, scanner, encoder)) - 1 for x in tx]
    input = [[0,1],[1,0],[0,0],[1,1]]
    for i in 1:length(tx)
        print(input[i]," => ",out[i],"\n")
    end	
end

cd(@__DIR__)
scanner, encoder = train()
test(scanner, encoder)
```

<br>

Save the above as `xor1.jl` and run it as:

```bash
julia xor1.jl
```

## Model for 2000 1 to 10 length strings

```julia
include("data.jl")
using Flux, Statistics
using Flux: onehot, onehotbatch, throttle, logitcrossentropy, reset!, onecold
using Parameters: @with_kw

@with_kw mutable struct Args
    lr::Float64 = 1e-3    # Learning rate
    epochs::Int = 20      # Number of epochs for training
    train_len::Int = 2000  # Length of training data to be generated
    val_len::Int = 100     # Length of Validation Data
    throttle::Int = 10    # Throttle timeout
end

function getdata(args)
    # training data of bit strings from length 2 to 10
    train = gendata(args.train_len, 1:10)
    # validation data of bit strings of length 10
    val = gendata(args.val_len, 10)
    return train, val
end

function build_model()
    scanner = LSTM(length(alphabet), 20)
    encoder = Dense(20, length(alphabet))
    return scanner, encoder
end

function model(x, scanner, encoder)
    state = scanner.(x.data)[end]
    reset!(scanner)
    encoder(state)
end

function train(; kws...)
    # Initialize the parameters
    args = Args(; kws...)
    
    # Load Data 
    train_data, val_data = getdata(args)

    @info("Constructing Model...")
    scanner,encoder = build_model()
   
    loss(x, y) = logitcrossentropy(model(x, scanner, encoder), y)
    batch_loss(data) = mean(loss(d...) for d in data)

    opt = ADAM(args.lr)
    ps = params(scanner, encoder)
    evalcb = () -> @show batch_loss(val_data)

    @info("Training...")
    for i=1:args.epochs
        Flux.train!(loss, ps, train_data, opt, cb=throttle(evalcb, args.throttle))
    end

    # Try running the model on strings of length 50.
    #
    # Even though the model has only been trained with
    # much shorter strings, it has learned the
    # parity function and will accurate on longer strings.
    function t50()
        l = batch_loss(gendata(1000, 50))
        println("Batch_loss for length 50 string: ", l,"\n")
    end
    t50()
    return scanner, encoder
end

function test(scanner, encoder)
    # sanity test
    tx = map(c -> onehotbatch(c, alphabet), [
        [false, true], # 01 -> 1
        [true, false], # 10 -> 1
        [false, false], # 00 -> 0
        [true, true]]) # 11 -> 0
    @info("Test...")
    out = [onecold(model(x, scanner, encoder)) - 1 for x in tx]
    input = [[0,1],[1,0],[0,0],[1,1]]
    for i in 1:length(tx)
        print(input[i]," => ",out[i],"\n")
    end	
end

cd(@__DIR__)
scanner, encoder = train()
test(scanner, encoder)
```
<br>

Save the above as `xor2.jl` and run it as:

```bash
julia xor2.jl
```

## Model for 100,000 1 to 50 length strings

```julia
include("data.jl")
using Flux, Statistics
using Flux: onehot, onehotbatch, throttle, logitcrossentropy, reset!, onecold
using Parameters: @with_kw

@with_kw mutable struct Args
    lr::Float64 = 1e-3    # Learning rate
    epochs::Int = 20      # Number of epochs for training
    train_len::Int = 100000  # Length of training data to be generated
    val_len::Int = 1000     # Length of Validation Data
    throttle::Int = 10    # Throttle timeout
end

function getdata(args)
    # training data of bit strings from length 2 to 50
    train = gendata(args.train_len, 1:50)
    # validation data of bit strings of length 50
    val = gendata(args.val_len, 50)
    return train, val
end

function build_model()
    scanner = LSTM(length(alphabet), 20)
    encoder = Dense(20, length(alphabet))
    return scanner, encoder
end

function model(x, scanner, encoder)
    state = scanner.(x.data)[end]
    reset!(scanner)
    encoder(state)
end

function train(; kws...)
    # Initialize the parameters
    args = Args(; kws...)
    
    # Load Data 
    train_data, val_data = getdata(args)

    @info("Constructing Model...")
    scanner,encoder = build_model()
   
    loss(x, y) = logitcrossentropy(model(x, scanner, encoder), y)
    batch_loss(data) = mean(loss(d...) for d in data)

    opt = ADAM(args.lr)
    ps = params(scanner, encoder)
    evalcb = () -> @show batch_loss(val_data)

    @info("Training...")
    for i=1:args.epochs
        Flux.train!(loss, ps, train_data, opt, cb=throttle(evalcb, args.throttle))
    end

    return scanner, encoder
end

function test(scanner, encoder)
    # sanity test
    tx = map(c -> onehotbatch(c, alphabet), [
        [false, true], # 01 -> 1
        [true, false], # 10 -> 1
        [false, false], # 00 -> 0
        [true, true]]) # 11 -> 0
    @info("Test...")
    out = [onecold(model(x, scanner, encoder)) - 1 for x in tx]
    input = [[0,1],[1,0],[0,0],[1,1]]
    for i in 1:length(tx)
        print(input[i]," => ",out[i],"\n")
    end	
end

cd(@__DIR__)
scanner, encoder = train()
test(scanner, encoder)
```

Save the above as `xor3.jl` and run it as:

```bash
julia xor3.jl
```

