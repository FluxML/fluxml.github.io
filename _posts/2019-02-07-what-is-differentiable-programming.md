---
title: What is Differentiable Programming?
author: Mike Innes
layout: blog
---

> With four parameters I can fit an elephant, and with five I can make him wiggle his trunk. <br>– John Von Neumann

The idea of "differentiable programming" is coming up a lot in the machine learning world. To many, it's not clear if this term reflects a real shift in how researchers think about machine learning, or is just (another) rebranding of "deep learning". This post clarifies what new things differentiable programming (or DP) brings to the table, and what things it preserves.

Most importantly, I want to suggest that DP is actually a shift _opposite_ from the direction taken by deep learning; from wider and more heavily parameterised models to simpler ones that take more advantage of problem structure. To understand this, we must first clarify the relationship between ML and programming.


## Machine Learning == Programming

At a high level, both ML and programming solve the same problem: finding useful ways to transform information. We might want to transform integers into Fibonacci numbers, or mouse and keyboard inputs into 3D rendered scenes, or cat pictures into breed names, but these are all transformations. They can be described as a function [[y = f(x)]], and to fill in [[f]] we either train a model or hire a programmer.

Still, both approaches have very different tradeoffs. If we want to map a series of target locations to a flight plan for a drone, ML might better fit fuzzy empirical data, but it's easier to prove that a program makes sensible decisions under unusual conditions. More on this kind of tradeoff later.

But they are also not as different as they seem. At least outside of NASA's walls, magic constants and heuristics are ubiquitous in software, just as models have parameters. Compilers and operating systems frequently have to predict how other pieces of code will behave in order to optimise and schedule them; the infamous [OOM killer](https://lwn.net/Articles/317814/) in Linux takes a weighted average of various data about a process in order to decide how much memory it will free when killed. The difference between this and linear regression is only that a programmer has written down the weight matrix by hand.


## Brute Force with Benefits

There's been much interest in understanding why, on a theoretical level, neural networks work at all. Though the basic version is inspired by biological neurons, it's remarkably robust to approximations and numerical hacks, and there's little theoretical motivation for its various extensions. Papers presenting ground-breaking new architectures do not tend to come with mathematical lemmas attached. Instead, researchers seem to more-or-less follow their gut in building models, and the field rests on its spectacular empirical results.

Perhaps it helps to view ML as part of a continuum. On one side, hand-written programs that fully encode the structure of the problem they solve; on the other, heavily over-parameterised models which encode almost no structure. At the extreme, models become general enough to mimic any function at all, provided you can find the right parameters.

How do we do that? A brute force search over even a few hundred parameters would be far too expensive. But there's a trick: if we have gradients, we can take a pseudo-random walk around interesting parts of parameter space, increasing the chances of finding a good set. A quirk of the chain rule makes it amazingly efficient to get gradients of millions of parameters at once, making the search just barely practical. This trick gives up surprisingly little generality; it's far from obvious that we can come up with a differentiable objective when, say, working with sequences in language translation, but it turns out to be straightforward with a little ingenuity.

Notably missing from this story is the famous [[y = σ(W * x + b)]] formula. There's nothing particularly special about it, and certainly nothing to do with actual neurons; it's just a simple and flexible example of a highly-parameterised non-linear function. In fact, it's probably the worst such function in most cases.

A single neural net layer can, in principle, classify cat pictures, but only by the relatively uninteresting trick of acting as a lookup table. It's _guaranteed_ to work! – but the small print warns that you may need more parameters than there are atoms in the universe. To scale up we need the second major trick in the ML toolbox: encoding problem structure in the model.

