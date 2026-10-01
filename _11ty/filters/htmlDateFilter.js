// _11ty/filters/htmlDatefilter.js
import { DateTime } from 'luxon'

export const htmlDateFilter = (value) => {
  const dateObj =
    value instanceof Date
      ? DateTime.fromJSDate(value, { zone: 'utc' })
      : DateTime.fromISO(value, { zone: 'utc' })

  return dateObj.toISODate()
}
