# Personal Blog

A minimal, privacy-focused static blog built with [Eleventy](https://www.11ty.dev/).

## Features

- Static site generation with Eleventy v3.x
- Markdown content with frontmatter
- WebC component-based architecture
- Liquid template engine for layouts
- Responsive design with vanilla CSS
- Syntax highlighting for code blocks
- Privacy-focused (no tracking cookies)
- GitHub Actions CI/CD for deployment
- Markdown linting for content consistency

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/personlijke-blog.git
cd personlijke-blog
```

2. Install dependencies:

```bash
npm install
```

## Development

Start the local development server:

```bash
npm run start
```

The site will be available at `http://localhost:8080`.

## Building

Build the site for production:

```bash
npm run build
```

The output will be generated in the `_site/` directory.

## Linting

Check Markdown files for style issues:

```bash
npm run lint
```

Auto-fix linting issues:

```bash
npm run lint:fix
```

## Project Structure

```
personlijke-blog/
├── _data/              # Global data files
│   └── site.json       # Site metadata
├── _includes/          # Reusable template components
│   ├── layouts/        # Base HTML templates (.liquid)
│   │   ├── base.liquid
│   │   ├── post.liquid
│   │   └── page.liquid
│   └── components/     # WebC components (.webc)
│       ├── header.webc
│       ├── footer.webc
│       └── youtube.webc
├── assets/             # Static assets
│   ├── css/
│   │   └── main.css
│   └── img/
│       └── favicon.svg
├── blog/               # Blog posts
├── pages/              # Static pages
├── .eleventy.js        # Eleventy configuration
├── .eleventyignore     # Files to exclude from build
├── .gitignore          # Git ignore rules
├── .markdownlint.json  # Markdown linting rules
├── .nojekyll           # Disable Jekyll on GitHub Pages
├── package.json        # Dependencies and scripts
├── index.md            # Homepage
└── README.md           # This file
```

## Creating Content

### Blog Posts

Create a new Markdown file in the `blog/` directory with the filename
format `YYYY-MM-DD-post-slug.md`:

```markdown
---
layout: post
title: Your Post Title
date: 2025-12-30
tags:
  - tag1
  - tag2
description: A brief description of the post
---

Your post content here...
```

### Static Pages

Create a new Markdown file in the `pages/` directory:

```markdown
---
layout: page
title: Page Title
---

Your page content here...
```

## Markdown Features

This blog supports the following Markdown features:

- Headings (h1-h6)
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Inline code
- Blockquotes
- Links
- Images
- Bold and italic text
- Footnotes
- Definition lists
- Custom containers
- Emoji support

## Deployment

The site is automatically deployed to GitHub Pages when you push to the
`main` branch.

### Manual Deployment

1. Commit and push your changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. The GitHub Actions workflow will automatically build and deploy the site.

### GitHub Pages Settings

Make sure GitHub Pages is configured:

1. Go to repository Settings > Pages
2. Set source to "GitHub Actions"
3. The site will be available at `https://yourusername.github.io/personlijke-blog/`

## Tech Stack

- **Eleventy**: Static site generator
- **Markdown**: Content format
- **Liquid**: Template engine
- **WebC**: Component system
- **markdown-it**: Markdown parser with plugins
- **Vanilla CSS**: Styling (no frameworks)
- **GitHub Actions**: CI/CD pipeline

## License

ISC
