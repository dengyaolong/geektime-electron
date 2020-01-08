const {app, BrowserWindow, ipcMain, Notification} = require('electron')

let win
app.on('ready', () => {
    win = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    }) 
    win.loadFile('./index.html')
    handleIPC()
})

function handleIPC() {
    ipcMain.handle('notification', async function () {
        let res = await new Promise((resolve, reject) => {
            let notification = new Notification({
                actions: [{text: '开始休息', type: 'button'}],
                title: '工作结束',
                body: '是否要休息',
                closeButtonText: '继续工作'
            })
            notification.show()
            notification.on('action',() => {
                resolve('rest')
            })
            notification.on('close', () => {
                resolve('work')
            })
        })
        return res
    })
}
