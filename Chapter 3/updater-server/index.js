const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const serve = require('koa-static-server')
const router = new Router()
const compareVersions = require('compare-versions')
const multer = require('koa-multer')
const uploadCrash = multer({dest: 'crash/'})
router.post('/crash', uploadCrash.single('upload_file_minidump'), (ctx, next) => {
    console.log(ctx.req.body)
    // 存DB
})
function getNewVersion(version) {
    if(!version) return null
    let maxVersion = {
        name: '1.0.1',
        pub_date: '2020-02-01T12:26:53+1:00',
        notes: '新增功能AAA',
        url: `http://127.0.0.1:33855/public/Mercurius-1.0.1-mac.zip`
    }
    if(compareVersions.compare(maxVersion.name , version, '>')) {
        return maxVersion
    }
    return null
}
router.get('/win32/RELEASES', (ctx, next) => {
    let newVersion = getNewVersion(ctx.query.version)
    if(newVersion) {
        ctx.body='BBC6F98A5CD32C675AAB6737A5F67176248B900C Mercurius-1.0.1-full.nupkg 62177782'
    } else {
        ctx.status = 204
    }
})
router.get('/win32/*.nupkg', (ctx, next) => {
    // redirect s3 静态文件服务
    ctx.redirect(`/public/${ctx.params[0]}.nupkg`)
})
router.get('/darwin', (ctx, next) => {
   // 处理Mac更新, ?version=1.0.0&uid=123
   let {version} = ctx.query
    let newVersion = getNewVersion(version)
    if(newVersion) {
        ctx.body = newVersion
    } else {
        ctx.status = 204
    }
})
app.use(serve({rootDir: 'public', rootPath: '/public'}))
app.use(router.routes())
    .use(router.allowedMethods())

app.listen(33855)
