const {app, BrowserWindow, Notification, ipcMain} = require('electron')

let win
let win2
app.on('ready', () => {
    win = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('./index.html')

    win2 = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win2.loadFile('./index2.html')
    global.sharedObject =  {
        win2WebContentsId: win2.webContents.id
    }
    setTimeout(handleIPC, 500)
})

function handleIPC() {
    // ipcMain.on('do-some-work', function (e, a, b) {
    //     // do some work
    //     console.log('do-some-work', a,b)
    // })

    // win.webContents.send('do-some-render-work')
}
