const path = require('path')
const {readDir, readFile, writeFile, ROOT} = require('./fs_util.js')

const SHEETS = path.join(ROOT, 'mappings')

async function main () {
  const sheetNames = await readDir(SHEETS)
  const tags = (await Promise.all(sheetNames
    .map(sheetName => readFile(path.join(SHEETS, sheetName), 'utf8'))))
    .map(sheet => sheet.split('\n').map(row => {
      let [tag, description] = row.split(',').map(value => value.trim())
      tag = tag.slice(0, 2)
      return [tag, description]
    }))
    .reduce((tags, sheet, i) => {
      const types = []
      sheet.forEach(([tag, description]) => {
        switch (tag) {
          case 'TY':
            return types.push(sheetNames[i].slice(0, -4) + ' - ' + description.replace(/`/g, ''))
          case 'ER':
            return
          default:
            if (!(tag in tags)) { tags[tag] = {} }
            if (!(description in tags[tag])) { tags[tag][description] = [] }
            tags[tag][description].push(...types)
            return
        }
      })
      return tags
    }, {})

  for (let tag in tags) {
    for (let description in tags[tag]) {
      tags[tag][description].sort()
    }
  }

  console.log(tags)

  writeFile(path.join(ROOT, 'mappings_summary.json'), JSON.stringify(tags, null, 2))
}

main()