The original example is the convolutional net. At its core the convolutional layer really just differentiates a standard [image kernel](https://en.wikipedia.org/wiki/Kernel_(image_processing)). Image kernels are effective for reasons that are long understood: primarily, they exploit translational invariance. An edge is an edge whether it shows up in the top left of an image or the centre, but where a perceptron would have to learn this case by case, a kernel can respond to any part of the image at once. It's hard to analyse convolutional nets in statistical terms, but much easier to see them as an auto-tuned version of what image processing experts used to write by hand.

Natural language models more obviously eschew the simple feedforward architecture. For example, Tree RNNs exploit grammatical structure in sentences, and use a recursive algorithm to turn the sentence into, say, a sentiment score. (NLP also exposes an interesting tradeoff between "smarter" models, like Tree RNNs, and ones based on convolutions or the Transformer, which exploit less structure but are simply easier to throw compute power at.)

These examples are already well known. But they are important, because they take the first steps from pure statistical models to program-model hybrids, exploring the wide space between ML and programming.


## Encoding Structure, Redux

Advances in the algorithmic differentiation (AD) supported by ML toolkits have allowed models to increasingly be viewed as programs, leading to more complex architectures. For example, NLP models increasingly look more like classical grammar parsers with [stack-augmented](https://arxiv.org/abs/1603.06021) models, and one can even implement a [Turing machine analog](https://arxiv.org/pdf/1410.5401.pdf) or a [programming language interpreter](https://arxiv.org/abs/1605.06640) in a differentiable way.

The final step taken by differentiable programming is to no longer see matrix multiplies, convolutions and RNNs as the fundamental building blocks of deep learning, but instead as mere special cases. We can apply the techniques of deep learning to *any* parameterised, differentiable function [[f(x)]]. In many cases [[f(x)]] might happen to be a matrix multiply, but in general we really can use anything – up to and including an [computation on a quantum computer](https://arxiv.org/abs/1803.00745). The more [[f]] outlines the general shape of the solution, the easier it is to get a good result.

There's actually nothing new in all this. Scientists have long used mechanistic models that sit between explicit programming and machine learning. Differential equations fit to data via sensitivities – as in physics, epidemiology or pharmacodynamics – are equivalent in all but terminology to neural networks (a relationship that's [already bearing fruit](https://arxiv.org/abs/1806.07366)).

The really powerful advance is this: pervasive differentiability means all these techniques snap together like lego bricks. This enables things like [incorporating physics engines into deep learning-based robotics models](https://arxiv.org/abs/1611.01652). Where current reinforcement learning algorithms need to build a detailed model of the external world from only a coarse-grained reward signal (which [sounds like a brute force problem](https://twitter.com/emilecontal/status/1089011610566385664) if anything does), we can instead just drop in detailed, precise knowledge of physical systems before training even begins.

As in the sciences, hybrid models can not only be more effective, but also resolve some of the tradeoffs between deep learning and programming. For example, our drone's flight-path planner might have a neural network component that can only make provably small adjustments to a reliable explicit program. This is also good for interpretability: parameters of mechanistic models and simulations typically have clear physical interpretations, so if a model estimates parameters internally, it's making a clear statement about what it thinks is happening outside.

Even the most mature areas of deep learning are not left out; after the convolution kernel, a natural next step for image models is the [differentiable ray tracer](https://people.csail.mit.edu/tzumao/diffrt/). A 3D renderer contains a *lot* of structural knowledge about how scenes map to pixels, and this, too, can go in our melting pot. Say a model makes decisions in a simulated environment, rendered as pixels that the model uses as input. In principle we can now make the whole loop differentiable, letting us directly see the influence of the environment on the model's decisions and vice versa. This could greatly increase the power of realistic simulated environments for training models like self-driving cars.

If this is all so wonderful, why isn't everybody doing it already? Unfortunately, [limitations of current frameworks](https://julialang.org/blog/2017/12/ml&pl) make it difficult to build models of this complexity, and impossible to reuse the wealth of knowledge embedded in existing scientific code. The need to re-implement physics engines from scratch, in a constrained modelling language – usually with significant limitations – turns what should be a ten-line script into a multi-year research project. But advances in [language and compiler technology](https://julialang.org/blog/2018/12/ml-language-compiler), especially [automatic differentiation](https://arxiv.org/abs/1810.07951), are bringing us closer to the holy grail: "just differentiate my game engine, please."


## So, what is differentiable programming?

Differentiable programming is another way of looking at the ML community's breakthroughs in recent years. But it's also something new: the result of putting several long-established fields [into a particle collider](https://arxiv.org/pdf/1702.00748.pdf). Deep learning, statistics, programming and the sciences all have something to say about modelling the world around us, not to mention the language, compiler and automatic differentiation communities building the enabling technology.

To solve harder problems, deep learning needs to be made compatible with existing knowledge and techniques. This will both improve current models and enable it to be applied in areas where its current limitations – either interpretability or its computational and data requirements – make it infeasible alone.

Differentiable programming is not just the next buzzword in the ML hype cycle. Rather, it's the kind of plain, informative and frankly quite boring term that signifies a maturing field. The beginning of the end for incessant media speculation about the rise of the terminators, and the beginning of the beginning for a productive era with these techniques as part of the day-to-day programming toolkit, unremarkably solving important problems in science and elsewhere.

<div class="attrib">Thanks to Hannah Lepper and James Bradbury for feedback on this post.</div>
