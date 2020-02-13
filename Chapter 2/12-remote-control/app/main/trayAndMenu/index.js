if(process.platform === 'darwin') {
    require('./darwin.js') 
} else if (process.platform === 'win32') {
    require('./win32.js') 
} else {
  // 不处理  
}
