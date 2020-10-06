---
layout: blog
title: The Flux Blog
---

{% for post in site.categories.blog %}
{% if post.external %}
[{{post.title}} {% octicon link-external %}]({{post.external}})
{% else %}
[{{post.title}}]({{post.url}})
{% endif %} ({{post.date | date: '%B %Y' }})
{% endfor %}
