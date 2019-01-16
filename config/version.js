const fs = require('fs')
const pack = require('../package.json')

// update installation.md
const installation = fs
  .readFileSync('./gitbook/installation.md', 'utf-8')
  .replace(
    /<script src="https:\/\/cdn\.jsdelivr\.net\/vue\.i18n\/[\d.]+.[\d]+\/vue-organizations\.min\.js"><\/script>/,
    '<script src="https://cdn.jsdelivr.net/vue.i18n/' + pack.version + '/vue-organizations.min.js"></script>'
  )
  .replace(
    /<script src="https:\/\/unpkg\.com\/vue-organizations@[\d.]+.[\d]+\/dist\/vue-organizations\.min\.js"><\/script>/,
    '<script src="https://unpkg.com/vue-organizations@' + pack.version + '/dist/vue-organizations.min.js"></script>'
  )
fs.writeFileSync('./gitbook/installation.md', installation)
