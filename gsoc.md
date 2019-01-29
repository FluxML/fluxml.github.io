---
layout: page
title: Google Summer of Code
---

# Google Summer of Code Projects

Flux usually takes part in [Google Summer of Code](https://summerofcode.withgoogle.com), as part of the wider Julia organisation. We follow the same [rules and application guidelines](https://julialang.org/soc/ideas-page) as Julia, so please check there for more information on applying. Below are a set of ideas for potential projects (though you are welcome to explore anything you are interested in).

Flux projects are typically very competitive; we encourage you to get started early, as successful students typically have early PRs or working prototypes as part of the application. Project mentors are [Mike Innes](https://github.com/MikeInnes), [Dhairya Gandhi](https://github.com/dhairyagandhi96/), [Elliot Saba](https://github.com/staticfloat), unless otherwise stated.

## NLP Tools and Models

Build deep learning models for Natural Language Processing in Julia. [TextAnalysis](https://github.com/juliatext/TextAnalysis.jl)  and [WordTokenizers](https://github.com/JuliaText/WordTokenizers.jl) contains the basic algorithms and data structures to work with textual data in Julia. On top of that base, we want to build modern deep learning models based on recent research. The following tasks can span multiple students and projects.

* Implement BERT in Julia
* Implement ELMo in Julia
* Implement practical models for sentiment analysis, part of speech (POS) tagging, named entity recognition (NER), classification and parsing
* Test and validate these models

**Mentors**: [Avik Sengupta](https://github.com/aviks/) & [Lyndon White](https://github.com/oxinabox/)

## Model Zoo Examples

Flux's [model zoo](https://github.com/FluxML/model-zoo/) contains examples of a wide range of deep learning models and techniques. This project would involve adding new models, showing how to recreate state-of-the-art results (e.g. AlphaGo) or interesting and unusual model architectures (e.g. transformer networks). We'd be particularly interested in any models involving reinforcement learning, or anything with images, sound or speech.

Some experience with implementing deep learning models would be ideal for this project, but is not essential for a student willing to pick up the skills and read ML papers. It's up to you whether you implement a single ambitious model, or multiple small ones. A good source of inspiration might be the [NIPS Challenge](https://nurture.ai/nips-challenge).

## Benchmarks

A benchmark suite would help us to keep Julia's performance for ML models in shape, as well as revealing opportunities for improvement. Like the model-zoo project, this would involve contributing standard models that exercise common ML use case (images, text etc) and profiling them. The project could extend to include improving performance where possible, or creating a "benchmarking CI" like Julia's own [nanosoldier](https://github.com/JuliaCI/Nanosoldier.jl).

## Sparse GPU and ML support

While Julia supports dense GPU arrays well via [CuArrays](https://github.com/JuliaGPU/CUSPARSE.jl), we lack up-to-date wrappers for sparse operations. This project would involve wrapping CUDA's sparse support, with [CUSPARSE.jl](https://github.com/JuliaGPU/CUSPARSE.jl) as a starting point, adding them to CuArrays.jl, and perhaps demonstrating their use via a sparse machine learning model.

## Accelerating optimization via machine learning with surrogate models

In many cases, when attempting to optimize a function `f(p)` each calculation
of `f` is very expensive. For example, evaluating `f` may require solving a
PDE or other applications of complex linear algebra. Thus, instead of always
directly evaluating `f`, one can develop a surrogate model `g` which is
approximately `f` by training on previous data collected from `f` evaluations.
This technique of using a trained surrogate in place of the real function
is called surrogate optimization and mixes techniques from machine learning
to accelerate optimization.

Advanced techniques [utilize radial basis functions](https://www.cambridge.org/core/journals/acta-numerica/article/kernel-techniques-from-machine-learning-to-meshless-methods/00686923110F799A1537C4F02BBAAE8E) and Gaussian
processes in order to interpolate to new parameters to estimate `f` in areas
which have not been sampled. [Adaptive training techniques](http://www.ressources-actuarielles.net/EXT/ISFA/1226.nsf/9c8e3fd4d8874d60c1257052003eced6/e7dc33e4da12c5a9c12576d8002e442b/$FILE/Jones01.pdf) explore how to pick new areas
to evaluate `f` to better hone in on global optima. The purpose of this project
is to explore these techniques and build a package which performs surrogate
optimizations.

**Recommended Skills**: Background knowledge of standard machine learning,
statistical, or optimization techniques. Strong knowledge of numerical analysis
is helpful but not required.

**Expected Results**: Library functions for performing surrogate optimization
with tests on differential equation models.

**Mentors**: [Chris Rackauckas](https://github.com/ChrisRackauckas)

## Parameter estimation for nonlinear dynamical models

Machine learning has become a popular tool for understanding data, but scientists
typically understand the world through the lens of physical laws and their
resulting dynamical models. These models are generally differential equations
given by physical first principles, where the constants in the equations such
as chemical reaction rates and planetary masses determine the overall dynamics.
The inverse problem to simulation, known as parameter estimation, is the process
of utilizing data to determine these model parameters.

The purpose of this project is to utilize the growing array of statistical,
optimization, and machine learning tools in the Julia ecosystem to build
library functions that make it easy for scientists to perform this parameter
estimation with the most high-powered and robust methodologies. Possible projects
include improving methods for Bayesian estimation of parameters via Stan.jl
and Julia-based libraries like Turing.jl, or global optimization-based approaches.
Novel techniques like classifying model outcomes via support vector machines
and deep neural networks is can also be considered. Research and benchmarking
to attempt to find the most robust methods will take place in this project.
Additionally, the implementation of methods for estimating structure, such
as [topological sensitivity analysis](http://www.pnas.org/content/111/52/18507)
along with performance enhancements to existing methods will be considered.

Some work in this area can be found in
[DiffEqParamEstim.jl](https://github.com/JuliaDiffEq/DiffEqParamEstim.jl)
and [DiffEqBayes.jl](https://github.com/JuliaDiffEq/DiffEqBayes.jl). Examples
can be found [in the DifferentialEquations.jl documentation](http://docs.juliadiffeq.org/latest/analysis/parameter_estimation.html).

**Recommended Skills**: Background knowledge of standard machine learning,
statistical, or optimization techniques. It's recommended but not required that
one has basic knowledge of differential equations and DifferentialEquations.jl.
Using the differential equation solver to get outputs from parameters can
be learned on the job, but you should already be familiar (but not necessarily
an expert) with the estimation techniques you are looking to employ.

**Expected Results**: Library functions for performing parameter estimation
and inferring properties of differential equation solutions from parameters.
Notebooks containing benchmarks determining the effectiveness of various methods
and classifying when specific approaches are appropriate will be developed
simultaneously.

**Mentors**: [Chris Rackauckas](https://github.com/ChrisRackauckas)
