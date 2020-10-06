<p align="center">
<img width="400px" src="https://raw.githubusercontent.com/FluxML/fluxml.github.io/master/logo.png"/>
</p>


This repository contains the source files of [Flux documentation](https://fluxml.github.io/Flux.jl/). 

Flux is an elegant approach to machine learning. It's a 100% pure-Julia stack, and provides lightweight abstractions on top of Julia's native GPU and AD support. Flux makes the easy things easy while remaining fully hackable.

## Building the Site Locally

Before building this site on your local machine, you need to install the following:

* [Jekyll](https://jekyllrb.com/docs/installation/)
* [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
* [Bundler](https://bundler.io/)

To build the Flux site locally:

1. Clone this repo.
1. Navigate to your local copy.
1. Run the site locally:

   ```
   $bundle exec jekyll serve
   ```

>Note: To preview the Flux site, go to `http://localhost:4000`.