const { app, BrowserWindow  } = require('electron')
let win
app.on('ready', () => {
      win = new BrowserWindow()
      win.loadFile('index.html')
})
