const {app, BrowserWindow, ipcMain} = require('electron')
const robot = require('robotjs')
let win
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('./index.html')
}
app.on('ready', () => {
    createWindow()
    console.log(process.versions.electron, process.versions.node)
    ipcMain.on('robot-move', (e, x, y) => {
        console.log('move', x, y)
        robot.moveMouse(x, y);
        robot.mouseClick();
    })
})
