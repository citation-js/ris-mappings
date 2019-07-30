const path = require('path')
const {readDir, readFile, writeFile, ROOT} = require('./fs_util.js')

const TYPES = require('./types')
const PROPS = require('./props')
const MAPPINGS = require('./mappings_summary')

const NUMBER_OF_RIS_TYPES = Object.keys(TYPES.RIS).length
const NUMBER_OF_CSL_TYPES = Object.keys(TYPES.CSL).length

function merge (row, otherRow) {
  for (let prop in row) {
    for (let value of otherRow[prop]) {
      if (!row[prop].includes(value)) {
        row[prop].push(value)
      }
    }
  }
}

function isSubset (sub, set) {
  return sub.every(value => set.includes(value))
}

function compare (a, b, distinct) {
  return distinct.every(column =>
    isSubset(a[column], b[column]) &&
    isSubset(b[column], a[column]))
}

let counter = 0

function prune (table, distinct) {
  for (let row of table) {
    for (let otherRow of table) {
      if (row !== otherRow && compare(row, otherRow, distinct)) {
        merge(row, otherRow)
        table.splice(table.indexOf(otherRow), 1)
      }
    }
  }
}

async function main () {
  const table = [
    {
      tag: ['TY'],
      prop: ['type'],
      type: Object.keys(TYPES.RIS)
    },
    {
      tag: ['ID'],
      prop: ['id'],
      type: Object.keys(TYPES.RIS)
    }
  ]

  for (let tag in MAPPINGS) {
    const descs = MAPPINGS[tag]
    for (let desc in descs) {
      if (PROPS[tag][desc] == null) {
        throw new Error(`No CSL mapping for ${tag}:${desc}`)
      } else if (PROPS[tag][desc] === false) {
        continue
      }

      for (let prop of [].concat(PROPS[tag][desc])) {
        table.push({
          tag: [tag],
          prop: [prop],
          type: descs[desc].map(type => type.split(' ').pop())
        })
      }
    }
  }

  prune(table, ['prop', 'type'])
  prune(table, ['tag', 'type'])
  prune(table, ['prop', 'tag'])

  const mappingList = table.map(({tag, prop, type}) => {
    const mapping = {
      source: unique(tag).sort(),
      target: unique(prop).sort(),
      when: {
        source: {
          TY: unique(type).sort()
        }
      }
    }
    if (mapping.source.length === 1) { mapping.source = mapping.source[0] }
    if (mapping.target.length === 1) { mapping.target = mapping.target[0] }
    if (mapping.when.source.TY.length === NUMBER_OF_RIS_TYPES) {
      delete mapping.when
    } else {
      mapping.when.target = {
        type: unique(mapping.when.source.TY.map(type => TYPES.RIS[type])).sort()
      }
    }
    return mapping
  }).sort((a, b) => a.source < b.source ? -1 : a.source > b.source ? 1 : 0)

  await writeFile(path.join(ROOT, 'mappings.json'), JSON.stringify(mappingList, null, 2))
}

main()

function split (array, predicate) {
  return array.reduce((result, value, index, array) => {
    if (predicate(value, index, array)) {
      result[0].push(value)
    } else {
      result[1].push(value)
    }
    return result
  }, [[], []])
}

function unique (array) {
  return array.filter((v, i, a) => a.indexOf(v) === i)
}
