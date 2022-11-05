<!-- Header -->
@@jumbotron,jumbotron-fluid,no-pad
  @@container
    ~~~
    <img src="./assets/logo.png" style="max-width:100%;padding-bottom:20px"/>
    <h2>The <i>Elegant</i> Machine Learning Stack</h2>
    Flux is a 100% pure-Julia stack and provides lightweight abstractions on top of Julia's native GPU and AD support. It makes the easy things easy while remaining fully hackable.
    ~~~

    @@buttons
      ~~~
      <a class="btn btn-primary btn-lg" href="https://fluxml.ai/Flux.jl/stable/#Installation-1" role="button"><i class="fas fa-download"></i>Try It Out</a>
      <a class="btn btn-primary btn-lg" href="https://github.com/FluxML/Flux.jl" role="button" target="_blank"><i class="fas fa-star"></i>GitHub</a>
      <a class="btn btn-primary btn-lg" href="https://twitter.com/FluxML" role="button" target="_blank"><i class="fab fa-twitter"></i>Follow on Twitter</a>
      ~~~
    @@
  @@
@@

@@features
  @@container
    @@row
      @@col-md-12,feature-title
        ~~~
        <h2>Features</h2>
        ~~~
        Flux has features that sets it apart among ML systems.
      @@
    @@

    @@row
      @@col-md,feature
        ~~~
        <h5>Compiled Eager Code</h5>
        ~~~
        Flux provides a single, intuitive way to define models, just like mathematical notation. Julia transparently [compiles your code](https://julialang.org/blog/2018/12/ml-language-compiler), optimising and fusing kernels for the GPU, for the best performance.
      @@
      @@col-md,feature
        ~~~
        <h5>Differentiable Programming</h5>
        ~~~
        Existing Julia libraries are differentiable and can be incorporated directly into Flux models. Cutting edge models such as [Neural ODEs](https://julialang.org/blog/2019/01/fluxdiffeq) are first class, and [Zygote](https://github.com/FluxML/Zygote.jl) enables overhead-free gradients.
      @@
      @@col-md,feature
        ~~~
        <h5>First-class GPU support</h5>
        ~~~
        GPU kernels can be written directly in Julia via [CUDA.jl](https://github.com/JuliaGPU/CUDA.jl). Flux is uniquely hackable and any part can be tweaked, from GPU code to custom gradients and layers.
      @@
    @@
  @@
@@

@@features
  @@container
    @@row
      @@col-md-12,feature-title
        ~~~
        <h2>
          Ecosystem
        </h2>
        ~~~
        Flux has a diverse ecosystem that includes models available for reuse and other useful packages.
      @@
      @@col-md-12,feature-title
      ~~~
      <a class="btn btn-primary btn-lg" href="https://fluxml.ai/Flux.jl/dev/ecosystem/" role="button" style="float: right;">See all <i class="fas fa-arrow-circle-right"></i> </a>
      ~~~
      @@
    @@

    @@row
      @@col-md,feature
        ~~~
        <h5>Probabilistic Programming</h5>
        ~~~
        The [Turing.jl](https://github.com/TuringLang/Turing.jl) and [Stheno.jl](https://github.com/willtebbutt/Stheno.jl) libraries enable probabilistic programming, Bayesian inference and Gaussian processes on top of Flux.
      @@
      @@col-md,feature
        ~~~
        <h5>Graph Neural Networks</h5>
        ~~~
        [GraphNeuralNetworks.jl](https://github.com/CarloLucibello/GraphNeuralNetworks.jl) is a graph neural network library for Flux and supports CUDA GPU acceleration.
      @@
      @@col-md,feature
        ~~~
        <h5>Computer Vision</h5>
        ~~~
        [Metalhead.jl](https://github.com/FluxML/Metalhead.jl) includes many state-of-the-art computer vision models with pre-trained weights.
      @@
    @@

    @@row
      @@col-md,feature
        ~~~
        <h5>SciML</h5>
        ~~~
        The [SciML](https://sciml.ai/) ecosystem uses the FluxML stack to mix neural nets with differential equations, to get the best of black box and mechanistic modelling.
      @@
      @@col-md,feature
        ~~~
        <h5>Natural Language Processing</h5>
        ~~~
        [Transformers.jl](https://github.com/chengchingwen/Transformers.jl) provides components for transformer architectures for language modeling, as well as providing several trained models out of the box.
      @@
    @@
  @@
@@

@@features
  @@container
    @@row
      @@col-md-12,feature-title
        ~~~
        <h2>Community</h2>
        ~~~
        Get in touch with the Flux community.
      @@
    @@

    @@row
      @@col-md,feature
        ~~~
        <h5>Community team</h5>
        ~~~
        Flux is maintained by community team (see our [governance model](./governance)).
        Join us or talk to us on Zulip! 👉
      @@
      @@col-md,feature
        ~~~
        <h5>Slack</h5>
        ~~~
        [Official Julia Slack](https://julialang.org/slack/) for casual conversation. See `#flux-bridged` and `#machine-learning`.
      @@ 
      @@col-md,feature
        ~~~
        <h5>Zulip</h5>
        ~~~
        [Zulip server](https://julialang.zulipchat.com) for the Julia programming language community. See `#ml-contributors` and `#machine-learning`.
      @@
    @@

    @@row
      @@col-md,feature
        ~~~
        <h5>Discourse forum</h5>
        ~~~
        [Machine Learning in Julia](https://discourse.julialang.org/c/domain/ML/24) community.
      @@
      @@col-md,feature
        ~~~
        <h5>Stack Overflow</h5>
        ~~~
        [Ask questions](https://stackoverflow.com/questions/tagged/flux.jl) about Flux.jl.
      @@
      @@col-md,feature
        ~~~
        <h5>Contribute!</h5>
        ~~~
        Help us by [contributing code](https://github.com/FluxML/Flux.jl/blob/master/CONTRIBUTING.md)!
      @@
    @@
  @@
@@

@@features
  @@container
    @@row
      @@col-md-12,feature-title
        ~~~
        <h2>Why Flux?</h2>
        ~~~
      @@
    @@

    @@row
      ~~~
      <iframe width="100%" height="400" src="https://www.youtube-nocookie.com/embed/g_qstKogPYw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      ~~~
    @@
  @@
@@

@@friends
  @@container
    @@row
      @@col-md-12,feature-title
        ~~~
        <h2>Researchers, users, and developers of Flux</h2>
        ~~~
      @@
    @@

    @@row
      @@col-md
        ~~~
        <a href="https://julia.mit.edu"><img src="./assets/friends/mit-logo.png"></a>
        ~~~
      @@
      @@col-md
        ~~~
        <a href="https://www.ucl.ac.uk"><img src="./assets/friends/ucl-logo.png"></a>
        ~~~
      @@
      @@col-md
        ~~~
        <a href="https://www.utoronto.ca"><img src="./assets/friends/uoft_logo.png"></a>
        ~~~
      @@
    @@

    @@row
      @@col-md
        ~~~
        <a href="https://juliacomputing.com"><img src="./assets/friends/juliac-logo.png"></a>
        ~~~
      @@
      @@col-md
        ~~~
        <a href="https://www.turing.ac.uk/research/research-projects/machine-learning-julia"><img src="./assets/friends/alan-turing.jpg"></a>
        ~~~
      @@
      @@col-md
        ~~~
        <a href="https://www.ed.ac.uk"><img src="./assets/friends/edinburgh.png"></a>
        ~~~
      @@
    @@

    @@row
      @@col-md
        ~~~
        <a href="https://www.relational.ai"><img src="./assets/friends/rai-logo.png"></a>
        ~~~
      @@
      @@col-md
        ~~~
        <a href="https://www.washington.edu"><img src="./assets/friends/washington.jpg"></a>
        ~~~
      @@
      @@col-md
        ~~~
        <a href="https://www.cam.ac.uk"><img src="./assets/friends/cambridge.jpg"></a>
        ~~~
      @@
    @@

    @@row
      @@col-md
        ~~~
        <a href="https://www.cmu.edu"><img src="./assets/friends/cmu-logo.png"></a>
        ~~~
      @@
      @@col-md
        ~~~
        <a href="https://www.invenia.ca"><img src="./assets/friends/invenia-logo.png"></a>
        ~~~
      @@
      @@col-md
        ~~~
        <a href="https://beacon.bio"><img src="./assets/friends/beacon_biosignals.jpg"></a>
        ~~~
      @@
      @@col-md
        ~~~
        <a href="https://www.amd.com"><img src="./assets/friends/amd-logo.png"></a>
        ~~~
      @@
    @@
  @@
@@
