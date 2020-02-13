const openAboutWindow = require('about-window').default
const path = require('path')

const create = () => openAboutWindow({
    icon_path: path.join(__dirname, 'icon.png'),
    package_json_dir: path.resolve(__dirname, '/../../../'),
    cropyright: 'Copyright (c) 2020 dragon',
    homepage: 'https://github.com/dengyaolong/geektime-electron',
})

module.exports = {create}
