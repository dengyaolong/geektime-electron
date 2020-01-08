const {app, BrowserWindow, ipcMain, Notification} = require('electron')
let mainWindow;
function handleIPC() {
    ipcMain.handle('notification', async (e, {body, title, actions, closeButtonText}) => {
        let res = await new Promise((resolve, reject) => {
            console.log({
                title,
                body,
                actions,
                closeButtonText
            })
            let notification = new Notification({
                title,
                body,
                actions,
                closeButtonText
            })
            notification.show()
            notification.on('action', function(event) {
                resolve({event: 'action'})
            })
            notification.on('close', function(event) {
                resolve({event: 'close'})
            })
        })
        return res
    })
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 250,
        height: 350,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadFile('./index.html')

    return mainWindow
}

app.whenReady().then(() => {
    handleIPC()
    createMainWindow()
})
