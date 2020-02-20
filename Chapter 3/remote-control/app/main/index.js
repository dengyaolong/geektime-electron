const {app, BrowserWindow} = require('electron') const path = require('path')
const isDev = require('electron-is-dev')
const handleIPC = require('./ipc')
const {create: createMainWindow, show: showMainWindow, close: closeMainWindow} = require('./windows/main')
// const {create: createControlWindow} = require('./windows/control')
if(require('electron-squirrel-startup')) app.quit()
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // 当运行第二个实例时,将会聚焦到myWindow这个窗口
        showMainWindow()
    })
    app.on('will-finish-launching', () => {
        if(!isDev) {
            require('./updater.js')
        }
        require('./crash-reporter').init()
    })
    // 创建 myWindow, 加载应用的其余部分, etc...
    app.on('ready', () => {
        // createControlWindow()
        app.fp = require('geektime-fringerprint-example').getFringerprint()
        createMainWindow()
        handleIPC()
        require('./trayAndMenu')
        require('./robot.js')()
    })

    app.on('activate', () => {
        // process.crash()
        showMainWindow()
    })
   
    app.on('before-quit', () => {
        closeMainWindow()
    })
}
