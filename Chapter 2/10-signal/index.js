const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8010 });
const code2ws = new Map()

wss.on('connection', function connection(ws, request) {
    ws.sendData = (event, data) => {
        ws.send(JSON.stringify({event, data}));
    };
    ws.sendError = msg => {
        ws.sendData('error', {msg})
    };

    let code =  Math.floor(Math.random()*(999999-100000)) + 100000;
    let ip = request.connection.remoteAddress.replace('::ffff:', '');
    console.log('ip is connected', ip)
    code2ws.set(code, ws)
    ws.on('message', function incoming(message) {
        console.log('imcoming message')
        let parsedMessage = {}
        try {
            parsedMessage = JSON.parse(message);
        } catch (e) {
            console.log('parse error', e)
            ws.sendError('message not valid')
            return
        }
        let {event, data} = parsedMessage

        if (event === 'login') {
            ws.sendData( 'logined', {code})
        } else if(event === 'control'){
            let remote = +data.remote
            if (code2ws.has(remote)) {
                ws.sendData('controlled', {remote})
                let remoteWS = code2ws.get(remote)
                ws.sendRemote = remoteWS.sendData
                remoteWS.sendRemote = ws.sendData
                ws.sendRemote('be-controlled', {remote: code})
            } else {
                ws.sendError('user not found')
           }
        } else if (event === 'forward'){
            ws.sendRemote(data.event, data.data)
        } else {
            ws.sendError('message not handle', message)
        }
    });

    ws.on('close', () => {
        code2ws.delete(code)
        delete ws.sendRemote
        clearTimeout(ws._closeTimeout);
    })

    ws._closeTimeout = setTimeout(() => {
        ws.terminate();
    }, 600000);
});
