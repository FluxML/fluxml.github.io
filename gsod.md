+++
title = "Google Season of Docs"
+++

~~~
<h1>FluxML Projects - Season of Docs</h1>
~~~

The Flux project is a participant in Google Season of Docs. In 2020, we had a technical writer work on [our website](https://www.youtube.com/watch?v=6s9J-ObQaAs&feature=emb_imp_woyt). The project was a success and we have since then build out various projects specifically for interested technical writers.

[Flux.jl](https://github.com/FluxML/Flux.jl) is an elegant approach to machine learning in Julia. It is designed to be hackable and flexible, extendable, and exposes powerful AD tools. It also provides abstractions over the popular layers and optimizers used in neural networks. It is built with differentiable programming in mind. The mentors for this project are [Dhairya Gandhi](https://github.com/DhairyaLGandhi).

## Tutorials

Flux is in dire need of complete tutorials in the [model-zoo](https://github.com/FluxML/model-zoo.git) as well as on the website. We can take inspiration from many existing projects that publish their tutorials, that take a look at common design patterns. This includes writing custom adjoints, new optimizers, transfer learning, and writing performance-sensitive code for many common kinds of networks that many people would be interested in writing.
This could also include cases that help users write custom loss functions, and even putting Flux models behind a web server.

## Updated Documentation and DocTests

Flux documentation needs a lot of rework since our generic approach to development means there are many general use cases that we support but might be a bit subtle to discover. So in that case, we need to highlight such common cases and make them known in the documentation.
We would like to use doc tests to also increase our coverage of and documentation of many of the common patterns we see in differentiating Julia code.

### Potential Impact

Flux is an innovative approach to machine learning. This also means that not all the same patterns and assumptions truly hold when translating from a different framework. It also needs a way to communicate a compelling description of how to implement many of the user-facing niceties that one might need in the course of completing an ML project. Through this, we want to also find areas of improvement where we could offer a better user experience.

This would also greatly benefit the adoption of Flux in the larger ML ecosystem, which we feel is currently held back due to not having enough of these simple patterns documented in an approachable form. We want to see an increase in the number of contributors to the various packages too since that would help us improve our stack better. Flux also utilizes simple to understand and performant code, made possible by Julia, and through this, we also want to bring awareness to how our ecosystem has matured, and increase its adoption in research and industry.