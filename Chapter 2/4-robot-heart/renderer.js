const {ipcRenderer} = require('electron')
setTimeout(() => {

    let n = 120;
    let beta = 1/n;
    let a = 50
    let c = Math.cos(beta)
    let s = Math.sin(beta)
    let c1 = c*c - s*s
    let s1 = 2 * c * s
    let x10 = a, x20=a/2, y10=0, y20=0
    let x=2*a,y=0
    let x1=x,y1=y
    // function draw(x, y) {console.log(x,y)}
    draw(x1,y1)
    for(let i = 0; i <= n * 10; i++) {
        let x_10= c * x10 - s * y10
        let y_10= c * y10 + s * x10
        let x_20 = c1 * x20 - s1 * y20
        let y_20 = c1 * y20 + s1 * x20
        x10 = x_10 ; y10=y_10;
        x20 = x_20; y20 = y_20;
        x = x10 + x20 + a/2.0
        y = y10 + y20;
        x1 = x + 0.5; y1 = y + 0.5;
        draw(x1, y1)
    }

    function sleep(ms){
        return new Promise(resolve=>{
            setTimeout(resolve,ms)
        })
    }
    async function draw(x,y ){
        // 把每个点连接起来
        await sleep(10)
        ipcRenderer.send('robot-move', x + 400,y + 300)
        // context.fill();
    }
}, 2000)
