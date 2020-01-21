### 基础部分
* quick-start  https://electronjs.org/docs/tutorial/first-app 
* 基本架构 https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes 
* 写得很好的基础介绍 http://jlord.us/essential-electron/ 
* 掌握Electron模块。重点包括：app、BrowserWindow、ipcMain、Menu、Tray、ipcRenderer、Notification、clipboard
    * 通过api-demos可以快速看到效果 https://github.com/electron/electron-api-demos 
    * 查看文档 https://electronjs.org/docs 

### 工程部分
* 选择一个合适的模板
    * react https://github.com/electron-react-boilerplate/electron-react-boilerplate
    * vue https://github.com/SimulatedGREG/electron-vue
    * svelet https://github.com/Rich-Harris/svelte-template-electron
    * 纯JS https://github.com/dengyaolong/electron-boilerplate
* 更新 https://electronjs.org/docs/tutorial/updates
* 监控 https://electronjs.org/docs/api/crash-reporter
* 打包 & 分发 https://electronjs.org/docs/tutorial/application-distribution
* 安全 https://electronjs.org/docs/tutorial/security
* 单测 https://electronjs.org/docs/tutorial/automated-testing-with-a-custom-driver
* 持续集成 https://juejin.im/entry/5995599a6fb9a0249f6a131b

### 原理深入
* 了解Electron时间循环 https://electronjs.org/blog/electron-internals-node-integration
* 源码结构 https://electronjs.org/docs/development/source-code-directory-structure
* 与原生模块混合开发 https://electronjs.org/docs/tutorial/using-native-node-modules
* 性能调优 https://electronjs.org/docs/tutorial/performance


### 项目参考
* 源码
    * Atom https://github.com/atom/atom (架构清晰)
    * WebTorrent https://github.com/webtorrent/webtorrent (WebTorren就是纯JS写的，个人十分喜欢)
    * VSCode https://github.com/microsoft/vscode (大而全，可能比较难读)
* 实践经验
    * 美团 https://github.com/QConChina/QConBeijing2019/blob/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%AE%9E%E8%B7%B5/Electron%20%E5%9C%A8%E4%BC%81%E4%B8%9A%20IM%20%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%AE%9E%E8%B7%B5-%E9%82%93%E8%80%80%E9%BE%99.pdf
    * 携程 https://www.infoq.cn/article/AwVS6Kxt-7LCIFVruF6d
    * https://cloud.tencent.com/developer/article/1558453
    * https://changkun.us/archives/2017/03/217/
    * https://webfe.kujiale.com/browser-to-client/

### 其他资料
书籍，可以翻一下《Electron in Action》，《跨平台桌面应用开发：基于Electron与NW.js》
视频，推荐一下自己的课程 https://time.geekbang.org/course/intro/269
