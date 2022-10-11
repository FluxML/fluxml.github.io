+++
title="Ecosystem"
+++

{{redirect /ecosystem.html}} <!-- legacy links -->
{{redirect /models/}} <!-- legacy links -->
<!-- Get rid of the old Models page since it is redundant -->

~~~
<style>
  .container img {
  max-width: 100%;
  }
  .container h1, .container h2, .container h3, .container p, .container blockquote, .container .highlighter-rouge, .container ul :not(.navbar-nav) {
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  }
  .container p {
  text-align:justify;
  }
  .container p.p-image {
  max-width: 100%;
  text-align: center;
  }
</style>
~~~

<!-- START OF PAGE CONTAINER -->
~~~
<div class="content">
  <div class="container">
~~~

<!-- INTRO + TOC -->
# Ecosystem

This section lists tools that complement Flux in typical machine learning and deep learning workflows.
To add your project please [send a PR](https://github.com/FluxML/fluxml.github.io/edit/master/ecosystem.md).
See also academic work [citing Flux](https://scholar.google.com/scholar?oi=bibs&amp;hl=en&amp;cites=9731162218836700005), [or Zygote](https://scholar.google.com/scholar?oi=bibs&amp;hl=en&amp;cites=11943854577624257878).

~~~
<a id="top"></a>
<h2 id="table-of-contents">Table of contents</h2>

<ul>
  <li><a href="#table-of-contents">Table of contents</a></li>
  <li><a href="#advanced-models">Advanced models</a></li>
  <li><a href="#computer-vision">Computer Vision</a></li>
  <li><a href="#datasets">Datasets</a></li>
  <li><a href="#differentiable-programming">Differentiable programming</a></li>
  <li><a href="#generative-models">Generative models</a></li>
  <li><a href="#graph-learning">Graph learning</a></li>
  <li><a href="#miscellaneous">Miscellaneous</a></li>
  <li><a href="#natural-language-processing">Natural language processing</a></li>
  <li><a href="#pipeline-extensions">Pipeline extensions</a></li>
  <li><a href="#plumbing">Plumbing</a></li>
  <li><a href="#probabilistic-programming">Probabilistic programming</a></li>
  <li><a href="#reinforcement-learning">Reinforcement learning</a></li>
</ul>
~~~

<!-- Advanced models -->
~~~
<h2 id="advanced-models">Advanced models</h2>

<ul>
  <li><a href="https://github.com/sdobber/FluxArchitectures">FluxArchitectures</a> is a collection of slightly more advanced network architectures.</li>
</ul>

~~~

\totop

<!-- CV -->
~~~
<h2 id="computer-vision">Computer Vision</h2>

<ul>
  <li><a href="https://github.com/r3tex/ObjectDetector.jl">ObjectDetector.jl</a> provides ready-to-go image analysis via YOLO.</li>
  <li><a href="https://github.com/FluxML/Metalhead.jl">Metalhead.jl</a> includes many state-of-the-art computer vision models which can easily be used for transfer learning.</li>
  <li><a href="https://github.com/DhairyaLGandhi/UNet.jl">UNet.jl</a> is a generic UNet implementation.</li>
</ul>
~~~

\totop

<!-- Datasets -->
~~~
<h2 id="datasets">Datasets</h2>

<ul>
<li><a href="https://github.com/JuliaML/MLDatasets.jl">MLDatasets.jl</a>  focuses on downloading, unpacking, and accessing benchmark datasets.</li>
</ul>
~~~

\totop

<!-- DiffProg -->
~~~
<h2 id="differentiable-programming">Differentiable programming</h2>

<ul>
<li>The <a href="https://sciml.ai/">SciML</a> ecosystem uses Flux and Zygote to mix neural nets with differential equations, to get the best of black box and mechanistic modelling.</li>
<li><a href="https://github.com/SciML/DiffEqFlux.jl">DiffEqFlux</a> provides tools for creating Neural Differential Equations.</li>
<li><a href="https://github.com/nirmal-suthar/Flux3D.jl">Flux3D</a> shows off machine learning on 3D data.</li>
<li><a href="https://github.com/avik-pal/RayTracer.jl">RayTracer.jl</a> combines ML with computer vision via a differentiable renderer.</li>
<li><a href="https://github.com/tejank10/Duckietown.jl">Duckietown.jl</a> Differentiable Duckietown simulator.</li>
<li>The <a href="https://github.com/QuantumBFS/Yao.jl">Yao</a> project uses Flux and Zygote for Quantum Differentiable Programming.</li>
<li><a href="https://github.com/Chemellia/AtomicGraphNets.jl">AtomicGraphNets.jl</a> enables learning graph based models on atomic systems used in chemistry</li>
<li><a href="https://github.com/SomTambe/DiffImages.jl">DiffImages.jl</a> differentiable computer vision modeling in Julia with the Images.jl ecosystem</li>
</ul>
~~~

\totop

<!-- Gen -->
~~~
<h2 id="generative-models">Generative models</h2>

<ul>
<li><a href="https://github.com/jaypmorgan/Adversarial.jl">Adversarial</a> attacks for Neural Networks written with FluxML.</li>
</ul>
~~~

\totop

<!-- GRAPH -->
~~~
<h2 id="graph-learning">Graph learning</h2>

<ul>
<li><a href="https://github.com/yuehhua/GeometricFlux.jl">GeometricFlux</a> makes it easy to build fast neural networks over graphs.</li>
<li><a href="https://github.com/foldfelis/NeuralOperators.jl">NeuralOperators</a> enables training infinite dimensional PDEs by learning a continuous function instead of using the finite element method.</li>
<li><a href="https://github.com/corail-research/SeaPearl.jl">SeaPearl.jl</a> is a Constraint Programming solver that uses Reinforcement Learning based on graphs as input.</li>
</ul>
~~~

\totop

<!-- MISC -->
~~~
<h2 id="miscellaneous">Miscellaneous</h2>

<p>*<a href="https://github.com/rizalzaf/AdversarialPrediction.jl">AdversarialPrediction.jl</a> provides a way to easily optimize generic performance metrics in supervised learning settings using the <a href="https://arxiv.org/abs/1812.07526">Adversarial Prediction</a> framework.</p>
<ul>
<li><a href="https://github.com/pevnak/Mill.jl">Mill</a> helps to prototype flexible multi-instance learning models.</li>
<li><a href="https://github.com/JuliaML/MLMetrics.jl">MLMetrics.jl</a> is a utility for scoring models in data science and machine learning.</li>
<li><a href="https://github.com/JuliaML/MLPlots.jl">MLPlots.jl</a> contains common plotting recipes for statistics and machine learning.</li>
<li><a href="https://github.com/FluxML/Torch.jl">Torch.jl</a> exposes torch in Julia.</li>
<li><a href="https://github.com/JuliaML/ValueHistories.jl">ValueHistories.jl</a> is a utility for efficient tracking of optimization histories, training curves or other information of arbitrary types and at arbitrarily spaced sampling times</li>
</ul>
~~~

\totop

<!-- NLP -->
~~~
<h2 id="natural-language-processing">Natural language processing</h2>

<ul>
<li><a href="https://github.com/chengchingwen/Transformers.jl">Transformers.jl</a> provides components for Transformer models for NLP, as well as providing several trained models out of the box.</li>
<li><a href="https://github.com/JuliaText/TextAnalysis.jl">TextAnalysis.jl</a> provides several NLP algorithms that use Flux models under the hood.</li>
</ul>
~~~

\totop

~~~
<h2 id="pipeline-extensions">Pipeline extensions</h2>

<ul>
<li><a href="https://github.com/lorenzoh/DLPipelines.jl">DLPipelines.jl</a> is an interface for defining deep learning data pipelines.</li>
</ul>
~~~

\totop

~~~
<h2 id="plumbing">Plumbing</h2>

<p>Tools to put data into the right order for creating a model.</p>

<ul>
<li><a href="https://github.com/Evizero/Augmentor.jl">Augmentor.jl</a> is a real-time library augmentation library for increasing the number of training images.</li>
<li><a href="https://github.com/lorenzoh/DataAugmentation.jl">DataAugmentation.jl</a> aims to make it easy to build stochastic label-preserving augmentation pipelines for your datasets.</li>
<li><a href="https://github.com/JuliaML/MLDataUtils.jl">MLDataUtils.jl</a> is a utility for generating, loading, partitioning, and processing Machine Learning datasets.</li>
<li><a href="https://github.com/JuliaML/MLLabelUtils.jl">MLLabelUtils.j</a> is a utility for working with classification targets. It provides the necessary functionality for interpreting class-predictions, as well as converting classification targets from one encoding to another.</li>
</ul>
~~~

\totop

~~~
<h2 id="probabilistic-programming">Probabilistic programming</h2>

<ul>
<li><a href="https://github.com/TuringLang/Turing.jl">Turing.jl</a> extends Flux’s differentiable programming capabilities to probabilistic programming.</li>
<li><a href="https://github.com/zenna/Omega.jl">Omega</a> is a research project aimed at causal, higher-order probabilistic programming.</li>
<li><a href="https://github.com/willtebbutt/Stheno.jl">Stheno</a> provides flexible Gaussian processes.</li>
</ul>
~~~

\totop

~~~
<h2 id="reinforcement-learning">Reinforcement learning</h2>

<ul>
<li><a href="https://github.com/jonathan-laurent/AlphaZero.jl">AlphaZero.jl</a> provides a generic, simple and fast implementation of Deepmind’s AlphaZero algorithm.</li>
<li><a href="https://juliareinforcementlearning.org/">ReinforcementLearning.jl</a> offers a collection of tools for doing reinforcement learning research in Julia.</li>
</ul>

~~~

\totop


<!-- END OF PAGE CONTAINER -->
~~~
  </div>
</div>
~~~

~~~
<script>
document.querySelectorAll('.container p').forEach(p => {
  if ((p.children[0] || {}).tagName == "IMG")
    p.classList.add('p-image');
});
</script>

<script type="text/javascript" async
src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
~~~
