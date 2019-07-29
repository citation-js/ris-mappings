const tags = require('./props')
const mappings = require('./mappings_summary')

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

function log (duplicates) {
  const pad1 = pad(duplicates)
  const pad2 = pad(Object.assign({}, ...Object.values(duplicates)))

  for (let prop1 of Object.keys(duplicates).sort()) {
    const object1 = duplicates[prop1]

    let i = 0
    for (let prop2 in object1) {
      const object2 = object1[prop2]
      console.log([
        (i++ ? '' : prop1).padEnd(pad1, ' '),
        prop2.padEnd(pad2, ' '),
        object2.sort().join(', ')
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
    mappings[tag][prop].forEach(type => add(cslDuplicates, mapping, type.split(' ').pop(), tag))
  }
}

console.log(`
RIS DUPLICATES
==============`)

for (let prop in risDuplicates) {
  if (Object.keys(risDuplicates[prop]).length === 1) {
    delete risDuplicates[prop]
  }
}
log(risDuplicates)

console.log(`
CSL DUPLICATES
==============`)

for (let mapping in cslDuplicates) {
  for (let type in cslDuplicates[mapping]) {
    cslDuplicates[mapping][type] = cslDuplicates[mapping][type].filter((v, i, a) => a.indexOf(v) === i)

    if (cslDuplicates[mapping][type].length === 1) {
      delete cslDuplicates[mapping][type]
    }
  }

  if (Object.keys(cslDuplicates[mapping]).length === 0) {
    delete cslDuplicates[mapping]
  }
}
delete cslDuplicates.false
log(cslDuplicates)
