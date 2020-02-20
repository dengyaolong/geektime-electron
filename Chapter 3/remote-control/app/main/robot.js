const {ipcMain} = require('electron')
const robot = require('robotjs')
const vkey = require('vkey')

function handleMouse(data) {
    let {clientX, clientY, screen, video} = data
    // data {clientX, clientY, screen: {width, height}, video: {width, height}}
    let x = clientX * screen.width / video.width
    let y = clientY * screen.height / video.height
    console.log(x, y)
    robot.moveMouse(x, y)
    robot.mouseClick()
}

function handleKey(data) {
    // data {keyCode, meta, alt, ctrl, shift}
    const modifiers = []
    if(data.meta) modifiers.push('meta')
    if(data.shift) modifiers.push('shift')
    if(data.alt) modifiers.push('alt')
    if(data.ctrl) modifiers.push('ctrl')
    let key = vkey[data.keyCode].toLowerCase()
    if(key[0] !== '<') { //<shift>
        robot.keyTap(key, modifiers)
    }
}

module.exports = function() {
    ipcMain.on('robot', (e, type, data) => {
        console.log('handle', type, data)
        if(type === 'mouse') {
            handleMouse(data)
        } else if(type === 'key') {
            handleKey(data)
        }
    })
}
