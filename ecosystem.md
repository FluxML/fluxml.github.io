---
layout: blog
title: Ecosystem
---
 
This section lists tools that complement Flux in typical machine learning and deep learning workflows. To add your project please [send a PR](https://github.com/FluxML/fluxml.github.io/edit/master/ecosystem.md). See also academic work [citing Flux](https://scholar.google.com/scholar?oi=bibs&hl=en&cites=9731162218836700005) [or Zygote](https://scholar.google.com/scholar?oi=bibs&hl=en&cites=11943854577624257878).
 
 
## Table of contents
 
* [Advanced models](#advanced-models)
* [Computer Vision](#computer-vision)
* [Datasets](#datasets)
* [Differentiable programming](#differentiable-programming)
* [Graph learning](#graph-learning)
* [Miscellaneous](#miscellaneous)
* [Natural language processing](#natural-language-processing)
* [Pipeline extensions](#pipeline-extensions)
* [Plumbing](#plumbing)
* [Probabilistic programming](#probabilistic-programming)
* [Reinforcement learning](#reinforcement-learning)
 
 
## Advanced models
 
* [FluxArchitectures](https://github.com/sdobber/FluxArchitectures) is a collection of slightly more advanced network architectures.
 
[⇧ back to top](#table-of-contents)
 
 
## Computer Vision
 
 
* [ObjectDetector.jl](https://github.com/r3tex/ObjectDetector.jl) provides ready-to-go image analysis via YOLO.
* [Metalhead.jl](https://github.com/FluxML/Metalhead.jl) includes many state-of-the-art computer vision models which can easily be used for transfer learning.
* [UNet.jl](https://github.com/DhairyaLGandhi/UNet.jl) is a generic UNet implementation.
 
[⇧ back to top](#table-of-contents)
 
 
## Datasets
 
* [MLDatasets.jl](https://github.com/JuliaML/MLDatasets.jl)  focuses on downloading, unpacking, and accessing benchmark datasets.
* [JuliaML](https://juliaml.github.io/) provides general abstractions and algorithms for modeling and optimization, implementations of common models, and tools for working with datasets.
 
[⇧ back to top](#table-of-contents)
 
 
## Differentiable programming
 
* The [SciML](https://sciml.ai/) ecosystem uses Flux and Zygote to mix neural nets with differential equations, to get the best of black box and mechanistic modelling.
* [DiffEqFlux](https://github.com/SciML/DiffEqFlux.jl) provides tools for creating Neural Differential Equations.
* [Flux3D](https://github.com/nirmal-suthar/Flux3D.jl) shows off machine learning on 3D data.
* [RayTracer.jl](https://github.com/avik-pal/RayTracer.jl) combines ML with computer vision via a differentiable renderer.
* [Duckietown.jl](https://github.com/tejank10/Duckietown.jl) Differentiable Duckietown simulator.
* The [Yao](https://github.com/QuantumBFS/Yao.jl) project uses Flux and Zygote for Quantum Differentiable Programming.
 
[⇧ back to top](#table-of-contents)
 
 
## Graph learning
 
* [GeometricFlux](https://github.com/yuehhua/GeometricFlux.jl) makes it easy to build fast neural networks over graphs.
 
[⇧ back to top](#table-of-contents)
 
 
## Miscellaneous
 
*[AdversarialPrediction.jl](https://github.com/rizalzaf/AdversarialPrediction.jl) provides a way to easily optimize generic performance metrics in supervised learning settings using the [Adversarial Prediction](https://arxiv.org/abs/1812.07526) framework.
* [Mill](https://github.com/pevnak/Mill.jl) helps to prototype flexible multi-instance learning models.
* [Torch.jl](https://github.com/FluxML/Torch.jl) exposes torch in Julia.
 
[⇧ back to top](#table-of-contents)
 
 
## Natural language processing
 
* [Transformers.jl](https://github.com/chengchingwen/Transformers.jl) provides components for Transformer models for NLP, as well as providing several trained models out of the box.
* [TextAnalysis.jl](https://github.com/JuliaText/TextAnalysis.jl) provides several NLP algorithms that use Flux models under the hood.
 
[⇧ back to top](#table-of-contents)
 
 
## Pipeline extensions
 
* [DLPipelines.jl](https://github.com/lorenzoh/DLPipelines.jl) is an interface for defining deep learning data pipelines.
 
[⇧ back to top](#table-of-contents)
 
 
## Plumbing
 
Tools to put data into the right order for creating a model.
 
* [Augmentor.jl](https://github.com/Evizero/Augmentor.jl) is a real-time library augmentation library for increasing the number of training images.
* [DataAugmentation.jl](https://github.com/lorenzoh/DataAugmentation.jl) aims to make it easy to build stochastic label-preserving augmentation pipelines for your datasets.
* [MLDataUtils.jl](https://github.com/JuliaML/MLDataUtils.jl) is a utility package for generating, loading, partitioning, and processing Machine Learning datasets.
 
[⇧ back to top](#table-of-contents)
 
 
## Probabilistic programming
 
* [Turing.jl](https://github.com/TuringLang/Turing.jl) extends Flux's differentiable programming capabilities to probabilistic programming.
* [Omega](https://github.com/zenna/Omega.jl) is a research project aimed at causal, higher-order probabilistic programming.
* [Stheno](https://github.com/willtebbutt/Stheno.jl) provides flexible Gaussian processes.
 
[⇧ back to top](#table-of-contents)
 
 
## Reinforcement learning
 
* [AlphaZero.jl](https://github.com/jonathan-laurent/AlphaZero.jl)  provides a generic, simple and fast implementation of Deepmind's AlphaZero algorithm.
 
[⇧ back to top](#table-of-contents)
 
