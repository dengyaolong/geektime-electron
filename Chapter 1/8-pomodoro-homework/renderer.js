const {ipcRenderer} = require('electron')
const ProgressBar = require('progressbar.js/dist/progressbar.js')
const Timer = require('timer.js')

let timerContainer = document.getElementById('timer-container')
let switchButton = document.getElementById('switch-button')
let progressBar = new ProgressBar.Circle('#timer-container', {
    strokeWidth: 2,
    color: '#F44336',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
})
let workTime = 1 * 60 // 1分钟工作, 自行设定
let restTime = 10 // 10秒休息
let state = {}

function render () {
    let {remainTime: s, type} = state
    let maxTime = type < 2 ? workTime: restTime
    let ss = s % 60
    let mm = ((s - ss)/ 60).toFixed()
    progressBar.set(1- s/maxTime)
    progressBar.setText(`${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`)
    if(type === 0) {
          switchButton.innerText = '开始工作'
    } else if(type === 1) {
          switchButton.innerText = '停止工作'
    } else if (type === 2){
          switchButton.innerText = '开始休息'
    } else {
          switchButton.innerText = '停止休息'
    }
}

function setState(_state) {
    Object.assign(state, _state)
    render()
}

function startWork() {
    setState({type: 1, remainTime: workTime })
    workTimer.start(workTime)
}

function startRest() {
    setState({type: 3, remainTime: restTime})
    workTimer.start(restTime)
}

const workTimer = new Timer({
    ontick: (ms) => { setState({remainTime: (ms/1000).toFixed(0)}) }, // 每秒更新时间
    onstop: () => { setState({type: 0, remainTime: 0}) }, // 只要是停止，都会进入到工作状态
    onend: function() { 
        let {type} = state
        if(type === 1) {
            setState({type: 2, remainTime: 0})
            if(process.platform === 'darwin') { // 在Mac下才能使用notification
                notification({
                    title: '恭喜你完成任务', 
                    body: '是否开始休息？',
                    actionText: '休息五分钟',
                    closeButtonText: '继续工作',
                    onaction: startRest,
                    onclose: startWork
                }) 
            } else { // windows直接alert
                alert('工作结束')
            }
        } else if(type === 3) {
            setState({type: 0, remainTime: 0})
            if(process.platform === 'darwin') {
                notification({
                    body: '开始新的工作吧!',
                    title: '休息结束', 
                    closeButtonText: '继续休息',
                    actionText: '开始工作',
                    onaction: startWork,
                    onclose: startRest
                })
            } else {
                alert('工作结束')
            }
        }
    }
});

switchButton.onclick = function() {
    if (this.innerText === '开始工作') {
        startWork()
    } else if(this.innerText === '开始休息'){
        startRest()
    } else {
        workTimer.stop()
    }
}

async function notification({title, body, actionText, closeButtonText, onclose, onaction}) {
    let res = await ipcRenderer.invoke('notification', {
        title,
        body, 
        actions: [{text: actionText, type: 'button'}],
        closeButtonText
    })
    res.event === 'close' ? onclose() : onaction()
}

setState({
    remainTime: 0,
    type: 0 // 0 开始工作、1 停止工作、2 开始休息、3 停止休息
})
