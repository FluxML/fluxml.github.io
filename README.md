<p align="center">
<img width="400px" src="https://raw.githubusercontent.com/FluxML/fluxml.github.io/master/logo.png"/>
</p>


This repository contains the source files for the [FluxML website, fluxml.ai](https://fluxml.ai). FluxML is a machine learning framework for [Julia](https://julialang.org).

## Contributing

Want to contribute to the FluxML website? Check out the contributing guide: https://github.com/FluxML/fluxml.github.io/blob/main/CONTRIBUTING.md

## Running Locally

The website is built with [Franklin.jl](https://franklinjl.org).

First, install Julia then setup your environment.
```
julia --project=.

julia> ]
(fluxml.github.io) pkg> instantiate
```
This will install the necessary packages. It only needs to be done once.

Now, start Julia and serve the page:
```
julia --project=.

julia> using Franklin

julia> serve()
```
This will start a live server that previews the website. You can make edits to the markdown files and see the website update as you save. Please refer to the [Franklin.jl documentation](https://franklinjl.org) for more information on developing a website with Franklin.jl.

### Project structure

Most pages of the website are written as markdown files in the root directory. The `blogposts` directory contains blog posts, and the `tutorialposts` directory contains tutorials.
