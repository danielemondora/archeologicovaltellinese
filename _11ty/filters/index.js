// _11ty/filters/index.js
import { dateFilter } from './dateFilter.js'
import { htmlDateFilter } from './htmlDateFilter.js'

export default function registerFilters(eleventyConfig) {
  eleventyConfig.addFilter('dateFilter', dateFilter)
  eleventyConfig.addFilter('htmlDateFilter', htmlDateFilter)
}
