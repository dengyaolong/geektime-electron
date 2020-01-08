# nvm安装
```
Mac/Linux: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
Windows: https://github.com/coreybutler/nvm-windows/releasesa
验证nvm: nvm --versiona
```


# Node.js/NPM 安装
```
安装 Node.js: nvm install 12.14.0 
切换 Node.js 版本:nvm use 12.14.0
验证 npm -v
验证 node -v
```

# node安装加速机器
```
// mac 在 .bashrc 或者 .zshrc 加入
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node

// Windows 在 %userprofile%\AppData\Roaming\nvm\setting.txt 加入
node_mirror: https://npm.taobao.org/mirrors/node/ npm_mirror: https://npm.taobao.org/mirrors/npm/
```

# Electron 安装
```
npm install electron --save-dev
npm install --arch=ia32 --platform=win32 electron 

// 验证安装成功:
npx electron -v (npm > 5.2)
./node_modules/.bin/electron -v 
```

# Electron加速技巧
```
# 设置ELECTRON_MIRROR
ELECTRON_MIRROR=https://cdn.npm.taobao.org/dist/electron/ npm install electron --save- dev
```
