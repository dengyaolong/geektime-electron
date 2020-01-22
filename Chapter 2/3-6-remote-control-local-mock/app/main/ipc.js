const {ipcMain} = require('electron')
const {create: createControlWindow} = require('./windows/control')
const {send: sendMainWindow} = require('./windows/main')

module.exports = function () {
    ipcMain.handle('login', async () => {
        // 这里是跟服务端的交互，先mock
        let code = Math.floor(Math.random()*(999999-100000)) + 100000;
        return code
    })
    ipcMain.on('control', async (e, remoteCode) => {
        // 这里是跟服务端的交互，成功后我们会唤起面板
        createControlWindow()
        sendMainWindow('control-state-change', remoteCode, 1)
    })
}
