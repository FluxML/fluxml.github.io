+++
title = "JSoC Cohort"
published = "30 June 2019"
author = "Tejan Karmali, Shreyas Kowshik, Kartikey Gupta, Manjunath Bhat, Avik Pal, Raghvendra Gupta"
+++

We are excited to introduce our JSoC students accepted this year! Flux is hosting 6 JSoC students this time. They are a mix of students funded by [Google Summer of Code](https://summerofcode.withgoogle.com/) and Julia Season of Contributions, which is run by the community, thanks to the generous support from [NumFOCUS](https://numfocus.org/). Large parts of Flux ecosystem were created or improved by the students accepted through JSoC, many of whom have gone on to become long time contributors to FluxML. This year, we are proud to have students who will be working on a variety of sub-domains of Machine Learning, ranging from Differentiable Programming and Reinforcement Learning to GAN and Ray Tracing; to demonstrate a fresh approach to these paradigms using Julia.


## Shreyas Kowshik: _Addition Of Baseline Models To Flux.jl_

The current state of the art algorithms in terms of reinforcement learning and generative models are not yet available in [Flux](https://github.com/FluxML). This project aims to add the following models with explicit documentation in the form of [blog](https://shreyas-kowshik.github.io/) and code : 

* CycleGAN
* pix2pix
* Proximal Policy Optimization
* Trust Region Policy Optimization
* Neural Image Captioning
* Deep Recurrent Q Networks
* Super Resolution GAN

## Kartikey Gupta: _Reinforcement Learning Environments for Julia_

This project aims at providing a collection of Reinforcement Learning environments, to facilitate research and experimentation in RL, in spirit of the OpenAI Gym. This includes the classic control environments, algorithmic environments, toy text examples, 2D game environments, Atari 2600 based game environments and a major part of the MuJoCo based robotic environments, along with their documentation and working examples. A differentiable NES (Nintendo Entertainment System) emulator will also added and available to this collection. Progress can be tracked [here](https://github.com/FluxML/Gym.jl).  
[Link to Project Blog](https://nextjournal.com/kraftpunk97)

## Manjunath Bhat: _Enriching Model Zoo with Deep Learning Models_

The aim of this project is to enrich Flux Model Zoo with unsupervised deep learning models, in particular variants of Generative Adversarial Networks. This project proposes to add the following models: 
* Spatial Transformer Networks 
* StarGAN for facial expression synthesis 
* VAE-GAN 
* Energy Based GAN 
* Gated Recurrent Convolutional Neural Network  

[Link to Project Blog](https://medium.com/@manjunathbhat9920)

## Raghvendra Gupta: _Sparsifying Neural Networks using Sensitivity Driven Regularization_

This project aims to quantify the output sensitivity to the parameters i.e. their relevance to network output and introduce a regularization term that gradually lowers the absolute value of sub-sensitive parameters. Thus a very large fraction of parameters approach zero and are eventually set to zero by simple thresholding. The models on which the sparsification experiment would be carried out are:
* VGG16
* VGG19
* MobileNet
* ResNet
* RL models (extended goal)  

The success of the experiment would be measured using Memory Footprint of the parameters, Compression Ratio and Runtime Performance of the models.  
[Link to Project Blog](https://medium.com/@raghav090897)

## Avik Pal: _Differentiable Ray Tracing_

Ray Tracing is a rendering technique which allows us to create photorealistic images given the scene information. However, at times given an image, we want to infer the state of the scene, i.e., the light sources, materials of the objects, the orientation of the camera, etc. Being able to incorporate the ability to differentiate through the ray tracer allows us to calculate gradients wrt arbitrary scene parameters and in turn, optimize them to obtain their exact values. Apart from this, the ray tracer can be used to train a self-driving car using BPTT (Back Propagation through Time). The package is available at [here](https://github.com/avik-pal/RayTracer.jl).

## Tejan Karmali: _Differentiable Duckietown_

[Duckietown](https://www.duckietown.org/) is an environment for autonomous vehicles research. It is a miniature town through which a car (or bot) needs to be navigated through. The town has multiple maps, which are different tasks the bot has to perform. The maps vary from a simple straight road to full fledged town. Over the summer I’ll be building this environment in julia, integrating it with the differentiable ray tracer to render the scene, and training the the bot for different tasks mentioned above. The package and progress can be tracked [here](https://github.com/tejank10/Duckietown.jl)
