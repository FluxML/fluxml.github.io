+++
title = "What's new in Metalhead 0.8.0"
published = "7 June 2023"
author = "Abhirath Anand (@theabhirath)"
+++

Metalhead v0.8.0 is one of the largest releases of the library in recent times. Here's a list of all the improvements that have been accumulated in the library over the last few months:

## More models

Metalhead v0.8.0 ships with more exported models than any other previous Metalhead release. In particular, support for the following models was added:

- [Inceptionv4, InceptionResNetv2 and Xception](https://github.com/FluxML/Metalhead.jl/pull/170)
- [WideResNet, SE-ResNet and SE-ResNeXt](https://github.com/FluxML/Metalhead.jl/pull/174)
- [Res2Net and Res2NeXt](https://github.com/FluxML/Metalhead.jl/pull/195)
- [EfficientNetv2 and MNASNet](https://github.com/FluxML/Metalhead.jl/pull/198)
- [The ViT model introduced in v0.7 is now more robust](https://github.com/FluxML/Metalhead.jl/pull/230) and comes with an option for [loading pre-trained weights on ImageNet](https://github.com/FluxML/Metalhead.jl/pull/235)

In Metalhead v0.7, support was added for pre-trained models for VGG and ResNets. v0.8.0 takes this further by adding support for Wide ResNets (an architecture previously not supported by Metalhead), certain configurations of ResNeXt, and SqueezeNet. This makes it easier for users to get started with transfer learning tasks. We also now export the [`backbone` and `classifier`](https://fluxml.ai/Metalhead.jl/v0.8/api/utilities) functions, which return the feature extractor and classifier head portions of the model respectively. This should make it easier for users to hit the ground running.

Metalhead is always looking for contributors to help with adding pre-trained weights for the models. To know how you can help with this effort, please check out the contributor’s guide in the documentation. We will be happy to help you work through any issues you may encounter!

## A `Layers` module to make it easier to build custom models

Previously, Metalhead v0.7 introduced the `Layers` module but it was not publicly documented as the internals were still being polished. With Metalhead v0.8.0, it has reached a point of stability. The [`Layers`](https://fluxml.ai/Metalhead.jl/v0.8/api/layers) module exposes functionality that allows users to build custom neural network models very easily. Some notable improvements are:

1. Stochastic Depth and DropBlock layers were added, and are now fully featured ([https://github.com/FluxML/Metalhead.jl/pull/174](https://github.com/FluxML/Metalhead.jl/pull/174), [https://github.com/FluxML/Metalhead.jl/pull/200](https://github.com/FluxML/Metalhead.jl/pull/200)). In particular, Stochastic Depth adds support for batch mode. Note that v0.7 used the term `DropPath` – however, this term was changed to `StochasticDepth` to remove any ambiguity over what the layer was used for.
2. The `create_classifier` function now adds a distinction between no Dropout and Dropout of rate 0; moreover, it also now supports an expanded classifier with an additional `Dense` layer in between ([https://github.com/FluxML/Metalhead.jl/pull/198](https://github.com/FluxML/Metalhead.jl/pull/198)).
3. A new pooling layer, `AdaptiveMeanMaxPool` was added ([https://github.com/FluxML/Metalhead.jl/pull/174](https://github.com/FluxML/Metalhead.jl/pull/174)).
4. Squeeze-and-excitation layers were added, including an efficient squeeze-and-excite layer for future usage ([https://github.com/FluxML/Metalhead.jl/pull/174](https://github.com/FluxML/Metalhead.jl/pull/174)).
5. `conv_bn` has now become `conv_norm`, with support for changing the normalisation layer ([https://github.com/FluxML/Metalhead.jl/pull/174](https://github.com/FluxML/Metalhead.jl/pull/174)). It also has changed default behaviour, with the bias for the convolution layer being set to `false` if the normalisation layers is enabled – this reflects the most common usage in most neural network models and so makes the user's job a little easier. There is also a `basic_conv_bn` layer that derives from the `conv_norm` layer which replicates the convolution-batch norm combination used in TensorFlow by default. In particular, the momentum value for BatchNorm is set to 3e-3.
6. Inverted residual bottleneck blocks have been added, most notably `mbconv` and `fused_mbconv`, two commonly used variants in models like MobileNets and EfficientNets. ([https://github.com/FluxML/Metalhead.jl/pull/198](https://github.com/FluxML/Metalhead.jl/pull/198))

> While the `Layers` API has stabilised reasonably, we expect some breaking changes over the next few releases as we iron out some issues and add features. While any breaking changes will be handled with the appropriate deprecations, the `Layers` API should be treated as experimental.

## A more hackable interface

One of the biggest changes to Metalhead has been to its API structure. Prior to v0.8, model functions were classified into one of two categories – functions for users requiring more configuration and functions catering to users requiring less configuration and who preferred a convenient mechanism for loading pre-trained weights. This was a convenient interface but had fallen behind due to recent advancements in research.

v0.8 takes this to the next level by separating out the model interfaces into three distinct interfaces. For the purpose of this article, we’ll call these the “high-level”, “mid-level” and “low-level” interfaces – and there have been improvements to all three of these.

### Uniformity at the higher level interface

The “high-level” interface caters to users who want a quick start and usually want to work with pre-trained models, either as feature extractors or to fine tune for transfer learning tasks. The notable improvement here has been that all of these functions now expose three keyword arguments mandatorily – `inchannels`, `nclasses`, and `pretrain`. The other big change is that there are no more default model configurations, doing away with ambiguous notation like `ResNet()`, which meant ResNet-50 in Metalhead v0.7. This work landed in [https://github.com/FluxML/Metalhead.jl/pull/190](https://github.com/FluxML/Metalhead.jl/pull/190).

### Modern training techniques at the mid level interface

The “mid-level” interface allows users looking for more advanced options to start working with models that offer a little more out of the box, without compromising on user ease. In particular, the ResNet family of models has undergone a *huge* revamp, with support for many new modifications added in [https://github.com/FluxML/Metalhead.jl/pull/174](https://github.com/FluxML/Metalhead.jl/pull/174). These modifications include a large number of recent advancements from papers such as [Bag of Tricks](https://arxiv.org/pdf/1812.01187):

1. Stochastic Depth and DropBlock are now supported by the underlying `resnet` function.
2. The `resnet` function also now takes an attention-layer argument, which allows us to design SE-ResNets and SE-ResNeXts. The `Layers` module also exports an `efficient_squeeze_excite` function for any users who want a computationally efficient attention function.
3. The stem of the `resnet` can now be modified to be optionally deeper to match the InceptionResNet-v2 stem. An experimental option from the `timm` library in Python to make the deeper stem have a larger width in the second convolution is also supported since this shows improvements over the regular deeper stem in certain cases.
4. Three types of downsampling layers are now supported. In addition to the identity and convolutional projections for skip connection downsampling, a max pooling+convolution based downsampling projection is also supported now.
5. The model supports a `revnorm` option, which places the normalisation layers before the convolutional layers.

The documentation for ResNet in Metalhead goes over these options in detail, and there is also a guide on how to use some of these. Head there to check out even more cool features!

### Reducing code duplication and making the low-level interface more powerful

The “low-level” interface allows engineers and researchers to iterate on model design quickly without thinking too much about the building blocks. In particular, multiple dispatch means that functions that need to be re-written again and again in Python libraries can simply be unified under one function in Julia.

One of the major changes Metalhead v0.8 introduces is the concept of *builders.* These are functions that return closures over the **stage and block indices**. These two numbers together index into a block completely (the stage index represents which stage of the large model is being referred to, and the block index finds the specific block inside the stage). Builders have allowed writing functions that construct blocks purely based on the stage and block indices, abstracting away construction of the layers as well as details like calculations for strides, output feature maps or probabilities for stochastic depth/DropBlock. These builders have been used to rewrite the underlying implementations of the three largest CNN families supported by Metalhead and that are used commonly – ResNets, MobileNets and EfficientNets.

The biggest beneficiary of this has been the MobileNet and EfficientNet model families, which are constructed from a [single function](https://github.com/FluxML/Metalhead.jl/pull/200) using nothing but a uniform configuration dictionary format. Yep, you read that right. That’s six different models expressed using a single underlying function which is just about sixty lines of code. As a user, all you need to do is change the configuration dictionary and watch the magic happen. This means that conceptualising new models has become as simple as visualising the model structure as a dictionary of configurations (in short, just the novelties), and then watching the function take your configurations and produce the model.

There were improvements for the ResNet family of models as well: the stride and feature map calculations through the ResNet block builders are now callbacks, and can thus be easily modified by users if they wish to define custom stride/feature map calculations. To know more about builders and how they work for the different model families, check out the documentation! We are still working on adding documentation for all of the features, so if you find something that's unexplained, open an issue and we will be happy to assist you as well as to improve the documentation!

## Model correctness and other bugs

Apart from this, there have also been some corrections in model implementations. In particular,

1. The Inception family of models now mimics default TensorFlow behaviour, with momentum for the BatchNorm set to 0.003 and `bias` disabled in the convolution layers. This should help gradient times by a fair bit. ([https://github.com/FluxML/Metalhead.jl/pull/198](https://github.com/FluxML/Metalhead.jl/pull/198))
2. The EfficientNet models (b0 through b7) had changes pushed to them that fix their model structure and match the parameter count with PyTorch. They also now have Stochastic Depth with probability 0.2 built in by default as described in the paper. ([https://github.com/FluxML/Metalhead.jl/pull/198](https://github.com/FluxML/Metalhead.jl/pull/198))
3. MobileNetv2 and MobileNetv3 use `pad=1` in their first convolutional layer now, matching the descriptions of the models in the paper. ([https://github.com/FluxML/Metalhead.jl/pull/179](https://github.com/FluxML/Metalhead.jl/pull/179))
4. `MobileNetv1` now removes the extra `Dense` layer in its classifier head, matching the implementation described in the paper. ([https://github.com/FluxML/Metalhead.jl/pull/189](https://github.com/FluxML/Metalhead.jl/pull/189))

## Future plans

We plan to keep improving and iterating on the design of the models in Metalhead throughout the 0.8 series of patch releases. Apart from this, v0.9 should bring with it substantially improved support for vision transformer-based architectures, which have been at the forefront of computer vision research over the last two years. Features like convolution and batch normalisation fusion at inference time are also in the works to make Metalhead keep pace with the advancements in computer vision research over the last few years. One of the major inspirations for this overhaul has been the success of the [`timm`](https://github.com/rwightman/pytorch-image-models) library in Python, which has allowed researchers and engineers to start experimentation very easily with PyTorch. We hope to move towards something similar for Flux.jl in the long term for Metalhead. Thanks for reading this, and don't forget to check out Metalhead!