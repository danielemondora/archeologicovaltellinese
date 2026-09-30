import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import {
  dateFilter,
  htmlDateFilter,
} from './src/_includes/filters/date-filters.js'
import htmlmin from 'html-minifier-terser'
import * as esbuild from 'esbuild'

import markdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import implicitFigures from 'markdown-it-implicit-figures'

export default function (eleventyConfig) {
  // PLUGIN
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['avif'],
    widths: [320, 768, 1200],
    defaultAttributes: {
      loading: 'lazy',
      sizes: 'auto',
      decoding: 'async',
    },
  })

  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  const eleventySlugify = eleventyConfig.getFilter('slugify')

  const markdownLib = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
  })
    .use(markdownItFootnote)
    .use(markdownItAnchor, {
      level: [2, 3],
      slugify: eleventySlugify,
      permalink: markdownItAnchor.permalink.headerLink({
        class: 'header-anchor',
        symbol: '#',
      }),
    })
    .use(markdownItTocDoneRight, {
      level: [2, 3],
      containerClass: 'toc',
      slugify: eleventySlugify,
    })
    .use(implicitFigures, {
      figcaption: true,
      keepAlt: true,
      link: false,
    })

  eleventyConfig.setLibrary('md', markdownLib)

  // SHORTCODE
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)
  // https://www.jamesleighton.com/2026/09/easily-embed-youtube-videos-into-11ty/
  eleventyConfig.addShortcode('youtube', (url, title) => {
    const input = String(url).trim()
    const bareId = input.match(/^[a-zA-Z0-9_-]{11}$/)
    const match =
      bareId ||
      input.match(
        /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/,
      )
    if (!match) {
      throw new Error(
        `youtube shortcode: couldn't extract a video ID from "${url}"`,
      )
    }
    const id = bareId ? bareId[0] : match[1]
    const safeTitle = String(title || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

    return `<div style="position: relative; width: 100%; padding-top: 56.25%; margin-bottom: 1em;">
	<iframe
		src="https://www.youtube-nocookie.com/embed/${id}"
		title="${safeTitle}"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
		style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
 </div>`
  })

  // FILTRI
  eleventyConfig.addFilter('dateFilter', dateFilter)
  eleventyConfig.addFilter('htmlDateFilter', htmlDateFilter)

  // PASSTHROUGH
  eleventyConfig.addPassthroughCopy('_redirects')
  eleventyConfig.addPassthroughCopy({ 'src/assets/favicon': '/' })
  eleventyConfig.addPassthroughCopy('src/assets/fonts')
  eleventyConfig.addPassthroughCopy({ 'src/assets/og-image.jpg': '/' })

  eleventyConfig.addCollection('news', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('./src/news/**/*.md')
      .sort((a, b) => b.date - a.date)
  })

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
      }),
    ])
  })

  // html minification
  eleventyConfig.addTransform('htmlmin', function (content) {
    if ((this.page.outputPath || '').endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })

      return minified
    }

    return content
  })

  // DIRECTORY
  return {
    markdownTemplateEngine: 'njk',
    dir: {
      output: 'dist',
      input: 'src',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
    },
    verbose: true,
  }
}
