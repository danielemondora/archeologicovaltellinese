import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import { dateFilter, htmlDateFilter } from './src/_includes/filters/date-filters.js';
import htmlmin from 'html-minifier-terser';
import * as esbuild from 'esbuild';
import fs from "node:fs";
import path from "node:path";

import markdownIt from 'markdown-it';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
import markdownItImplicitFigures from 'markdown-it-implicit-figures';

export default function (eleventyConfig) {

  // PLUGIN
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif"],
    widths: [320, 768, 1400],
    defaultAttributes: {
      loading: 'lazy',
      sizes: 'auto',
      decoding: 'async',
    },
  });

  const eleventySlugify = eleventyConfig.getFilter("slugify");

  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
    .use(markdownItFootnote)
    .use(markdownItAnchor, {
      level: [2, 3],
      slugify: eleventySlugify,
      permalink: markdownItAnchor.permalink.headerLink({
        class: 'header-anchor',
        symbol: '#'
      })
    })
    .use(markdownItTocDoneRight, {
      level: [2, 3],
      containerClass: 'toc',
      slugify: eleventySlugify
    })
    .use(markdownItImplicitFigures, {
      figcaption: true,
      keepAlt: true,
      link: false
    });

  eleventyConfig.setLibrary("md", markdownLib);

  // SHORTCODE
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  // FILTRI
  eleventyConfig.addFilter('dateFilter', dateFilter);
  eleventyConfig.addFilter('htmlDateFilter', htmlDateFilter);

  // PASSTHROUGH
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy({ "src/assets/images/favicon/": "/" });
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy({ "src/assets/images/logo.jpg": "/logo.jpg" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images/grosio_giroldo_armigeri.png": "/og-image.png" });


  eleventyConfig.addCollection("news", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("./src/news/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // BUILD CON ESBUILD
  eleventyConfig.on('eleventy.before', async () => {
    // Fai partire entrambe le build in parallelo
    await Promise.all([
      // 1. Bundle JavaScript
      esbuild.build({
        entryPoints: ['src/_includes/scripts/bundle.js'],
        bundle: true,
        minify: true,
        sourcemap: true,
        target: ['es2020'],
        outfile: 'dist/assets/js/bundle.js',
      }),
      // 2. Bundle CSS
      esbuild.build({
        entryPoints: ['src/_includes/css/main.css'],
        bundle: true,
        minify: true,
        sourcemap: true,
        outfile: 'dist/assets/css/main.css',
        external: ['*.woff2', '*.woff', '*.ttf'],
      })
    ]);
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