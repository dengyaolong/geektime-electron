const EventEmitter = require('events') 
const peer = new EventEmitter()
const {ipcRenderer, desktopCapturer} = require('electron')
async function getScreenStream() {
    const sources = await desktopCapturer.getSources({types: ['screen']})
    
    navigator.webkitGetUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[0].id,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
            }
        }
    }, (stream) => {
        peer.emit('add-stream', stream)
    }, (err) => {
        //handle err
        console.error(err)
    })
}

getScreenStream()
peer.on('robot', (type, data) => {
    console.log('robot', type, data)
    if(type === 'mouse') {
        data.screen = {
            width: window.screen.width, 
            height: window.screen.height
        }
    }
    setTimeout(() => {
    ipcRenderer.send('robot', type, data)
    }, 2000)

})
module.exports = peer
