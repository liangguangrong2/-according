import request  from "./http";


// 获取广告图
export function getBanner(){
    return request({
        url:"/banner?type=2",
        method:"get",
    })
}

// 推荐歌单
export function getPersonalized(params){
    return request({
        url:"/personalized",
        method:"get",
        params
    })
}


// 推荐歌单--详情
export function getDetail(params){
    return request({
        url:"playlist/detail",
        method:"get",
        params
    })
}