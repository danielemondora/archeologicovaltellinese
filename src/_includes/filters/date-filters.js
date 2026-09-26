import { DateTime } from 'luxon'

export const dateFilter = (value) => {
  const dateObj =
    value instanceof Date
      ? DateTime.fromJSDate(value, { zone: 'utc' })
      : DateTime.fromISO(value, { zone: 'utc' })

  return dateObj.setLocale('it').toFormat('d MMMM yyyy')
}

export const htmlDateFilter = (value) => {
  const dateObj =
    value instanceof Date
      ? DateTime.fromJSDate(value, { zone: 'utc' })
      : DateTime.fromISO(value, { zone: 'utc' })

  return dateObj.toISODate()
}
