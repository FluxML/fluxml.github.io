---
title: Deep Convolutional Generative Adversarial Network(DCGAN)
author: Deeptendu Santra
layout: blog
tag: Generative Adversarial Neural Networks
---

This is a beginner level tutorial for generating images of hand-written digits using a [Deep Convolutional Generative Adverserial Network](https://arxiv.org/pdf/1511.06434.pdf) and is largely influenced by the [TensorFlow tutorial on DCGAN](https://www.tensorflow.org/tutorials/generative/dcgan).

## What are GANs?
[Generative Adverserial Neural Netoworks or simply GANs](https://arxiv.org/abs/1406.2661) introduced by Goodfellow et al. is one of the most innovative ideas in modern-day machine learning. GANs are used extensively in the field of image and audio processing to generate high-quality synthetic data that can easily be passed off as real data.

A GAN is composed of two sub-models acting against one another. One of the sub-models is a **generator** and the other one is called a **discriminator**. The generator can be considered as an artist who draws(generates) new images that look real, whereas the discriminator is a critic who learns to tell real images apart from fakes.

<img src="/assets/2021-10-8-dcgan-mnist/cat_gan.png">

The GAN starts off with a generator and discriminator which have very little or no idea about the underlying data. During training, the generator progressively becomes better at creating images that look real, while the discriminator becomes better at telling them apart. The process reaches equilibrium when the discriminator can no longer distinguish real images from fakes.

<img src="https://www.tensorflow.org/tutorials/generative/images/gan2.png" width="70%">

This tutorial demonstrates the usage of GAN's leveraging the MNIST dataset. The following animation shows a series of images produced by the generator as it was trained for 25 epochs. The images begin as random noise, but over time, the images become increasingly similar to handwritten numbers.
<br><br>
<p align="center">
<img src="/assets/2021-10-8-dcgan-mnist/output.gif" align="middle" width="200">
</p>

## Setup

We need to install some Julia Packages before we start with our implementation of DCGAN. Since this tutorial is aligned with the [DCGAN implementation in Model-Zoo](https://github.com/FluxML/model-zoo/tree/master/vision/dcgan_mnist), it is recommended to initialize your working environment using the [Project.toml](https://github.com/FluxML/model-zoo/blob/master/vision/dcgan_mnist/Project.toml) instead of installing dependencies manually.

Using the Julia REPL:
```julia
toml_link = "https://raw.githubusercontent.com/FluxML/model-zoo/master/vision/dcgan_mnist/Project.toml"
download(toml_link, "./Project.toml")

using Pkg
Pkg.activate(".")
Pkg.instantiate()
```
<br>
After installing the libraries, load the required packages and functions:
```julia
using Base.Iterators: partition
using Printf
using Random
using Images
using Parameters: @with_kw
using Flux
using Flux.Optimise: update!
using Flux.Losses: logitbinarycrossentropy
using MLDatasets: MNIST
using Statistics
using CUDA
```
<br>
Now we set default values for the learning rates, batch size, epochs, the usage of a GPU (if available) and other hyperparameters for our model:
```julia
@with_kw struct HyperParams
    batch_size::Int = 128
    latent_dim::Int = 100
    epochs::Int = 25
    verbose_freq::Int = 1000
    output_dim::Int = 5
    disc_lr::Float64 = 0.0002
    gen_lr::Float64 = 0.0002
    device::Function = gpu
end
```

## Loading the data
We will be using the [MNIST](http://yann.lecun.com/exdb/mnist/) dataset for hand written digits. You can find out more about loading images in Flux by reading [this tutorial](https://fluxml.ai/tutorials/2021/01/21/data-loader.html).

```julia
function load_images(hparams::HyperParams)
    images = MNIST.traintensor(Float32)
    N = size(images)[end] # Save the number of images, usually N = 60000

    # Normalize to [-1, 1]
    normalized_images = @.(2f0 * images - 1f0);
    image_tensor = reshape(normalized_images, 28, 28, 1, :);

    # Parition the image tensor into batche using Flux dataloader.
    dataloader = Flux.DataLoader(image_tensor, batchsize=hparams.batch_size, shuffle=true)

    return dataloader
end
```
<br>
*Note: The data returned from the dataloader is loaded is on the CPU. If you plan to use GPU, we need to put the data to the GPU before/during training.*

## Create the models


### The generator

Our generator, a.k.a. the artist, is a neural network that maps low dimensional data to a high dimensional form.

- This low dimensional data(seed) is generally a vector of random values sampled from a normal distribution.
- The high dimensional data here is the generated image.

The [Flux.ConvTranspose](https://fluxml.ai/Flux.jl/stable/models/layers/#Flux.ConvTranspose) function is used for the upsampling process. The Dense layer is used for taking the seed as input and then it is upsampled several times until we reach the desired output size (in our case, 28x28x1).

We will be using the [leakyrelu](https://fluxml.ai/Flux.jl/stable/models/nnlib/#NNlib.leakyrelu) activation function for each layer except the output layer, where we use `tanh`. We will also be using the weight initialization mentioned in the original DCGAN paper.

```julia
# Function for intializing the generator weights
dcgan_init(shape...) = randn(Float32, shape...) * 0.02f0
```
<br>
```julia
function Generator(latent_dim)
    Chain(
        Dense(latent_dim, 7*7*256, bias=false),
        BatchNorm(7*7*256, relu),

        x -> reshape(x, 7, 7, 256, :),

        ConvTranspose((5, 5), 256 => 128; stride = 1, pad = SamePad(), init = dcgan_init, bias=false),
        BatchNorm(128, relu),

        ConvTranspose((5, 5), 128 => 64; stride = 2, pad = SamePad(), init = dcgan_init, bias=false),
        BatchNorm(64, relu),

        ConvTranspose((5, 5), 64 => 1; stride = 2, pad = SamePad(), init = dcgan_init, bias=false),
        x -> tanh.(x)
    )
end
```
<br>
Time for a small test!! We will feed a random vector as a seed to the generator to check if our model is working:

```julia
# Create a dummy generator of latent dim 100
gen = Generator(100)
noise = randn(Float32, 100, 3) # The last axis is the batch size

# Feed the random noise to the generator
image = gen(noise)
@assert size(image) == (28, 28, 1, 3)
```

<br>
Our generator model is yet to learn the correct weights, so it does not give us a recognizeable image for now. To train our poor generator we need its equal rival, the *discriminator*.
<br>

### Discriminator

The Disciminator is a simple CNN based image classifier. For a more detailed implementaion refer to [this tutorial](). 

```julia
function Discriminator()
    Chain(
        Conv((5, 5), 1 => 64; stride = 2, pad = SamePad(), init = dcgan_init),
        x->leakyrelu.(x, 0.2f0),
        Dropout(0.3),

        Conv((5, 5), 64 => 128; stride = 2, pad = SamePad(), init = dcgan_init),
        x->leakyrelu.(x, 0.2f0),
        Dropout(0.3),

        x->reshape(x, 7 * 7 * 128, :),
        Dense(7 * 7 * 128, 1)
    )
end
```
<br>
Now let us check if our discriminator is working:

```julia
# Dummy Disc
disc = Discriminator()
results = disc(image)
@assert size(results) == (1, 3)
```
<br>

Just like the generator, the untrained discriminator has no idea about what is a real or fake image. It is trained alongside the generator to output positive values for real images, and negative values for fake images.

## Losses and Optimizers

In GAN problems, there are only two labels, fake and real, so we will be using `BinaryCrossEntropy` as a preliminary loss function. 

Flux's `binarycrossentropy` does the job for us. But due to numerical stability, it is always preferred to compute cross-entropy using logits. Flux provides [logitbinarycrossentropy](https://fluxml.ai/Flux.jl/stable/models/losses/#Flux.Losses.logitbinarycrossentropy) specifically for this purpose. Mathematically it equivalent to `binarycrossentropy(σ(ŷ), y, kwargs...).`
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

### Generator Loss

The generator's loss quantifies how well it was able to trick the discriminator. Intuitively, if the generator is performing well, the discriminator will classify the fake images as real (or 1).

```julia
generator_loss(fake_output) = logitbinarycrossentropy(fake_output, 1)
```
<br>
We also need optimizers for our network. Why you may ask? Read more [here](https://towardsdatascience.com/overview-of-various-optimizers-in-neural-networks-17c1be2df6d5). For both the generator and discriminator, we will use the [ADAM optimizer](https://fluxml.ai/Flux.jl/stable/training/optimisers/#Flux.Optimise.ADAM).

```julia
disc_opt = ADAM(hparam.disc_lr)
gen_opt = ADAM(hparam.gen_lr)
```

## Utility functions

The output of the generator ranges from (-1, 1), so it needs to processed before we can display it. Moreover, to visualize the output of the generator over time, we define a function to create a grid of generated images:

```julia
function create_output_image(gen, fixed_noise, hparams)
    fake_images = @. cpu(gen(fixed_noise))
    image_array = reduce(vcat, reduce.(hcat, partition(fake_images, hparams.output_dim)))
    image_array = permutedims(dropdims(image_array; dims=(3, 4)), (2, 1))
    image_array = @. Gray(image_array + 1f0) / 2f0
    return image_array
end
```

## Training

For the sake of simplifying our training problem, we will divide the generator and discriminator training into two individual functions. 

```julia
function train_discriminator!(gen, disc, x, disc_opt, hparams)
    # Generate a noise of type similar to x
    noise = randn!(similar(x, (hparams.latent_dim, hparams.batch_size))) 
    # Generate noise
    fake_input = gen(noise)

    ps = Flux.params(disc)

    # Forward pass
    loss, back = Flux.pullback(ps) do
        discriminator_loss(disc(x), disc(fake_input))
    end
    # Backward pass
    grad = back(one(loss))

    # Update the discriminator parameters
    update!(disc_opt, ps, grad)
    return loss
end
```
<br>
Now, we define a similar function for generator.

```julia
function train_generator!(gen, disc, x, gen_opt, hparams)
    noise = randn!(similar(x, (hparams.latent_dim, hparams.batch_size))) 
    ps = Flux.params(gen)

    loss, back = Flux.pullback(ps) do
        generator_loss(disc(gen(noise)))
    end

    grad = back(one(loss))
    update!(gen_opt, ps, grad)
    return loss
end
```
<br>

Now that we defined almost everything we need, we integrate everything into the `train` function. 

```julia
function train(hparams)

    dev = hparams.device
    # Check if CUDA is actually present
    if hparams.device == gpu
      if !CUDA.has_cuda()
      dev = cpu
      @warn "No gpu found, falling back to CPU"
      end
    end

    dataloader = load_MNIST_images(hparams)

    # Create a fixed noise to visualizing the training of generator over time
    fixed_noise = [randn(Float32, hparams.latent_dim, 1) |> dev for _=1:hparams.output_dim^2]

    # Initialize the models
    disc = Discriminator() |> dev
    gen =  Generator(hparams.latent_dim) |> dev

    # Initialize the optimizers
    opt_dscr = ADAM(hparams.disc_lr)
    opt_gen = ADAM(hparams.gen_lr)

    # Training
    train_steps = 0
    for ep in 1:hparams.epochs
        @info "Epoch $ep"
        for x in dataloader
            x = x |> dev
            # Update discriminator and generator
            loss_disc = train_discriminator!(gen, disc, x, disc_opt, hparams)
            loss_gen = train_generator!(gen, disc, x, gen_opt, hparams)

            if train_steps % hparams.verbose_freq == 0
                @info("Train step $(train_steps), Discriminator loss = $(loss_disc), Generator loss = $(loss_gen)")
                # Save generated fake image
                output_image = create_output_image(gen, fixed_noise, hparams)
                save(@sprintf("output/dcgan_steps_%06d.png", train_steps), output_image)
            end
            train_steps += 1
        end
    end

    output_image = create_output_image(gen, fixed_noise, hparams)
    save(@sprintf("output/dcgan_steps_%06d.png", train_steps), output_image)

    return nothing
end
```

Train the GAN:

```julia
# Define the hyper-parameter
hparams = HyperParams()
train(hparams)
```

## Output
The generated images are stored inside the `output` folder. To visualize the output of the generator over time, we create gif of the generate images.

```julia
folder = "output"
img_paths = [img_path for img_path in readdir(folder, join=true)]
images = load.(img_path)
gif_mat = cat(d..., dims=3)
save("./output.gif", a)
```
<br>
<p align="center">
<img src="/assets/2021-10-8-dcgan-mnist/output.gif" align="middle" width="200">
</p>

## Resources & References
- [The DCGAN implementaion in Model Zoo.](http=s://github.com/FluxML/model-zoo/blob/master/vision/dcgan_mnist/dcgan_mnist.jl)
