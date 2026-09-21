import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import { dateFilter, htmlDateFilter } from './src/_includes/filters/date-filters.js';
import htmlmin from 'html-minifier-terser';
import * as esbuild from 'esbuild';
import fs from "node:fs";
import path from "node:path";

import markdownIt from 'markdown-it';
import markdownItFootnote from 'markdown-it-footnote';

export default function (eleventyConfig) {

  // PLUGIN
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp"],
    widths: [320, 640, 960, 1200, 1400],
    defaultAttributes: {
      loading: 'lazy',
      sizes: 'auto',
      decoding: 'async',
    },
  });

  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItFootnote);

  eleventyConfig.setLibrary("md", markdownLib);

  // SHORTCODE
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("allergenIcon", function(filename) {
    const filePath = path.join(process.cwd(), "src/assets/images/allergeni", filename);
    
    try {
      return fs.readFileSync(filePath, "utf8");
    } catch (e) {
      return `<!-- Icona non trovata: ${filename} -->`;
    }
  });

  // FILTRI
  eleventyConfig.addFilter('dateFilter', dateFilter);
  eleventyConfig.addFilter('htmlDateFilter', htmlDateFilter);

  // PASSTHROUGH
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy({"src/assets/images/favicon/": "/"});
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy({"src/assets/images/logo.jpg": "/logo.jpg"});

  eleventyConfig.addCollection("news", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("./src/news/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // BUILD CON ESBUILD
  eleventyConfig.on('eleventy.before', async () => {
    // 1. Bundle JavaScript 
    await esbuild.build({
      entryPoints: ['src/_includes/scripts/bundle.js'],
      bundle: true,
      minify: true,
      sourcemap: true,
      target: ['es2020'],
      outfile: 'dist/assets/js/bundle.js',
    });

    // 2. Bundle CSS
    await esbuild.build({
      entryPoints: ['src/_includes/css/main.css'],
      bundle: true,
      minify: true,
      sourcemap: true,
      outfile: 'dist/assets/css/main.css',
      external: ['*.woff2', '*.woff', '*.ttf'],
    });
  });

  // html minification
  eleventyConfig.addTransform('htmlmin', function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    return content;
  });

  // DIRECTORY
  return {
    markdownTemplateEngine: 'njk',
    dir: {
      output: 'dist',
      input: 'src',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts'
    },
    verbose: true,
  };
};