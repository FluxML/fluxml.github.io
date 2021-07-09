---
title: Working with Tabular Data in FastAI.jl
author: Manikya Bardhan
layout: blog
---

[FastAI.jl](https://github.com/FluxML/FastAI.jl) is a package inspired by [fastai](https://github.com/fastai/fastai), and it's goal is to easily enable creating state-of-the-art models.

This blog post shows how to get started on working with tabular data using FastAI.jl and related packages. The work being presented here was done as a part of [GSoC'21](https://summerofcode.withgoogle.com/projects/#5088642453733376) under the mentorship of Kyle Daruwalla, Brian Chen and Lorenz Ohly.

## Loading the data in a container

To start working, we'll have to take our tabular data and load it in such that it supports the interface defined by [Tables.jl](https://tables.juliadata.org/stable/#Implementing-the-Interface-(i.e.-becoming-a-Tables.jl-source)-1). Most of the popular packages for loading in data from different formats do so already, so you probably won't have to worry about this.

Here, we have a `path` to a csv file, which we'll load in using [CSV.jl](https://github.com/JuliaData/CSV.jl) package, and get a DataFrame using [DataFrames.jl](https://github.com/JuliaData/DataFrames.jl).  
If your data is present in a different format, you could use a package which supports loading that format, provided that the final object created supports the required interface.

```julia
julia> using CSV, DataFrames

julia> using FastAI, FastAI.Datasets

julia> path = joinpath(datasetpath("adult_sample") , "adult.csv");

julia> df = CSV.File(path)|> DataFrames.DataFrame; first(df, 5)
5×15 DataFrame
 Row │ age    workclass          fnlwgt  education     education-num  marital-status       occupation        rel ⋯
     │ Int64  String             Int64   String        Float64?       String               String?           Str ⋯
─────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────
   1 │    49   Private           101320   Assoc-acdm            12.0   Married-civ-spouse  missing            Wi ⋯
   2 │    44   Private           236746   Masters               14.0   Divorced             Exec-managerial   No
   3 │    38   Private            96185   HS-grad          missing     Divorced            missing            Un
   4 │    38   Self-emp-inc      112847   Prof-school           15.0   Married-civ-spouse   Prof-specialty    Hu
   5 │    42   Self-emp-not-inc   82297   7th-8th          missing     Married-civ-spouse   Other-service     Wi ⋯
                                                                                                 8 columns omitted
```

After getting an object satisfying Tables.jl Interface, we can pass this to `FastAI.Datasets.TableDataset` to get a container satisfying the `LearnBase` Interface.

```julia
julia> td = TableDataset(df)
TableDataset{DataFrame}(32561×15 DataFrame
   Row │ age    workclass          fnlwgt  education      education-num  marital-status       occupation         ⋯
       │ Int64  String             Int64   String         Float64?       String               String?            ⋯
───────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────
     1 │    49   Private           101320   Assoc-acdm             12.0   Married-civ-spouse  missing            ⋯
     2 │    44   Private           236746   Masters                14.0   Divorced             Exec-managerial
   ⋮   │   ⋮            ⋮            ⋮           ⋮              ⋮                 ⋮                   ⋮          ⋱
 32560 │    32   Local-gov         217296   HS-grad                 9.0   Married-civ-spouse   Transport-moving
 32561 │    26   Private           182308   Some-college           10.0   Married-civ-spouse   Prof-specialty
                                                                                  8 columns and 32557 rows omitted)

```

What this `TableDataset` object allows us to do is that we can get any observation at a particular index by using `getindex(td, index)` and the total number of observations by using `nobs(td)`.

```julia
julia> getobs(td, 3)
DataFrameRow
 Row │ age    workclass  fnlwgt  education  education-num  marital-status  occupation  relationship  race    sex ⋯
     │ Int64  String     Int64   String     Float64?       String          String?     String        String  Str ⋯
─────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────
   3 │    38   Private    96185   HS-grad         missing   Divorced       missing      Unmarried     Black   Fe ⋯
                                                                                                 6 columns omitted

julia> nobs(td)
32561
```

## Data Preprocessing

Although, we have loaded the data in a container which can be used later while creating a `DataLoader` and training, often we would like to perform transformations on it.  
The tabular transformations are defined as a part of the `DataAugmentation.jl` package, and the currently available ones are: 
 - Normalization
 - FillMissing
 - Categorify

### Normalization

The `Normalization` transformation involves normalizing a row of data using the mean and standard deviation of the columns. To start with we'll have to create a `Dict` which contains the required information for all rows to be normalized.

```julia
julia> using DataAugmentation, Statistics

julia> continuous_cols = (:age, :fnlwgt, Symbol("education-num"), Symbol("capital-loss"), Symbol("hours-per-week"));

julia> normstats = Dict();

julia> for col in continuous_cols
           normstats[col] = (Statistics.mean(skipmissing(df[:, col])), Statistics.std(skipmissing(df[:, col])))
       end

julia> normstats
Dict{Any, Any} with 5 entries:
  :fnlwgt                  => (1.89778e5, 105550.0)
  :age                     => (38.5816, 13.6404)
  Symbol("education-num")  => (10.0798, 2.573)
  Symbol("capital-loss")   => (87.3038, 402.96)
  Symbol("hours-per-week") => (40.4375, 12.3474)
```

After getting `normstats` dictionary, we can create the `NormalizeRow` object which will help us perform this transformation.


```julia
julia> normalize = DataAugmentation.NormalizeRow(normstats, continuous_cols);
```

Now let's quickly get a row of data and see `NormalizeRow` in action.

All the transformations work on `TabularItem` objects and use the `apply` function for transforming the data.

```julia
julia> row = getobs(td, 1)
DataFrameRow
 Row │ age    workclass  fnlwgt  education    education-num  marital-status       occupation  relationship  race ⋯
     │ Int64  String     Int64   String       Float64?       String               String?     String        Stri ⋯
─────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────
   1 │    49   Private   101320   Assoc-acdm           12.0   Married-civ-spouse  missing      Wife          Whi ⋯
                                                                                                 7 columns omitted

julia> item = DataAugmentation.TabularItem(row, Tables.columnnames(df));

julia> DataAugmentation.apply(normalize, item).data
(age = 0.7637846676602542, workclass = " Private", fnlwgt = -0.8380709161872286, education = " Assoc-acdm", education-num = 0.7462826288318035, marital-status = " Married-civ-spouse", occupation = missing, relationship = " Wife", race = " White", sex = " Female", capital-gain = 0, capital-loss = 4.5034127099423245, hours-per-week = -0.035428902921319616, native-country = " United-States", salary = ">=50k")
```

We can see that the row has been normalized and we got another `TabularItem` containing a `NamedTuple` with the new data.

### Filling Missing values

Similarly, for `FillMissing` Transformation as well, we'll first create a dictionary containg the required information, construct a `FillMissing` object, and then see the transformation in action by using the `apply` method.

```julia
julia> fmvals = Dict();

julia> for col in continuous_cols
           fmvals[col] = Statistics.median(skipmissing(df[:, col]))
       end

julia> fmvals[:occupation] = " Exec-managerial";

julia> fm = DataAugmentation.FillMissing(fmvals, [continuous_cols..., :occupation]);

julia> DataAugmentation.apply(fm, item).data
(age = 49, workclass = " Private", fnlwgt = 101320, education = " Assoc-acdm", education-num = 12.0, marital-status = " Married-civ-spouse", occupation = " Exec-managerial", relationship = " Wife", race = " White", sex = " Female", capital-gain = 0, capital-loss = 1902, hours-per-week = 40, native-country = " United-States", salary = ">=50k")
```
As we can see, the "occupation" column which originally has a missing value in this row has been replaced by the value specified in the dictionary.

### Label Encoding Categorical Variables

For handling categorical columns, the `Categorify` transform can be used which label encodes a column to contain integers corresponding to each unique class. These integers could be later used to index into `Embedding` layers which might be present in the tabular model. Also, if there are any `missing` values present in the columns to be transformed, they are directly assigned the integer 1.  

Again, we'll create a dictionary containing the classes as the value, for each column name which forms the key.

```julia
julia> categorical_cols = (Symbol("workclass"), Symbol("education"), Symbol("marital-status"), Symbol("occupation"), Symbol("relationship"), Symbol("race"), Symbol("sex"), Symbol("native-country"), :salary);

julia> catdict = Dict();

julia> for col in categorical_cols
           catdict[col] = unique(df[:, col])
       end

julia> categorify = DataAugmentation.Categorify(catdict, categorical_cols);
┌ Warning: There is a missing value present for category 'occupation' which will be removed from Categorify dict
└ @ DataAugmentation ~/.julia/dev/DataAugmentation/src/rowtransforms.jl:108

julia> categorify.dict
Dict{Any, Any} with 9 entries:
  :education               => [" Assoc-acdm", " Masters", " HS-grad", " Prof-school", " 7th-8th", " Some-college"…
  :race                    => [" White", " Black", " Asian-Pac-Islander", " Amer-Indian-Eskimo", " Other"]
  :sex                     => [" Female", " Male"]
  :workclass               => [" Private", " Self-emp-inc", " Self-emp-not-inc", " State-gov", " Federal-gov", " …
  :occupation              => Union{Missing, String}[" Exec-managerial", " Prof-specialty", " Other-service", " H…
  :relationship            => [" Wife", " Not-in-family", " Unmarried", " Husband", " Own-child", " Other-relativ…
  Symbol("native-country") => [" United-States", " ?", " Puerto-Rico", " Mexico", " Canada", " Taiwan", " Vietnam…
  Symbol("marital-status") => [" Married-civ-spouse", " Divorced", " Never-married", " Widowed", " Married-spouse…
  :salary                  => [">=50k", "<50k"]
```
```julia
julia> DataAugmentation.apply(categorify, item).data
(age = 49, workclass = 2, fnlwgt = 101320, education = 2, education-num = 12.0, marital-status = 2, occupation = 1, relationship = 2, race = 2, sex = 2, capital-gain = 0, capital-loss = 1902, hours-per-week = 40, native-country = 2, salary = 2)
```

### Compositions of Transforms

We saw how these transformations can be applied individually, but in most cases we would want a combination of transformations to be applied on the data. There is a really easy way to do this which is possible because the transformations follow the transformation interface defined by `DataAugmentation.jl` package.

If we want to apply `NormalizeRow`, `FillMissing`, and `Categorify` together on our data, we can just use `|>` to create a sequence of transforms.

```julia
julia> tfms = normalize|>fm|>categorify;

julia> typeof(tfms)
Sequence{Tuple{DataAugmentation.NormalizeRow{Dict{Any, Any}, NTuple{5, Symbol}}, DataAugmentation.FillMissing{Dict{Any, Any}, Vector{Symbol}}, DataAugmentation.Categorify{Dict{Any, Any}, NTuple{9, Symbol}}}}
```
Now, we can call the `apply` function on this `Sequence` like we have been doing so for applying the transformations individually.

```julia
julia> DataAugmentation.apply(tfms, item).data
(age = 0.7637846676602542, workclass = 2, fnlwgt = -0.8380709161872286, education = 2, education-num = 0.7462826288318035, marital-status = 2, occupation = 17, relationship = 2, race = 2, sex = 2, capital-gain = 0, capital-loss = 4.5034127099423245, hours-per-week = -0.035428902921319616, native-country = 2, salary = 2)
```

## Conclusion

We saw how to take a tabular dataset present on disk, form a container for it and perform various transformations. Later, we'll see how we can use this `TableContainer` to create a dataloader using the `DataLoaderers.jl` package, construct models for the tabular data and finally train the model in a future post.
