import request  from "./http";


// 排行榜
export function getTopLists(params){
    return request({
        url:"/toplist",
        method:"get",
        params
    })
}



// 排行榜 - 歌曲
// /playlist/detail?id=19723756
export function getTopListsDetail(params){
    return request({
        url:"/playlist/detail",
        method:"get",
        params
    })
}

