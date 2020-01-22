const {ipcRenderer} = require('electron')
ipcRenderer.on('do-some-work', (e, a) => {
    alert('renderer2 handle some work' + a)
})
