+++
title = "Google Summer of Code"
+++

~~~
<h1>FluxML Projects - Summer of Code</h1>
~~~

Flux usually takes part in [Google Summer of Code](https://summerofcode.withgoogle.com) as a NumFocus organization. We follow the same [rules and application guidelines](https://julialang.org/jsoc/projects/) as Julia, so please check there for more information on applying. Below are a set of ideas for potential projects (though you are welcome to explore anything you are interested in). **Please note the year by the ideas list below. Project ideas from a previous year will not always carry over to a new year.**

Flux projects are typically very competitive; we encourage you to get started early, as successful contributors typically have early PRs or working prototypes as part of the application. It is a good idea to simply start contributing via issue discussion and PRs and let a project grow from there; you can take a look at [this list of issues](https://github.com/FluxML/Flux.jl/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) for some starter contributions. Please see the [contributing guide](https://github.com/FluxML/Flux.jl/blob/master/CONTRIBUTING.md) for help first.

# FluxML GSoC 2024 Ideas List

## Writing Julia-native kernels for common NN operations

Implement optimized kernels for common neural network operations for which we don't already have Julia-native implementations. This project will require experience with GPU kernel writing and performance optimizations.

**Difficulty.** Hard. **Duration.** 350 hours

### Description

Many ML frameworks are making the move away from vendor-specific libraries (like CUBLAS, CUDNN, etc.) towards more generic, JIT-compiled implementations of ML-related kernels, like BLAS, softmax, ReLU, etc. The reasons for this move are many-fold:
- Vendor-provided libraries often only work on that vendor's hardware and software
- These libraries only support certain element types, tensor shapes/sizes, and limited array view/stride/transpose support
- These libraries often expect to be executed from the host, without a device-side launchable equivalent
- These libraries have unreliable build systems or are binary blobs

Improving this state of affairs for Flux will involve using Julia's existing GPU and compute kernel libraries (e.g KernelAbstractions.jl) to implement various accelerated, cross-vendor routines. These kernels should be both composable and performance competitive with Flux's current generic code paths. Examples of routines specifically useful for implementing Neural Networks include:

- GEMM and GEMV
- Softmax
- Batchnorm and Layernorm
- ReLU
- Convolution/correlation

The ideal candidate should have experience with what operations are used in popular ML models and how they are commonly implemented on GPU. This includes experience writing and benchmarking high performance GPU kernels. Because kernels will be required for both training and inference, an understanding of automatic differentiation (AD) is also highly recommended.

**Mentors.** [Julian Samaroo](https://github.com/jpsamaroo), [Kyle Daruwalla](https://github.com/darsnack), [Brian Chen](https://github.com/ToucheSir)

### Prerequisites

- Julia language fluency is essential.
- Experience with low-level GPU kernel programming is strongly recommended.
- Experience with common primitive machine learning ops (forwards and backwards passes) and their interaction is recommended.
- Familiarity with existing prior art such as [tiny-cuda-nn](https://github.com/NVlabs/tiny-cuda-nn) is preferred.

### Your contributions

- A new package containing the optimized kernels and any supporting code for integration into Flux/Flux's operation library [NNlib.jl](https://github.com/FluxML/NNlib.jl).
- Tests on CI and a simple benchmark harness for the new NN kernel library.
- A proof-of-concept example showing the kernels being used with kernel fusion on device (GPU).


## Creating runnable training and testing workflows for computer vision models

Write a suite of scripts that demonstrate how to use [Metalhead.jl](https://github.com/FluxML/Metalhead.jl) models for a variety of computer vision tasks and allow for ongoing verification of model correctness.

**Difficulty.** Moderate. **Duration.** 350 hours

### Description

Metalhead.jl is Flux's computer vision library and contains a wide range of models along with pre-trained weights. However, it currently lacks a set of examples showcasing how to use the library in complete computer vision workflows. This includes aspects such as integrating data augmentation, manipulating hyperparameters, tracking metrics and evaluating trained models.
Simultaneously, Metalhead does not have a comprehensive set of end-to-end tests to ensure all models can be trained to convergence and to catch less obvious performance or correctness regressions.
This project will help fill both needs by creating a set of self-contained, runnable scripts which exercise the functionality of Metalhead models across a number of tasks. The choice of models and tasks may vary, but the top priority will be commonly-used ones such as ResNet and image classification.

The ideal candidate should have practical experience with training deep learning models for computer vision tasks, as well as sufficient familiarity with Julia to work independently with complex libraries (e.g. Flux) on a medium-sized codebase. Direct experience using Metalhead.jl is not required but highly recommended. 

**Mentors.** [Brian Chen](https://github.com/ToucheSir), [Kyle Daruwalla](https://github.com/darsnack)

### Prerequisites

- Julia language fluency is essential.
- Github CI and experience with GH Actions is strongly suggested.
- Experience with more than one ML task
  (e.g. image classification, autoregressive language modeling, etc.).
- Familiarity with prior art is preferred:
    - [BenchmarkCI.jl](https://github.com/tkf/BenchmarkCI.jl)
    - [JuliaGPU speed center](https://speed.juliagpu.org)
    - [TaylorDiff benchmarking site](https://benchmark.tansongchen.com/TaylorDiff.jl)

### Your contributions

- A new FluxML package, FluxBenchmarks.jl, that will perform configurable benchmarking across our ML stack.
- Github Actions integration for FluxBenchmarks.jl to invoke the tool from PRs.
- A benchmarking suite that will build your experience with different types of ML models and operations across the stack.
