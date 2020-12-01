---
title: Speech recognition
author: Dhairya Gandhi
layout: blog
tag: Other and contributed
---


This model is an implementation of the neural network for speech recognition described in Graves & Schmidhuber (2005). It takes in frames of frequency information derived from the waveform, and it predicts which phone class the frame belongs to, among a reduced set of English phones. The training is run using the [TIMIT data set (Garofolo et al., 1993)](https://catalog.ldc.upenn.edu/LDC93S1).

This implementation is broken down into two separate scripts. The first, `00-data.jl`, extracts the appropriate speech features from the data in TIMIT and saves them to file. It assumes that you have the TIMIT speech corpus extracted, [converted into RIFF WAV file format](https://web.archive.org/web/20180528013655/https://stackoverflow.com/questions/47370167/change-huge-amount-of-data-from-nist-to-riff-wav-file), and in the same directory as the script itself. It takes no arguments, and it contains the following:

```julia
# 00-data.jl
# Extracts audio features from TIMIT to be used in speech recognition

using Flux: onehotbatch
using WAV
using BSON

# This wookay's fork of MFCC updated to work with Julia v0.7/1.0
# https://github.com/wookay/MFCC.jl
using MFCC

# Define constants that will be used
const TRAINING_DATA_DIR = "TIMIT/TRAIN"
const TEST_DATA_DIR = "TIMIT/TEST"

const TRAINING_OUT_DIR = "train"
const TEST_OUT_DIR = "test"

# Make dictionary to map from phones to class numbers
const PHONES = split("h#	q	eh	dx	iy	r	ey	ix	tcl	sh	ow	z	s	hh	aw	m	t	er	l	w	aa	hv	ae	dcl	y	axr	d	kcl	k	ux	ng	gcl	g	ao	epi	ih	p	ay	v	n	f	jh	ax	en	oy	dh	pcl	ah	bcl	el	zh	uw	pau	b	uh	th	ax-h	em	ch	nx	eng")
translations = Dict(phone=>i for (i, phone) in enumerate(PHONES))
translations["sil"] = translations["h#"]
const PHONE_TRANSLATIONS = translations

# Make dictionary to perform class folding
const FOLDINGS = Dict(
  "ao" => "aa",
  "ax" => "ah",
  "ax-h" => "ah",
  "axr" => "er",
  "hv" => "hh",
  "ix" => "ih",
  "el" => "l",
  "em" => "m",
  "en" => "n",
  "nx" => "n",
  "eng" => "ng",
  "zh" => "sh",
  "pcl" => "sil",
  "tcl" => "sil",
  "kcl" => "sil",
  "bcl" => "sil",
  "dcl" => "sil",
  "gcl" => "sil",
  "h#" => "sil",
  "pau" => "sil",
  "epi" => "sil",
  "ux" => "uw"
)

FRAME_LENGTH = 0.025 # ms
FRAME_INTERVAL = 0.010 # ms

"""
  makeFeatures(wavFname, phnFname)
Extracts Mel filterbanks and associated labels from `wavFname` and `phnFaname`.
"""
function makeFeatures(phnFname, wavFname)
  samps, sr = wavread(wavFname)
  samps = vec(samps)

  mfccs, _, _ = mfcc(samps, sr, :rasta; wintime=FRAME_LENGTH, steptime=FRAME_INTERVAL)

  local lines
  open(phnFname, "r") do f
    lines = readlines(f)
  end

  boundaries = Vector()
  labels = Vector()

  # first field in the file is the beginning sample number, which isn't
  # needed for calculating where the labels are
  for line in lines
    _, boundary, label = split(line)
    boundary = parse(Int64, boundary)
    push!(boundaries, boundary)
    push!(labels, label)
  end

  labelInfo = collect(zip(boundaries, labels))
  labelInfoIdx = 1
  boundary, label = labelInfo[labelInfoIdx]
  nSegments = length(labelInfo)

  frameLengthSamples = FRAME_LENGTH * sr
  frameIntervalSamples = FRAME_INTERVAL * sr
  halfFrameLength = FRAME_LENGTH / 2

  # Begin generating sequence labels by looping through the MFCC
  # frames

  labelSequence = Vector() # Holds the sequence of labels

  idxsToDelete = Vector() # To store indices for frames labeled as 'q'
  for i=1:size(mfccs, 1)
    win_end = frameLengthSamples + (i-1)*frameIntervalSamples

    # Move on to next label if current frame of samples is more than half
    # way into next labeled section and there are still more labels to
    # iterate through
    if labelInfoIdx < nSegments && win_end - boundary > halfFrameLength

      labelInfoIdx += 1
      boundary, label = labelInfo[labelInfoIdx]
    end

    if label == "q"
      push!(idxsToDelete, i)
      continue
    end

    push!(labelSequence, label)
  end

  # Remove the frames that were labeld as 'q'
  mfccs = mfccs[[i for i in 1:size(mfccs,1) if !(i in Set(idxsToDelete))],:]

  mfccDeltas = deltas(mfccs, 2)
  features = hcat(mfccs, mfccDeltas)
  return (features, labelSequence)
end

"""
  createData(data_dir, out_dir)
Extracts data from files in `data_dir` and saves results in `out_dir`.
"""
function createData(data_dir, out_dir)

  ! isdir(out_dir) && mkdir(out_dir)

  for (root, dirs, files) in walkdir(data_dir)

    # Exclude the files that are part of the speaker accent readings
    files = [x for x in files if ! occursin("SA", x)]

    phnFnames = [x for x in files if occursin("PHN", x)]
    wavFnames = [x for x in files if occursin("WAV", x)]

    one_dir_up = basename(root)
    print("$(root)\r")

    for (wavFname, phnFname) in zip(wavFnames, phnFnames)
      phn_path = joinpath(root, phnFname)
      wav_path = joinpath(root, wavFname)

      x, y = makeFeatures(phn_path, wav_path)

      # Generate class nums; there are 61 total classes, but only 39 are
      # used after folding.
      y = [PHONE_TRANSLATIONS[x] for x in y]
      class_nums = [n for n in 1:61]
      y = onehotbatch(y, class_nums)

      base, _ = splitext(phnFname)
      dat_name = one_dir_up * base * ".bson"
      dat_path = joinpath(out_dir, dat_name)
      BSON.@save dat_path x y
    end
  end
  println()
end

createData(TRAINING_DATA_DIR, TRAINING_OUT_DIR)
createData(TEST_DATA_DIR, TEST_OUT_DIR)
```

<br>

You can run the above script as:

```bash
julia 00-data.jl
```
<br>

It will print out which directory it is working on as it goes so you can track the progress as it extracts the training and testing data.

The second script, `01-speech-blstm.jl`, trains the network. It loads in the speech data extracted from `00-data.jl` and runs it through the network for 20 epochs, which is on average how long Graves & Schmidhuber needed to train the network for. (The number of epochs can be changed by modifying the value of the `EPOCHS` variable in the script.) 

```julia
# See Graves & Schmidhuber ([Graves, A., &
# Schmidhuber, J. (2005). Framewise phoneme classification with
# bidirectional LSTM and other neural network architectures. Neural
# Networks, 18(5-6), 602-610.]).

using Flux
using Flux: crossentropy, softmax, flip, sigmoid, LSTM, @epochs
using BSON
using Random

# Paths to the training and test data directories
const TRAINDIR = "train"
const TESTDIR = "test"
const EPOCHS = 20

# Component layers of the bidirectional LSTM layer
forward = LSTM(26, 93)
backward = LSTM(26, 93)
output = Dense(186, 61)

"""
  BLSTM(x)
  
BLSTM layer using above LSTM layers
  
# Parameters
* **x** A 2-tuple containing the forward and backward time samples;
the first is from processing the sequence forward, and the second
is from processing it backward
  
# Returns
* The concatenation of the forward and backward LSTM predictions
"""
BLSTM(x) = vcat.(forward.(x), flip(backward, x))

"""
  model(x)
The chain of functions representing the trained model.
# Parameters
* **x** The utterance that the model should process
# Returns
* The model's predictions for each time step in `x`
"""
model(x) = softmax.(output.(BLSTM(x)))

"""
   loss(x, y)
Calculates the categorical cross-entropy loss for an utterance
  
# Parameters
* **x** Iterable containing the frames to classify
* **y** Iterable containing the labels corresponding to the frames
in `x`
  
# Returns
* The calculated loss value
  
# Side-effects
* Resets the state in the BLSTM layer
"""
function loss(x, y)
  l = sum(crossentropy.(model(x), y))
  Flux.reset!((forward, backward))
  return l
end

"""
  readData(dataDir)
Reads in the data contained in a specified directory
  
# Parameters
* **dataDir** String of the path to the directory containing the data
  
# Return
* **Xs** Vector where each element is a vector of the frames for
one utterance
* **Ys** A vector where each element is a vector of the labels for
the frames for one utterance
"""
function readData(dataDir)
  fnames = readdir(dataDir)

  Xs = Vector()
  Ys = Vector()
  
  for (i, fname) in enumerate(fnames)
    print(string(i) * "/" * string(length(fnames)) * "\r")
    BSON.@load joinpath(dataDir, fname) x y
    x = [x[i,:] for i in 1:size(x,1)]
    y = [y[:,i] for i in 1:size(y,2)]
    push!(Xs, x)
    push!(Ys, y)
  end
  
  return (Xs, Ys)
end

"""
  evaluateAccuracy(data)
Evaluates the accuracy of the model on a set of data; can be used
either for validation or test accuracy
# Parameters
* **data** An iterable of paired values where the first element is
all the frames for a single utterance, and the second is the
associated frame labels to compare the model's predictions against
# Returns
* The predicted accuracy value as a proportion of the number of
correct predictions over the total number of predictions made
"""
function evaluateAccuracy(data)
  correct = Vector()
  for (x, y) in data
    y = argmax.(y)
    ŷ = argmax.(model(x))
    Flux.reset!((forward, backward))
    append!(correct, [ŷ_n == y_n for (ŷ_n, y_n) in zip(ŷ, y)])
  end
  sum(correct) / length(correct)
end

function main()

  println("Loading files")
  Xs, Ys = readData(TRAINDIR)
  data = collect(zip(Xs, Ys))

  valData = data[1:184]
  data = data[185:end]

  # Begin training
  println("Beginning training")

  opt = Momentum(params((forward, backward, output)), 10.0^-5; ρ=0.9)

  i = 0

  @epochs EPOCHS begin

    i += 1

    shuffle!(data)
    valData = valData[shuffle(1:length(valData))]
    
    Flux.train!(loss, data, opt)
    
    BSON.@save "model_epoch$(i).bson" forward backward output

    print("Validating\r")
    val_acc = evaluateAccuracy(valData)
    println("Val acc. " * string(val_acc))
    println()
  end

  # Clean up some memory
  valData = nothing
  data = nothing
  Xs = nothing
  Ys = nothing
  GC.gc()

  # Test model
  print("Testing\r")
  Xs_test, Ys_test = readData(TESTDIR)
  test_data = collect(zip(Xs_test, Ys_test))
  test_acc = evaluateAccuracy(test_data)
  println("Test acc. " * string(test_acc))
  println()
end

main()
```
<br>

You can run the above script as:

```bash
julia 01-speech-blstm.jl
```

At the end of each epoch, the script prints out the validation accuracy and saves a BSON file with the model's current weights. After running through all the epochs, the script prints out the testing accuracy on the default holdout test set.

## Using a trained model

It is simple to use the model once it's been trained. Simply load in the model from the BSON file, and use the `model(x)` function from `01-speech-blstm.jl` on some data prepared using the same procedure as in `00-data.jl`. The phoneme class numbers can be determined by using `argmax`. The `Flux` and `BSON` packages will need to be loaded in beforehand.

```julia
using Flux, BSON
using Flux: flip, softmax
BSON.@load "model_epoch20.bson" forward backward output
BLSTM(x) = vcat.(forward.(x), flip(backward, x))
model(x) = softmax.(output.(BLSTM(x)))
ŷ = model(x) # where x is utterance you want to be transcribed
phonemes = argmax.(ŷ)
```

## References

Garofalo, J. S., Lamel, L. F., Fisher, W. M., Fiscus, J. G., Pallett, D. S., & Dahlgren, N. L. (1993). The DARPA TIMIT acoustic-phonetic continuous speech corpus cdrom. Linguistic Data Consortium.

Graves, A., & Schmidhuber, J. (2005). Framewise phoneme classification with bidirectional LSTM and other neural network architectures. *Neural Networks, 18*(5-6), 602-610.
