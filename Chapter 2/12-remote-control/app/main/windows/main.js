const {BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')


let win
let willQuitApp = false
function create () {
    win = new BrowserWindow({
        width: 600,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.on('close', (e) => {
        if(willQuitApp) {
            win = null
        } else {
            e.preventDefault()
            win.hide()
        }
    })

    if (isDev) {
        win.loadURL('http://localhost:3000')
    } else {
        // 第三章用到
        win.loadFile(path.resolve(__dirname, '../../renderer/pages/main/index.html'))
    }
}

function send(channel, ...args) {
    win.webContents.send(channel, ...args)
}

function show() {
    win.show()
}

function close() {
    willQuitApp = true
    win.close()
}

module.exports = {create, send, show, close}
