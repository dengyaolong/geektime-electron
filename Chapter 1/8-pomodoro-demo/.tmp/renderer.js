const {ipcRenderer} = require('electron')
const Timer = require('timer.js')
const timerContainer = document.getElementById('timer-container')
const workTimer = new Timer({
    tick: 1,
    ontick: updateTime,
    onend: () => {
        notification()
    }
})
function startWork() {
    workTimer.start(10)
}

async function notification() {
    let res = await ipcRenderer.invoke('notification')
    if(res === 'rest') {
        setTimeout(() => {
            let notificaiton = new Notification('休息结束！开始工作吧')
            startWork()
        }, 1000)

    } else if(res === 'work') {
        startWork()
    }
}

function updateTime(ms) {
    let s = (ms / 1000).toFixed(0)
    let ss = (s % 60).toFixed(0)
    let mm = (s / 60).toFixed(0)
    console.log(ms)
    timerContainer.innerText = `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
}


startWork()
