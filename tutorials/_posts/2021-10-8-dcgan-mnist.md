---
title: Deep Convolutional Generative Adversarial Network(DCGAN)
author: Deeptendu Santra
layout: blog
tag: Learning Flux
---

This is a beginner level tutorial for generating hand-written digits using a [Deep Convolutional Generative Adversial Network](https://arxiv.org/pdf/1511.06434.pdf)


## What are GANs?


## Setup

```julia
using Base.Iterators: partition
using Flux
using Flux.Optimise: update!
using Flux.Losses: logitbinarycrossentropy
using Images
using MLDatasets: MNIST
using Statistics
using Parameters: @with_kw
using CUDA
```
<br>
We also need a struct HyperParam for defining the control parameters of our experiment.

```julia
@with_kw struct HyperParams
    batch_size::Int = 128
    latent_dim::Int = 100
    epochs::Int = 20
    verbose_freq::Int = 1000
    output_x::Int = 6
    output_y::Int = 6
    lr_disc::Float64 = 0.0002
    lr_gen::Float64 = 0.0002
end
```

## Loading the data
We will be using the MNIST data for hand written digits. The generator will be trained to *generate* hand-written digits and discriminator to *classify* if an image is a digit or not. You can find more about image loading in [this tutorial]().

```julia
function load_images(hparams::HyperParams)
    images = MNIST.traintensor(Float32)
    N = size(images)[end] # Save the number of images, N = 60000

    # Normalize to [-1, 1]
    normalized_images = @.(2f0 * images - 1f0);
    image_tensor = reshape(normalized_images, 28, 28, 1, :);

    # Parition the image tensor into batche using Flux dataloader.
    data_loader = Flux.DataLoader(image_tensor, batchsize=hparams.batch_size, shuffle=true)
    
    return data_loader
end
```
## Create the models


### The generator
Our generator is a neural network that maps a low dimensional data to a high dimensional form.

- This low dimensional data(seed) is generally a vector of random values sampled from a normal distribution.
- The high dimensional data here is the generated image.

The [Flux.ConvTranspose](https://fluxml.ai/Flux.jl/stable/models/layers/#Flux.ConvTranspose) is used for the upsampling operation. The Dense layer can be used for taking the seed as input and then upsample several times until we reach the desired output size (In our case it is 28x28x1).

We will be using [leakyrelu](https://fluxml.ai/Flux.jl/stable/models/nnlib/#NNlib.leakyrelu) as an activation function for each layer except the output layer where we use tanh.
```julia
function Generator(latent_dim)
    Chain(
        Dense(latent_dim, 7*7*256, bias=false),
        BatchNorm(7*7*256, relu),

        x -> reshape(x, 7, 7, 256, :),
        
        ConvTranspose((5, 5), 256 => 128; stride = 1, pad = 2, init = dcgan_init),
        BatchNorm(128, relu),
        
        ConvTranspose((4, 4), 128 => 64; stride = 2, pad = 1, init = dcgan_init),
        BatchNorm(64, relu),
        
        ConvTranspose((4, 4), 64 => 1; stride = 2, pad = 1, init = dcgan_init),
        x -> tanh.(x)
    )
end
```
<br>
Time for a small test!! We will feed a random vector as seed to the generator to check if our model is working.

```julia
# Generator of latent dim 100
gen = Generator(100)
noise = randn(Float32, 100, 1)

# Feed the random noise to the generator
image = gen(noise)[:,:,:,1]
@assert size(image) == (28, 28, 1)
```

<br>
Our generator model is yet to learn the correct weights, so it does not give us a recognizeable image for now. To train our poor generator we need it's equal rival, the discriminator.
<br>

### Discriminator

The Disciminator is a simple CNN based image classifier. For a more detailed implementaion refer to [this tutorial](). 

```julia
function Discrimnator()
    Chain(
        Conv((4, 4), 1 => 64; stride = 2, pad = 1, init = dcgan_init),
        x->leakyrelu.(x, 0.3f0),
        Dropout(0.3),
        
        Conv((4, 4), 64 => 128; stride = 2, pad = 1, init = dcgan_init),
        x->leakyrelu.(x, 0.3f0),
        Dropout(0.25),

        x->reshape(x, 7 * 7 * 128, :),
        Dense(7 * 7 * 128, 1)
    )
end
```

## Losses and Optimizers

Before we proceed to the losses for generator and discriminator, we need to review a simpler loss function called Binary Cross entropy. <>

Flux's binarycrossentropy does the job for us. But due to numerical stability it is always perfered to compute cross-entropy using logits. Flux provides logitbinarycrossentropy specifically for this purpose. Mathematically it equivalent to binarycrossentropy(σ(ŷ), y, kwargs...).
<br>

### Discriminator Loss

The discriminator loss quantifies how well the discriminator is able to distinguish real images from fakes. It compares 

- discriminator's predictions on real images to an array of 1s, and
- discriminator's predictions on fake (generated) images to an array of 0s.

These two losses are summed together to give a scalar discriminator loss. So we can write the loss function of discriminator as,

```julia
function discriminator_loss(real_output, fake_output)
    real_loss = logitbinarycrossentropy(real_output, 1)
    fake_loss = logitbinarycrossentropy(fake_output, 0)
    return real_loss + fake_loss
end
```
<br>

### Geneator Loss

The generator's loss quantifies how well it was able to trick the discriminator. Intuitively, if the generator is performing well, the discriminator will classify the fake images as real (or 1).

```julia
generator_loss(fake_output) = logitbinarycrossentropy(fake_output, 1)
```
<br>
We also need optimizers for our network. For both generator and discriminator we will use the ADAM optimizer.

```julia
disc_opt = ADAM(hparam.disc_lr)
gen_opt = ADAM(hparam.gen_lr)
```

## Training


## Resources & References
- [The DCGAN implementaion in Model Zoo.](https://github.com/FluxML/model-zoo/blob/master/vision/dcgan_mnist/dcgan_mnist.jl)
- []
