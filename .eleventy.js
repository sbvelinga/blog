import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAttrs from "markdown-it-attrs";
import markdownItAnchor from "markdown-it-anchor";
import markdownItDeflist from "markdown-it-deflist";
import markdownItContainer from "markdown-it-container";
import { full as emoji } from "markdown-it-emoji";

export default function (eleventyConfig) {
  // Copy the `assets` directory to the output
  eleventyConfig.addPassthroughCopy("assets");

  // Add Eleventy plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Set base markdown-it library (per 11ty docs)
  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }));

  // Add plugins using amendLibrary (recommended)
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.use(markdownItFootnote)
      .use(markdownItAttrs)
      .use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.linkInsideHeader({
          symbol: "#",
          placement: "before",
        }),
      })
      .use(markdownItDeflist)
      .use(markdownItContainer)
      .use(emoji);
  });

  // YouTube shortcode
  eleventyConfig.addShortcode("youtube", function (urlOrId) {
    let id = urlOrId;
    if (urlOrId.includes("youtube.com") || urlOrId.includes("youtu.be")) {
      const url = new URL(urlOrId);
      if (urlOrId.includes("youtu.be")) {
        id = url.pathname.slice(1);
      } else {
        id = url.searchParams.get("v");
      }
    }
    return `<div class="youtube-wrapper"><iframe src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  });

  // Playlist shortcode
  eleventyConfig.addShortcode("playlist", function (...args) {
    const icons = {
      spotify: "/assets/img/icons/spotify.svg",
      apple: "/assets/img/icons/apple.svg",
      youtube: "/assets/img/icons/youtube.svg",
      deezer: "/assets/img/icons/deezer.svg"
    };

    const platforms = {};
    for (let i = 0; i < args.length; i += 2) {
      const key = args[i];
      const val = args[i + 1];
      if (key && val) {
        platforms[key] = val;
      }
    }

    let html = '<div class="playlist-links">';
    for (const [platform, url] of Object.entries(platforms)) {
      if (icons[platform]) {
        html += `<a href="${url}" class="playlist-icon" target="_blank" rel="noopener" aria-label="${platform}">
          <img src="${icons[platform]}" alt="${platform}" height="48">
        </a>`;
      }
    }
    html += '</div>';
    return html;
  });

  // Configure posts collection with draft filtering
  eleventyConfig.addCollection("posts", function (collection) {
    const isDev = process.env.ELEVENTY_RUN_MODE === "serve" || process.env.ELEVENTY_RUN_MODE === "watch";
    return collection.getFilteredByGlob("blog/*.md").filter((item) => {
      const include = isDev || !item.data.draft;
      if (include && item.data.draft && isDev) {
        let tags = item.data.tags || [];
        if (typeof tags === 'string') tags = [tags];
        if (!tags.includes("drafts")) {
          tags.push("drafts");
        }
        item.data.tags = tags;
      }
      return include;
    });
  });

  // Configure preken collection
  eleventyConfig.addCollection("preken", function (collection) {
    const isDev = process.env.ELEVENTY_RUN_MODE === "serve" || process.env.ELEVENTY_RUN_MODE === "watch";
    return collection.getFilteredByGlob("preken/*.md").filter((item) => {
      const include = (isDev || !item.data.draft) && !item.inputPath.endsWith("index.md");
      if (include && item.data.draft && isDev) {
        let tags = item.data.tags || [];
        if (typeof tags === 'string') tags = [tags];
        if (!tags.includes("drafts")) {
          tags.push("drafts");
        }
        item.data.tags = tags;
      }
      return include;
    });
  });

  // Configure aanbevelingen collection
  eleventyConfig.addCollection("aanbevelingen", function (collection) {
    const isDev = process.env.ELEVENTY_RUN_MODE === "serve" || process.env.ELEVENTY_RUN_MODE === "watch";
    return collection.getFilteredByGlob("aanbevelingen/*.md").filter((item) => {
      const include = (isDev || !item.data.draft) && !item.inputPath.endsWith("index.md");
      if (include && item.data.draft && isDev) {
        let tags = item.data.tags || [];
        if (typeof tags === 'string') tags = [tags];
        if (!tags.includes("drafts")) {
          tags.push("drafts");
        }
        item.data.tags = tags;
      }
      return include;
    });
  });

  // Date filter for readable dates
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Return your Object options:
  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // When deploying as a GitHub Pages project site, set the pathPrefix
    pathPrefix: "/personlijke-blog/",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "liquid",
  };
};
