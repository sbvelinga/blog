import Parser from 'rss-parser';
import TurndownService from 'turndown';
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['dc:creator', 'author'],
    ]
  }
});
const turndownService = new TurndownService();

turndownService.addRule('remove-scripts', {
  filter: ['script', 'style', 'noscript'],
  replacement: () => ''
});

const FEED_URL = 'https://sbvelinga.wordpress.com/feed/';
const OUTPUT_DIR = './blog';

async function importPosts() {
  try {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log(`Fetching feed from ${FEED_URL}...`);
    const feed = await parser.parseURL(FEED_URL);
    console.log(`Found ${feed.items.length} posts.`);

    for (const item of feed.items) {
      const date = new Date(item.isoDate || item.pubDate);
      const dateStr = date.toISOString().split('T')[0];
      const cleanTitle = item.title || 'Untitled Post';
      const slug = slugify(cleanTitle, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
      const filename = `${dateStr}-${slug}.md`;
      const filePath = path.join(OUTPUT_DIR, filename);

      const htmlContent = item.contentEncoded || item.content || '';
      const markdownContent = turndownService.turndown(htmlContent);
      
      const tags = item.categories || [];
      const snippet = item.contentSnippet || '';
      const description = snippet.split('\n')[0].substring(0, 160).trim().replace(/"/g, '\\"');

      const fmTags = tags.length > 0 
        ? tags.map(tag => `  - ${tag}`).join('\n') 
        : '  - legacy';

      const frontmatter = `---
layout: post
title: "${cleanTitle.replace(/"/g, '\\"')}"
date: ${dateStr}
tags:
${fmTags}
description: "${description}"
---

${markdownContent}`;

      fs.writeFileSync(filePath, frontmatter);
      console.log(`Imported: ${filename}`);
    }
    console.log('\nImport complete!');
  } catch (error) {
    console.error('Error importing posts:', error);
  }
}

importPosts();
