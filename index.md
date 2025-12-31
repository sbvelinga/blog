---
layout: page
title: Home
---

<div class="home">
  <h1>Welkom</h1>
  <p>Leuk dat je er bent! Op deze plek deel ik mijn gedachten over geloof, het leven en alles wat mij inspireert. Ik hoop dat je hier iets vindt dat je raakt of aan het denken zet.</p>
  <p><a href="{{ '/pages/about/' | url }}">Lees meer over mij &rarr;</a></p>
</div>

<h2>Recente Blogposts</h2>

<ul class="post-list">
  {% assign latest_posts = collections.posts | reverse %}
  {% for post in latest_posts limit:5 %}
    <li class="post-list-item">
      <h3 class="post-list-title">
        <a href="{{ post.url }}">{{ post.data.title }}</a>
      </h3>
      <div class="post-list-meta">
        <time datetime="{{ post.date | date: '%Y-%m-%d' }}">
          {{ post.date | readableDate }}
        </time>
      </div>

      {% assign lines = post.templateContent | strip_html | split: '\n' %}
      {% for line in lines %}
        {% assign clean_line = line | strip %}
        {% unless clean_line == '' %}
          <p class="post-excerpt">{{ clean_line }}</p>
          <p class="post-readmore"><a class="read-more" href="{{ post.url }}">Lees Verder</a></p>
          {% break %}
        {% endunless %}
      {% endfor %}

      {% if post.data.tags %}
        <div class="post-tags">
          {% for tag in post.data.tags %}
            {% if tag != "posts" %}
              {% assign tagColorIndex = tag.size | modulo: 5 %}
              <a href="{{ '/tags/' | url }}{{ tag | slugify }}/" class="tag tag-{{ tagColorIndex }}">{{ tag }}</a>
            {% endif %}
          {% endfor %}
        </div>
      {% endif %}
    </li>
  {% endfor %}
</ul>
