const TYPES = require('./types')
const date = require('@citation-js/date')

const ISSN_REGEX = /^\d{4}-\d{4}$/
const CONVERTERS = {
  ANY: {
    toTarget (...values) { return values.find(Boolean) },
    toSource (value) { return [value] }
  },

  PAGE: {
    toTarget (start, end) { return `${start}-${end}` },
    toSource (pages) { return pages.split(/[-–—]/g) }
  },

  ISBN: {
    toTarget (id) { return ISSN_REGEX.test(id) ? [id] : [, id] },
    toSource (ids) { return ids.find(Boolean) }
  },

  DATE: {
    toTarget (...dates) {
      return date.parse(dates.find(Boolean).split('/').filter(Boolean).join('/'))
    },
    toSource (date) {
      const parts = Array(4).fill('')
      date['date-parts'][0].forEach((part, index) => { parts[index] = part })
      if (date.season) { part[3] = date.season }
      return parts.join('/')
    }
  },

  NAME: {
    toTarget (...lists) {
      return lists
        .reduce((names, list) => list ? names.concat(list) : names, [])
        .map(name => {
          const [family, given, suffix] = name.split(',')
          return { family, given, suffix }
        })
    },
    toSource (names) {
      return names.map(({ family, given, suffix }) => [family, given, suffix].filter(Boolean).join(','))
    }
  },

  KEYWORD: {
    toTarget (words) { return words.join(',') },
    toSource (words) { return words.split(',') }
  },

  ID: {
    toSource (id) { return id.slice(0, 20) }
  },

  TYPE: {
    toTarget (type) { return TYPES.RIS[type] },
    toSource (type) { return TYPES.CSL[type] }
  }
}

export default CONVERTERS
