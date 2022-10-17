using Dates

@delay function hfun_recentposts(params)
    postdir = only(params)
    list = readdir(postdir)
    filter!(f -> endswith(f, ".md"), list)
    dates = Vector{Date}(undef, length(list))
    titles = Vector{String}(undef, length(list))
    links = Vector{String}(undef, length(list))
    for (i, file) in enumerate(list)
        postname = splitext(basename(file))[1]
        url = postdir * "/" * postname
        pubdate = pagevar(url, :published)
        dates[i] = isnothing(pubdate) ? Date(1999) : Date(pubdate, dateformat"d U Y")
        titles[i] = something(pagevar(url, :title), "Post $i")
        externallink = pagevar(url, :external)
        links[i] = isnothing(externallink) ? ("../" * url * "/") : externallink
    end
    perm = sortperm(dates, rev=true)
    io = IOBuffer()
    for i in perm
        write(io, """<p><a href="$(links[i])">$(titles[i])</a>""")
        !isnothing(dates[i]) && write(io, " ($(monthname(dates[i])) $(year(dates[i])))")
        write(io, "</p>\n")
    end
    return String(take!(io))
end
