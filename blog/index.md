---
layout: page
title: Posts
permalink: /blog/
---

<ul>
{% for post in collections.posts reversed %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}
  </li>
{% endfor %}
</ul>
