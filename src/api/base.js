import request from "./http";


// 获取url
export function getSongUrl(params) {
    return request({
        url: "song/url",
        method: "get",
        params
    })
}


// 获取歌词
export function getSongLyric(params) {
    return request({
        url: "lyric",
        method: "get",
        params
    })
}

// 获取验证码

export function getCaptcha(params) {
    return request({
        url: "captcha/sent",
        method: "get",
        params
    })
}

// 账号密码登录
export function pass(phone, pass) {
    return request({
        url: `/login/cellphone?phone=${phone}&password=${pass}`,
        method: "get",

    })
}