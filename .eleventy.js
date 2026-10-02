// 1. IMPORTS - Pacchetti NPM
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import htmlmin from 'html-minifier-terser'
import * as esbuild from 'esbuild'

// 1.1 IMPORTS - Markdown Plugins
import markdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import implicitFigures from 'markdown-it-implicit-figures'

// 2. IMPORTS - Moduli Locali
import registerShortcodes from './_11ty/shortcodes/index.js'
import registerFilters from './_11ty/filters/index.js'

export default function (eleventyConfig) {
  const isProduction = process.env.NODE_ENV === 'production'

  // ------------------------------------------------------------------------
  // PLUGINS
  // ------------------------------------------------------------------------
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

  // ------------------------------------------------------------------------
  // SHORTCODES & FILTRI
  // ------------------------------------------------------------------------
  registerShortcodes(eleventyConfig)
  registerFilters(eleventyConfig)

  // ------------------------------------------------------------------------
  // PASSTHROUGH COPY (File statici)
  // ------------------------------------------------------------------------
  eleventyConfig.addPassthroughCopy('src/assets/fonts')
  eleventyConfig.addPassthroughCopy({ 'src/assets/favicon': '/' })
  eleventyConfig.addPassthroughCopy({ 'src/assets/og-image.jpg': '/' })

  // ------------------------------------------------------------------------
  // COLLECTIONS
  // ------------------------------------------------------------------------
  eleventyConfig.addCollection('news', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob('./src/news/**/*.md')
      .sort((a, b) => b.date - a.date)
  })

  // ------------------------------------------------------------------------
  // MARKDOWN ENGINE CONFIGURATION
  // ------------------------------------------------------------------------
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

  // ------------------------------------------------------------------------
  // TRANSFORMS (Es. Minificazione)
  // ------------------------------------------------------------------------
  eleventyConfig.addTransform('htmlmin', function (content) {
    if (isProduction && (this.page.outputPath || '').endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
    }
    return content
  })

  // ------------------------------------------------------------------------
  // EVENTS (Build di Asset esterni)
  // ------------------------------------------------------------------------
  eleventyConfig.on('eleventy.before', async () => {
    // Fai partire entrambe le build in parallelo
    await Promise.all([
      // 1. Bundle JavaScript
      esbuild.build({
        entryPoints: ['src/assets/js/bundle.js'],
        bundle: true,
        minify: isProduction,
        sourcemap: !isProduction,
        target: ['es2020'],
        outfile: 'dist/assets/js/bundle.js',
      }),
      // 2. Bundle CSS
      esbuild.build({
        entryPoints: ['src/assets/css/main.css'],
        bundle: true,
        minify: true,
        sourcemap: !isProduction,
        outfile: 'dist/assets/css/main.css',
        external: ['*.woff2', '*.woff', '*.ttf'],
      }),
    ])
  })

  // ------------------------------------------------------------------------
  // DIRECTORY & GLOBAL CONFIG
  // ------------------------------------------------------------------------
  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
    },
    verbose: true,
  }
}
