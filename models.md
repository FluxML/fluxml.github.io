---
layout: blog
title: Ecosystem
---

This page lists models available for reuse in Flux, as well other useful projects in the ecosystem. To add your project please [send a PR](https://github.com/FluxML/fluxml.github.io/edit/master/models.md).

## Modelling packages

There are a number of packages in the Flux ecosystem designed to help with creating different kinds of models.

* [Transformers.jl](https://github.com/chengchingwen/Transformers.jl) provides components for Transformer models for NLP, as well as providing several trained models out of the box.

* [DiffEqFlux](https://github.com/SciML/DiffEqFlux.jl) provides tools for creating Neural Differential Equations.

* [GeometricFlux](https://github.com/yuehhua/GeometricFlux.jl) makes it easy to build fast neural networks over graphs.

* [Flux3D](https://github.com/nirmal-suthar/Flux3D.jl) shows off machine learning on 3D data.

* [AdversarialPrediction.jl](https://github.com/rizalzaf/AdversarialPrediction.jl) provides a way to easily optimize generic performance metrics in supervised learning settings using the [Adversarial Prediction](https://arxiv.org/abs/1812.07526) framework.

* [Metalhead.jl](https://github.com/FluxML/Metalhead.jl) includes many state-of-the-art computer vision models which can easily be used for transfer learning.

## Projects using Flux

Other projects use Flux under the hood to provide machine learning capabilities, or to combine ML with another domain.

* The [Yao](https://github.com/QuantumBFS/Yao.jl) project uses Flux and Zygote for Quantum Differentiable Programming.

* The [SciML](https://sciml.ai/) ecosystem uses Flux and Zygote to mix neural nets with differential equations, to get the best of black box and mechanistic modelling.

* [ObjectDetector.jl](https://github.com/r3tex/ObjectDetector.jl) provides ready-to-go image analysis via YOLO.

* [TextAnalysis.jl](https://github.com/JuliaText/TextAnalysis.jl) provides several NLP algorithms that use Flux models under the hood.

* [RayTracer.jl](https://github.com/avik-pal/RayTracer.jl) combines ML with computer vision via a differentiable renderer.

* [Turing.jl](https://github.com/TuringLang/Turing.jl) extends Flux's differentiable programming capabilities to probabilistic programming.

* [Stheno](https://github.com/willtebbutt/Stheno.jl) provides flexible Gaussian processes.

* [Omega](https://github.com/zenna/Omega.jl) is a research project aimed at causal, higher-order probabilistic programming.

See also academic work [citing Flux](https://scholar.google.com/scholar?oi=bibs&hl=en&cites=9731162218836700005) [or Zygote](https://scholar.google.com/scholar?oi=bibs&hl=en&cites=11943854577624257878).


[comment]: <> ## Trained models

[comment]: <> TODO table.
