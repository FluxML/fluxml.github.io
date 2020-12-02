---
title: LSTM for character-level language detection
author: Adarsh Kumar, Mike J Innes, Ayush Kaushal
layout: blog
tag: Text
---

This model uses an LSTM for character-level language detection. Given a sentence of text, each character is fed into the model and the final output determines which of five languages the sentence was written in.

Download a Wikipedia dataset.

```julia

using Cascadia, Gumbo, HTTP

pages = Dict(
  :en => ["Wikipedia", "Osama_bin_Laden_(elephant)", "List_of_lists_of_lists", "Josephine_Butler", "Canadian_football", "Judaism"],
  :it => ["Wikipedia", "Ludovico_Einaudi", "Filosofia_della_scienza", "Pizza", "Effie_Gray", "Galeazzo_Maria_Sforza", "Ebraismo"],
  :fr => ["Wikipedia", "Philosophie_des_sciences", "Seconde_Guerre_mondiale", "Eric_Hakonsson"],
  :es => ["Wikipedia", "Chorizo", "Historia_de_Barcelona", "Espania", "Las_Vegas_Strip", "Judaismo"],
  :da => ["Wikipedia", "H.C._Andersen", "L.A._Ring", "Jiangxi", "NATO", "Thomas_Edison", "Bangladesh"])

rawpage(url) = parsehtml(String(HTTP.get(url).body)).root

content(url) = join((collect(nodeText(m) for m in eachmatch(sel".mw-parser-output > p", rawpage(url)))), "\n")

cd(@__DIR__)
mkpath("corpus")

for (lang, ps) in pages
    open("corpus/$lang.txt", "w") do io
        for p in ps
            write(io, content("https://$lang.wikipedia.org/wiki/$p"))
        end
    end
end
```

<br>

Load the necessary packages.

```julia
 
using Flux
using Flux: onehot, onehotbatch, logitcrossentropy, reset!, throttle
using Statistics: mean
using Random
using Unicode
using Parameters: @with_kw
```

<br>

Define Hyperparameter arguments.

```julia
@with_kw mutable struct Args
    lr::Float64 = 1e-3     # learning rate
    N::Int = 15            # Number of perceptrons in hidden layer
    test_len::Int = 100    # length of test data
    langs_len::Int = 0     # Number of different languages in Corpora
    alphabet_len::Int = 0  # Total number of characters possible, in corpora
    throttle::Int = 10     # throttle timeout
end
```

<br>

```julia
function get_processed_data(args)
    corpora = Dict()

    for file in readdir("corpus")
        lang = Symbol(match(r"(.*)\.txt", file).captures[1])
        corpus = split(String(read("corpus/$file")), ".")
        corpus = strip.(Unicode.normalize.(corpus, casefold=true, stripmark=true))
        corpus = filter(!isempty, corpus)
        corpora[lang] = corpus
    end

    langs = collect(keys(corpora))
    args.langs_len = length(langs)
    alphabet = ['a':'z'; '0':'9'; ' '; '\n'; '_']
    args.alphabet_len = length(alphabet)

    # See which chars will be represented as "unknown"
    unique(filter(x -> x ∉ alphabet, join(vcat(values(corpora)...))))

    dataset = [(onehotbatch(s, alphabet, '_'), onehot(l, langs)) for l in langs for s in corpora[l]] |> shuffle

    train, test = dataset[1:end-args.test_len], dataset[end-args.test_len+1:end]
    return train, test
end
```
<br>

Build the model.

```julia
function build_model(args)
    scanner = Chain(Dense(args.alphabet_len, args.N, σ), LSTM(args.N, args.N))
    encoder = Dense(args.N, args.langs_len)
    return scanner, encoder
end
 
function model(x, scanner, encoder)
    state = scanner.(x.data)[end]
    reset!(scanner)
    encoder(state)
end

```

<br>

Define the train function.

```julia
function train(; kws...)
    # Initialize Hyperparameters
    args = Args(; kws...)
    # Load Data
    train_data, test_data = get_processed_data(args)

    @info("Constructing Model...")
    scanner, encoder = build_model(args)

    loss(x, y) = logitcrossentropy(model(x, scanner, encoder), y)
    testloss() = mean(loss(t...) for t in test_data)
    
    opt = ADAM(args.lr)
    ps = params(scanner, encoder)
    evalcb = () -> @show testloss()
    @info("Training...")
    Flux.train!(loss, ps, train_data, opt, cb = throttle(evalcb, args.throttle))
end
```

<br>

Train the model.

```julia
cd(@__DIR__)
train()
```

<br>

Output:

```
[ Info: Constructing Model...
[ Info: Training...
testloss() = 1.6677606f0
testloss() = 1.5074775f0
testloss() = 1.1638744f0
testloss() = 1.2398477f0
```