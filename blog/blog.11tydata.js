const isDev =
  process.env.ELEVENTY_RUN_MODE === "serve" ||
  process.env.ELEVENTY_RUN_MODE === "watch";

export default {
  eleventyComputed: {
    // Zonder dit schrijft Eleventy concepten (`draft: true`) alsnog naar hun
    // eigen URL; de collection-filter verbergt ze alleen uit overzichten.
    permalink: (data) => (data.draft && !isDev ? false : undefined),
  },
};
