---
title: Flux.jl-A simplified way to build custom ML models with ease
author: Aman Sharma
layout: blog
---

![](https://miro.medium.com/max/1254/1*D1HGaBXy_AXaCoSJBx6XuA.png)

Creating Machine Learning models with Julia can be a daunting task for new developers in this ecosystem due to lack of available resources. In this blog we will discuss how easily one can create amazing customized and high performant ML models using Julia's Flux.jl library.

**Why Julia?**
==============

Julia is a relatively new language released in 2012 which aims to be both high-level and fast. It is a fast dynamic typed language that just-in-time (JIT) compiles into native code using LLVM( set of compiler and toolchain technologies, which can be used to develop a frontend for a programming language ). It "runs like C but reads like Python", meaning that is blazing fast, easy to prototype and read/write code. This makes Julia the perfect fit for training ML models and even deep neural networks ranging from CNNs to LSTMs.

Flux: The Julia Machine Learning Library
========================================

Flux is a library for machine learning geared towards high-performance production pipelines. It comes “batteries-included” with many useful tools built in, but also lets you use the full power of the Julia language where you need it. This library helps you create highly performant ML models with very less lines of code. It also enables you to create amazing customized models for your personal use and works well with other Julia libraries from dataframes and images to differential equation solvers. Below is an “ Overview of the Flux Machine Learning Library”.

Creating the Linear Regression Model
====================================

So now let's come straight to the topic and create the ML model using Julia's Flux.jl library. The five major steps for building this Linear Regression model is as follows:

1.  Importing the dataset
2.  Splitting the dataset into train and test batches
3.  Creating the model
4.  Training the model
5.  Saving the model

I would recommend you to code along this Machine Learning Regression Model, as you will be able to see the live model evaluations and it's performance on the dataset we have chosen for this blog.

Importing the Dataset
=====================

To create this Linear Regression model we will be using the very popular “Boston Housing” dataset. This dataset is already present in the MLDatasets.jl library along with some other popular datasets in the field of Computer Vision and Natural Language Processing. For the complete documentation on this dataset visit : [https://juliaml.github.io/MLDatasets.jl/stable/datasets/BostonHousing/](https://juliaml.github.io/MLDatasets.jl/stable/datasets/BostonHousing/)

```julia
using Pkg

Pkg.add("Flux")

Pkg.add("MLDatasets")

using MLDatasets: BostonHousing

features = BostonHousing.features();

summary(features)
"13×506 Matrix{Float64}"

target = BostonHousing.targets();
```

Splitting the Dataset
=====================

Now we will be splitting the dataset into train and test examples. Considering the dataset has total 506 training examples along with 13 input features, we have decided to split the dataset into 70:30 ratio. The model will be trained on the training data and it's performance will be evaluated using the test examples.

```julia
x_train = features[:,1:355]

x_test = features[:,356:506]

y_train = target[:,1:355]

y_test = target[:,356:506]
```

Creating the Model
==================

Now it's time to create the linear regression model's infrastructure. Considering the model has 13 input features, it will be associated with 13 input weights along with a bias value. The Dense() layer helps us to create the above model's infrastructure along with randomly initializing the weights and bias values. The model.weight and model.bias syntax can help you to see these trainable parameters in your regression model.

```julia
using Flux

model = Dense(13,1)

model.weight

model.bias
```

Training the Model
==================

Now it's finally the time to train our regression model , which is made very easy by Flux.jl as it has prebuilt optimizers , loss functions and so on. First of all we will import the train!() function from flux along with the loss function “Root Mean Squared Error” which we will be using here. We will also be using the “gradient descent” optimizer here for minimizing our loss values and training our model parameters. Now we can pass the entire training data, loss function, optimizer and the model parameters as arguments to the train!() which will train our regression model. After the model has been trained, you will see "total loss value" on both the train and test sets to be low, implying the model has been accurately trained.

( Sidenote: We can further improve our model's accuracy by cleaning the dataset using data pre-processing techniques like EDA( Exploratory Data Analysis ) or even trying other ML algorithms. This is just a simple demonstration of a Linear Regression model using Flux.jl library , so that you are well versed with the basic concepts of this amazing library. )

```julia
using Flux: train!

opt = Descent()

loss(x, y) = Flux.Losses.mse(model(x), y)

loss(x_train,y_train)

data = [(x_train,y_train)]

parameters = Flux.params(model)

train!(loss, parameters, data, opt)

loss(x_train, y_train)

loss(x_test,y_test)
```

Saving the Model
================

After you have successfully trained your regression model, it's time to save your model infrastructure and its corresponding trainable parameters( the weights and bias values ). This can be easily done using the BSON library which will save your model using a single line of code, so that it can be ready for deployment.

```julia
using BSON: @save

@save "mymodel.bson" model
```

Python vs Julia
===============

Just to clear the myth that some of the developers have that training a model in Julia is much more lengthy and difficult as compared to python. Below is the the same exact model that I have trained on the same exact dataset using Python's scikit learn library.

```julia
import pandas as pd
import numpy as np
data = pd.read_csv("C:/Users/amans/Downloads/Boston.csv")
data.columns
data.head()
data.describe()
data.shape
data = data.drop(['Unnamed: 0'],axis=1)
X = data.drop(['medv'],axis=1)
Y = data['medv']
from sklearn.model_selection import train_test_split
X_train,X_test,Y_train,Y_test = train_test_split(X,Y,test_size=0.3,random_state=42)
from sklearn.linear_model import LinearRegression
housing = LinearRegression()
housing.fit(X_train,Y_train)
from sklearn import metrics
y_pred = housing.predict(X_test)
print('Mean Squared Error:', metrics.mean_squared_error(Y_test, y_pred))
import pickle
pickle_final=open("housing.pkl","wb")
pickle.dump(housing,pickle_final)
pickle_final.close()
```

Here is the complete code of the Simple Linear Regression model which we developed today using Julia's highly performant Flux.jl library which gives us fast and amazing results.

```julia
using Pkg
Pkg.add("Flux")
Pkg.add("MLDatasets")
using MLDatasets: BostonHousing
features = BostonHousing.features();
summary(features)
"13×506 Matrix{Float64}"
target = BostonHousing.targets();
using Flux
model = Dense(13,1)
model.weight
model.bias
using Flux: train!
opt = Descent()
x_train = features[:,1:355]
x_test = features[:,356:506]
y_train = target[:,1:355]
y_test = target[:,356:506]
loss(x, y) = Flux.Losses.mse(model(x), y)
loss(x_train,y_train)
data = [(x_train,y_train)]
parameters = Flux.params(model)
train!(loss, parameters, data, opt)
loss(x_train, y_train)
loss(x_test,y_test)
using BSON: @save
@save "mymodel.bson" model
```

As you can see, there is not much of a difference between the two programming languages especially thinking Julia is much faster than Python and is labelled "The Future of Machine Learning".

![](https://miro.medium.com/max/774/1*J0Z7k25ilWVJEYLbOOqFKQ.png)

Flux.jl and Julia as a whole is a maturing ecosystem with amazing new features being added to it daily. Both Julia and Flux.jl are open source, so a developer is free to add some new features to the library or make changes to an already existing one inorder to improve the library as a whole. Flux.jl not only helps us train these simple ML models but also deep and complex neural nets from applications ranging from Image classification to Natural Language Processing. Check out the official website of Flux.jl for more resources : [https://fluxml.ai/Flux.jl/stable/](https://fluxml.ai/Flux.jl/stable/) . If you are new to Julia programming language check out the official website : [https://julialang.org/](https://julialang.org/)

Conclusion
==========

Congratulations!, you have just created a Linear Regression Model using Julia's Flux.jl library. Hopefully this blog has helped you to understand the basics of Flux.jl library so that you can create your own personalized ML models from scratch.

--------------------------------