const path = require('path')
const {readDir, readFile, writeFile, ROOT} = require('./fs_util.js')

const TYPES = require('./specs/types')
const PROPS = require('./specs/new/prop_mappings')
const MAPPINGS = require('./specs/new/prop_summary')

const RIS_TYPES = Object.keys(TYPES.RIS)
const CSL_TYPES = Object.keys(TYPES.CSL)
const NUMBER_OF_RIS_TYPES = RIS_TYPES.length
const NUMBER_OF_CSL_TYPES = CSL_TYPES.length

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

function prune (table, distinct) {
  for (let row of table) {
    for (let i = 0; i < table.length; i++) {
      const otherRow = table[i]

      if (row !== otherRow && compare(row, otherRow, distinct)) {
        merge(row, otherRow)
        table.splice(i--, 1)
      }
    }
  }
}

async function main () {
  const table = [
    {
      tag: ['TY'],
      prop: ['type'],
      type: RIS_TYPES
    },
    {
      tag: ['ID'],
      prop: ['id'],
      type: RIS_TYPES
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
        for (let type of descs[desc]) {
          table.push({ tag: [tag], prop: [prop], type: type.split(' ').slice(-1) })
        }
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
      const targetTypes = getTargetTypes(mapping.when.source.TY)
      if (!targetTypes.length) {
        mapping.when.target = false
      } else if (targetTypes !== NUMBER_OF_CSL_TYPES) {
        mapping.when.target = { type: targetTypes }
      }
    }
    return mapping
  }).sort((a, b) => a.source < b.source ? -1 : a.source > b.source ? 1 : 0)

  await writeFile(path.join(ROOT, 'specs', 'new', 'index.json'), JSON.stringify(mappingList, null, 2))
}

main()

function getTargetTypes (sourceTypes) {
  return unique(sourceTypes
    .flatMap(sourceType => CSL_TYPES.filter(targetType => TYPES.CSL[targetType] === sourceType))
    .filter(Boolean)
    .sort())
}

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
