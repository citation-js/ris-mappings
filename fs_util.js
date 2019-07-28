const fs = require('fs')
const { promisify } = require('util')
const readDir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

module.exports = {
  readDir,
  readFile,
  writeFile,
  ROOT: __dirname
}
