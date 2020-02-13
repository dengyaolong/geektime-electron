const fs = require('fs-extra')
const dest = '../../pages/main'
fs.removeSync(dest)
fs.moveSync('./build', '../../pages/main')
