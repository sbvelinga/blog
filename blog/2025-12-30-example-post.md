---
layout: post
title: Welcome to Svelinga Blog
date: 2025-12-30
tags:
  - introduction
  - eleventy
  - web-development
description: First post on the new Svelinga blog built with Eleventy
draft: true
---

Welcome to my new blog! This is an example post to demonstrate the Markdown
features and styling available on this site.

## Markdown Features

This blog supports various Markdown features including:

### Headings

You can use multiple levels of headings to structure your content.

### Lists

Unordered lists:

- First item
- Second item
- Third item

Ordered lists:

1. First step
2. Second step
3. Third step

### Code Blocks

Inline code looks like `this`.

Code blocks with syntax highlighting:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

### Blockquotes

> This is a blockquote. It's useful for highlighting important information
> or quotes from other sources.

### Emphasis

You can use **bold text** and *italic text* for emphasis.

### Links

[Link text](https://example.com) will appear as a clickable link.

### Footnotes

This is a reference to a footnote[^1].

[^1]: This is the footnote content. It will appear at bottom of the page.

## Media Embedding

You can embed YouTube videos and music playlists using shortcodes:

### YouTube Video

{% youtube "https://www.youtube.com/watch?v=dQw4w9WgXcQ" %}

### Music Playlists

{% playlist "spotify" "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM3M" "apple" "https://music.apple.com/us/playlist/todays-hits/pl.f4d1ef2e03484713833989e5d661078d" "youtube" "https://www.youtube.com/playlist?list=PLTLtFJrq8uUWFBxXJ4Tr7La-9sGoCXVRe" %}

## Getting Started

To create a new blog post, create a new Markdown file in the `blog/`
directory with the filename format `YYYY-MM-DD-post-slug.md`. The frontmatter
at the top of the file should include:

```yaml
---
layout: post
title: Your Post Title
date: 2025-12-30
tags: [tag1, tag2]
description: A brief description of the post
---
```

## Conclusion

Thanks for reading! Feel free to explore the site and check out the other
pages available.
