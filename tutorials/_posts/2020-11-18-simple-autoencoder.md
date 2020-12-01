---
title: Simple Auto-Encoder
author: Adarsh Kumar, Mike J Innes, Andrew Dinhobl
layout: blog
tag: Computer vision
---

This example shows how to encode MNIST images as compressed vectors that can later be decoded back into images.

Load the necessary packages.

```julia
using Flux, Flux.Data.MNIST
using Flux: @epochs, onehotbatch, mse, throttle
using Base.Iterators: partition
using Parameters: @with_kw
using CUDAapi
if has_cuda()
    @info "CUDA is on"
    import CuArrays
    CuArrays.allowscalar(false)
end
```
<br>

Set learning rate, number of epochs, size of encoding, batch size, number or random digits in the sample image, and throttle timeout parameters for the model.

```julia
@with_kw mutable struct Args
    lr::Float64 = 1e-3		# Learning rate
    epochs::Int = 10		# Number of epochs
    N::Int = 32			# Size of the encoding
    batchsize::Int = 1000	# Batch size for training
    sample_len::Int = 20 	# Number of random digits in the sample image
    throttle::Int = 5		# Throttle timeout
end

```

<br>

```julia
function get_processed_data(args)
    # Loading Images
    imgs = MNIST.images()
    #Converting image of type RGB to float 
    imgs = channelview.(imgs)
    # Partition into batches of size 1000
    train_data = [float(hcat(vec.(imgs)...)) for imgs in partition(imgs, args.batchsize)]
    
    train_data = gpu.(train_data)
    return train_data
end
```
<br>

Define the training function.

```julia
function train(; kws...)
    args = Args(; kws...)	

    train_data = get_processed_data(args)

    @info("Constructing model......")
    # You can try to make the encoder/decoder network larger
    # Also, the output of encoder is a coding of the given input.
    # In this case, the input dimension is 28^2 and the output dimension of
    # encoder is 32. This implies that the coding is a compressed representation.
    # We can make lossy compression via this `encoder`.
    encoder = Dense(28^2, args.N, leakyrelu) |> gpu
    decoder = Dense(args.N, 28^2, leakyrelu) |> gpu 

    # Defining main model as a Chain of encoder and decoder models
    m = Chain(encoder, decoder)

    @info("Training model.....")
    loss(x) = mse(m(x), x)
    ## Training
    evalcb = throttle(() -> @show(loss(train_data[1])), args.throttle)
    opt = ADAM(args.lr)
	
    @epochs args.epochs Flux.train!(loss, params(m), zip(train_data), opt, cb = evalcb)
	
    return m, args
end
```

<br>

```julia
using Images

img(x::Vector) = Gray.(reshape(clamp.(x, 0, 1), 28, 28))

function sample(m, args)
    imgs = MNIST.images()
    #Converting image of type RGB to float 
    imgs = channelview.(imgs)
    # `args.sample_len` random digits
    before = [imgs[i] for i in rand(1:length(imgs), args.sample_len)]
    # Before and after images
    after = img.(map(x -> cpu(m)(float(vec(x))), before))
    # Stack them all together
    hcat(vcat.(before, after)...)
end
```

<br>

Train the model.

```julia
cd(@__DIR__)
m, args= train()
# Sample output
@info("Saving image sample as sample_ae.png")
save("sample_ae.png", sample(m, args))
```

<br>

Output:

```
┌ Info: Constructing model......
└ @ Main In[4]:6
┌ Info: Training model.....
└ @ Main In[4]:18
┌ Info: Epoch 1
└ @ Main /.julia/packages/Flux/05b38/src/optimise/train.jl:114
loss(train_data[1]) = 0.10263635f0
loss(train_data[1]) = 0.07194337f0
loss(train_data[1]) = 0.059566345f0
loss(train_data[1]) = 0.04826564f0
┌ Info: Epoch 2
└ @ Main /.julia/packages/Flux/05b38/src/optimise/train.jl:114
loss(train_data[1]) = 0.037565507f0
loss(train_data[1]) = 0.033035718f0
loss(train_data[1]) = 0.029703505f0
┌ Info: Epoch 3
└ @ Main /.julia/packages/Flux/05b38/src/optimise/train.jl:114
loss(train_data[1]) = 0.027369088f0
loss(train_data[1]) = 0.025591135f0
loss(train_data[1]) = 0.024021594f0
┌ Info: Epoch 4
└ @ Main /.julia/packages/Flux/05b38/src/optimise/train.jl:114
loss(train_data[1]) = 0.022601498f0
loss(train_data[1]) = 0.021399459f0
loss(train_data[1]) = 0.020452648f0
loss(train_data[1]) = 0.019461159f0
┌ Info: Epoch 5
└ @ Main /.julia/packages/Flux/05b38/src/optimise/train.jl:114
loss(train_data[1]) = 0.01856002f0
loss(train_data[1]) = 0.017923435f0
loss(train_data[1]) = 0.017415516f0
loss(train_data[1]) = 0.016848236f0
┌ Info: Epoch 6
└ @ Main /.julia/packages/Flux/05b38/src/optimise/train.jl:114
loss(train_data[1]) = 0.016316287f0
loss(train_data[1]) = 0.015926166f0
loss(train_data[1]) = 0.015563524f0
loss(train_data[1]) = 0.015224024f0
┌ Info: Epoch 7
└ @ Main /.julia/packages/Flux/05b38/src/optimise/train.jl:114
loss(train_data[1]) = 0.014846354f0
loss(train_data[1]) = 0.0146293575f0
loss(train_data[1]) = 0.0143532315f0
┌ Info: Epoch 8
└ @ Main /.julia/packages/Flux/05b38/src/optimise/train.jl:114
loss(train_data[1]) = 0.01412566f0
loss(train_data[1]) = 0.013958127f0
loss(train_data[1]) = 0.0137986215f0
loss(train_data[1]) = 0.013683818f0
┌ Info: Epoch 9
└ @ Main /.julia/packages/Flux/05b38/src/optimise/train.jl:114
loss(train_data[1]) = 0.013549399f0
loss(train_data[1]) = 0.013383324f0
loss(train_data[1]) = 0.01332298f0
loss(train_data[1]) = 0.013187287f0
┌ Info: Epoch 10
└ @ Main /.julia/packages/Flux/05b38/src/optimise/train.jl:114
loss(train_data[1]) = 0.013029902f0
loss(train_data[1]) = 0.0129885655f0
loss(train_data[1]) = 0.012877053f0
┌ Info: Saving image sample as sample_ae.png
└ @ Main In[6]:4
```