module.exports = {
    lintOnSave: false,
    devServer: {
        port: 5000,
        proxy: {
            '/api': {
                target: "http://kumanxuan1.f3322.net:8001/",
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    css: {
        sourceMap: true,
        loaderOptions: {
            // postcss: {
            //     plugins: [
            //         // 设计稿宽度的1/10，一般为75
            //         require('postcss-px2rem')({ remUnit: 75 }),
            //     ]
            // }
        }
    }
}