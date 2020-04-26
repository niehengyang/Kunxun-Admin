
const defaultSettings = require('./src/settings.js');
const name = defaultSettings.title || 'little boy'; // page title
// const name = defaultSettings.title || 'vue Element Admin'; // page title
const path = require('path');

module.exports = {

    //防止eslint乱报错
    lintOnSave: false, // 关闭eslint
    runtimeCompiler: true,
    publicPath: '/',

    // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
    outputDir: 'dist',

    // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: '',

    // 默认在生成的静态资源文件名中包含hash以控制缓存
    filenameHashing: true,

    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '~css': path.resolve('./src/assets/css')
            }
        }
    },
    devServer: {
        //devServer监听的端口
        port: 8080,
        https: false,
        //配置代理
        proxy: {
            //拦截的url
            '/api':{
                //转发到目标服务器的url
                target: "http://192.168.10.10:9501/",
                //是否代理websockets,可选
                ws: true,
                //是否修改Host头部，可选
                changeOrigin: true,
                //修改请求路径
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import '~css/app.css';`
            }
        }
    }
};
