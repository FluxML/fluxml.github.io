---
title: Adding Time Series Support to FastAI.jl
author: Saksham
layout: blog
---

[FastAI.jl](https://github.com/FluxML/FastAI.jl) is a Julia library inspired by [fastai](https://github.com/fastai/fastai), and its goal is to create state-of-the-art deep learning models easily. FastAI.jl simplifies training fast and accurate neural nets using modern best practices.

Models for time series data constitute an integral part of any machine learning stack. This blog post will demonstrate how to start working with time-series data with FastAI.jl and the [FastTimeSeries](https://github.com/FluxML/FastAI.jl/tree/master/FastTimeSeries) submodule. The FastTimeSeries submodule has been inspired by [tsai](https://timeseriesai.github.io/tsai/), a package built on top of fastai for time series tasks. The work presented here was done as part of [GSoC'22](https://summerofcode.withgoogle.com/programs/2022/projects/Q9GVFW33) under the mentorship of Brian Chen, Kyle Daruwalla, and Lorenz Ohly.


## Loading the data in a container

To start off, we'll load the [ECG5000](http://timeseriesclassification.com/description.php?Dataset=ECG5000) dataset.

```julia
julia> using FastAI, FastTimeSeries, Flux
julia> data, blocks = load(datarecipes()["ecg5000"]);
```

Our easy to use interface allows to load an input time series along with it's label at any index using `getobs(data, index)`. It also allows us to check the total number of observations using `numobs(data)`.

```julia
julia> input, class = sample = getobs(data, 25)
(Float32[-0.28834122 -2.2725453 … 1.722784 1.2959242], "1")
julia> numobs(data)
5000
```

## Tasks

The library supports `TSClassificationSingle` and `TSRegression` tasks--used for single label time-series classification and single label time-series regression, respectively. We will pass our `data` and `blocks` from the previous step into the task:

```julia
julia> task = TSClassificationSingle(blocks, data);
```

## Data Preprocessing

Although `data` can already be passed to `DataLoader` for loading during training, we would often like to perform transformations on it. We can encode a sample input using `encodesample(task, Phase(), sample)` where `Phase` is a [FastAI.jl Context](https://fluxml.ai/FastAI.jl/dev/references/FastAI.Context).

```julia
julia> input, class = sample = getobs(data, 25)
(Float32[-0.28834122 -2.2725453 … 1.722784 1.2959242], "1")
julia> encodesample(task, Training(), (input, class))
(Float32[-0.28937635 -2.2807038 … 1.7289687 1.3005764], Bool[1, 0, 0, 0, 0])
```

## Models

The library contains implementation of the following models.

- Basic stacked RNNs.  
  Stacked RNN network. Feeds the data through a chain of RNN layers, where the hidden state
  of the previous layer gets fed to the next one. The Model has the following arguments.
  - `c_in` : The number of input channels.
  - `c_out` : The number of output classes.
  - `hiddensize` : The number of "hidden channels" to use.
  - `layers` : The number of RNN layers to use in the stacked network. 
  
```julia
julia> backbone = FastTimeSeries.Models.StackedLSTM(1, 16, 10, 2);
julia> model = FastAI.taskmodel(task, backbone);
```

- [InceptionTime](https://arxiv.org/abs/1909.04939) 
  An implementation of the InceptionTime Model. The Model has the following arguments. 
  - `c_in` : The number of input channels.
  - `c_out` : The number of output classes.
  - `nf` : The number of "hidden channels" to use.

```julia
julia> model = FastTimeSeries.Models.InceptionTime(1, 5);
```

## Training

We create a pair of training and validation data loaders using `taskdataloaders` . They take care of batching and loading the data in parallel in the background. With the addition of an optimizer and a loss function, we can create a `Learner` and start training.

```julia
julia> traindl, validdl = taskdataloaders(data, task, 16);
julia> learner = Learner(model, tasklossfn(task); data=(traindl, validdl), optimizer=ADAM(), callbacks = [ToGPU(), Metrics(accuracy)]);
julia> fitonecycle!(learner, 10, 0.033);
```

We can view the loss and accuracy on the training and validation data after the training is compelete.

<p float="middle">
  <img src="/assets/2022-09-08-FastAI-time-series/train_result.png" height="250">
</p>

## Conclusion

We saw how we could work on time-series data using FastAI.jl. The library now supports the following features. 

- Load time series classification datasets and regression datasets from [UCR Classification](http://timeseriesclassification.com/index.php) and [Monash Regression](http://tseregression.org/) respectively.
- Perform data transformations on the loaded data.
- Perform classification and regression tasks using InceptionTime or stacked RNNs.

## Future Work

Future work would involve adding tools to the library to improve the experience of working with time series. These would include tools for visualizations and analysis. 
FastTimeSeries would also be expanded to work on more complex tasks such as multi-class classification and single and multi-step forecasting. We would also implement more complex models such as [Transformers](https://arxiv.org/abs/2010.02803).