const path = require('path')
const {readDir, readFile, writeFile, ROOT} = require('./fs_util.js')

const CORE = require('./specs/new')
const ADDITIONS = require('./specs/mixed/additional')
const CORE_INDEX = {}

for (let row of CORE) {
  const targets = [].concat(row.target)
  for (let target of targets) {
    if (!CORE_INDEX[target]) {
      CORE_INDEX[target] = []
    }
    CORE_INDEX[target].push(row)
  }
}

const table = []

for (let [source, target] of ADDITIONS) {
  if (!CORE_INDEX[target]) {
    table.push({ source, target, when: { target: false } })
    continue
  }

  for (let row of CORE_INDEX[target]) {
    table.push({
      source,
      target,
      when: {
        source: {
          TY: row.when.source.TY,
          ...[].concat(row.source).reduce((tags, tag) => (tags[tag] = false, tags), {})
        },
        target: false
      }
    })
  }
}

writeFile(path.join(ROOT, 'specs', 'mixed', 'index.json'), JSON.stringify(table, null, 2))
