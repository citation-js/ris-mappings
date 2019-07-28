const tags = require('./props')

function add (d, a, b, c) {
  if (!(a in d)) { d[a] = {} }
  if (!(b in d[a])) { d[a][b] = [] }
  d[a][b].push(c)
}

function pad (object) {
  return Math.max(...Object
    .keys(object)
    .map(prop => prop.toString().length))
}

function filter (duplicates) {
  for (let prop1 in duplicates) {
    if (Object.keys(duplicates[prop1]).length === 1) {
      delete duplicates[prop1]
    }
  }
}

function log (duplicates) {
  filter(duplicates)

  const pad1 = pad(duplicates)
  const pad2 = pad(Object.assign({}, ...Object.values(duplicates)))

  for (let prop1 in duplicates) {
    const object1 = duplicates[prop1]

    let i = 0
    for (let prop2 in object1) {
      const object2 = object1[prop2]
      console.log([
        (i++ ? '' : prop1).padEnd(pad1, ' '),
        prop2.padEnd(pad2, ' '),
        object2.join(', ')
      ].join(' '))
    }

    console.log()
  }
}

const risDuplicates = {}
const cslDuplicates = {}

for (let tag in tags) {
  const props = tags[tag]
  for (let prop in props) {
    const mapping = props[prop]

    add(risDuplicates, prop, mapping, tag)
    add(cslDuplicates, mapping, prop, tag)
  }
}

console.log(`
RIS DUPLICATES
==============`)

log(risDuplicates)

console.log(`
CSL DUPLICATES
==============`)

delete cslDuplicates.false
log(cslDuplicates)
