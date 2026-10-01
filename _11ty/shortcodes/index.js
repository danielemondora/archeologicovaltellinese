// _11ty/shortcodes/index.js
import yearShortcode from './year.js'
import youtubeShortcode from './youtube.js'

export default function registerShortcodes(eleventyConfig) {
  eleventyConfig.addShortcode('year', yearShortcode)
  eleventyConfig.addShortcode('youtube', youtubeShortcode)
}
