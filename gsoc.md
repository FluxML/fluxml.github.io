+++
title = "Google Summer of Code"
+++

~~~
<h1>FluxML Projects - Summer of Code</h1>
~~~

Flux usually takes part in [Google Summer of Code](https://summerofcode.withgoogle.com) as a NumFocus organization. We follow the same [rules and application guidelines](https://julialang.org/jsoc/projects/) as Julia, so please check there for more information on applying. Below are a set of ideas for potential projects (though you are welcome to explore anything you are interested in). **Please note that year for the idea list. Project ideas from a previous year will not always carry over to a new year.**

Flux projects are typically very competitive; we encourage you to get started early, as successful contributors typically have early PRs or working prototypes as part of the application. It is a good idea to simply start contributing via issue discussion and PRs and let a project grow from there; you can take a look at [this list of issues](https://github.com/FluxML/Flux.jl/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) for some starter contributions. Please see the [contributing guide](https://github.com/FluxML/Flux.jl/blob/master/CONTRIBUTING.md) for help first.

# FluxML GSoC 2023 Ideas List

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


## Benchmark tooling for common models and operations

Create a benchmarking tool for the FluxML ecosystem that we can invoke on demand from PRs. This project will require previous experience with training machine learning models at a "low-level" (i.e. without the use of tools like PyTorch Lightning).

**Difficulty.** Moderate. **Duration.** 350 hours

### Description

FluxML's machine learning stack is distributed across many packages, and each package is designed to function as independently as possible. This is done to maximize code-reuse across the Julia ML ecosystem. As a result, it is challenging for us to quantitively determine the performance impact of code changes without manual testing. The goal of this project is to develop a FluxML-specific benchmarking package. The package should allow us to install specific commits of various packages across the FluxML stack, then run a benchmarking suite. The test suite will include low-level operations like convolution or simple gradient calls, as well as complete end-to-end examples like a full forward/backward pass of Metalhead.jl models. 

The ideal candidate should have experience with multiple ML task setups such as vision, autoregressive language modeling, time series forecasting, etc. Furthermore, some experience with Github Actions and continuous integration (CI) is suggested.

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
