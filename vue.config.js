
const defaultSettings = require('./src/settings.js');
const name = defaultSettings.title || 'Boom'; // page title


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

        }
    },
    devServer: {

        host: '0.0.0.0',
        //devServer监听的端口
        port: 8080,
        https: false,
        hotOnly: false,
        //配置代理
        proxy: {
            //拦截的url
            '/api':{
                //转发到目标服务器的url
                target: "http://39.100.122.207:8901",
                //是否代理websockets,可选
                ws: true,
                secure: false,
                //是否修改Host头部，可选
                changeOrigin: true,
                //修改请求路径
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
