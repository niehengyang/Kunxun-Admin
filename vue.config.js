
const defaultSettings = require('./src/settings.js');
const name = defaultSettings.title || 'vue Element Admin'; // page title

module.exports = {

    //防止eslint乱报错
    lintOnSave: false, // 关闭eslint
    runtimeCompiler: true,
    publicPath: '/',
    outputDir: 'dist',
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {

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
    }
};
