module.exports = {
    devServer:{
        proxy:{
            "/":{
                target:"http://192.168.54.3:3000",  //设置结构域名ip端口
                changeOrigin:true,
            }
        }
    }
}