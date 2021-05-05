<template>
    <div>
        <!-- 排行榜
        http://127.0.0.1:3000/toplist
        http://127.0.0.1:3000/playlist/detail?id=19723756 -->
        <div class="toplist">
            <div class="item" v-for="(item,index) in toplists" :key="index">
                <router-link :to="'/rank/ranklist?id='+item.id">
                    <div class="img">
                        <img :src="item.coverImgUrl" alt="">
                    </div>
                    <ul>
                        <li v-for="(key,i) in item.getTopListsDetail" :key="i">
                            {{i + 1}}.  {{key.name}} -- {{key.ar[0].name}}
                        </li>
                    </ul>

                </router-link>
            </div>
        </div>



    </div>
</template>

<script>
import {getTopLists,getTopListsDetail} from "../api/rank";
export default {
    data() {
        return {
            toplists: "",
        }
    },
    // 组件路由最早钩子 
    beforeRouteEnter (to, from, next) {
        // 获取分类数据
        getTopLists({limit:10}).then(data=>{
            // next();//跳转路由
            // vm.getTopListsDetailFun() 指定methods静态方法
            next(vm => vm.getTopListsDetailFun(data.list))
        })
    },
    methods:{
        getTopListsDetailFun(toplistsData){
            // console.log(toplistsData);
            this.toplists = toplistsData;

            for(let item in toplistsData){
                // 分类二级数据--分类歌曲
                getTopListsDetail({id:toplistsData[item].id}).then(data=>{
                    // console.log("getTopListsDetail",data.playlist.tracks.slice(0,3));
                    if(data.playlist.tracks.length ){
                        // this.toplists[item].getTopListsDetail = data.playlist.tracks.slice(0,3);
                        // this.$set(object, propertyName, value)
                        // $set()直接修改view 视图中数据 赋值对象使用
                        this.$set(this.toplists[item], "getTopListsDetail", data.playlist.tracks.slice(0,3))
                    }

                    // 获取当前分类，三个歌手信息
                })

            }

            
        },
        add(){
            console.log(this.toplists);
        }
    },

    created(){
    }
}
</script>


<style lang="less" >
 .toplist{
     padding:0.234375rem;
     .item{
         padding:0.0625rem 0rem;
         border-bottom: 0.03125rem solid #E3E4E4;
         a{
             display: flex;
             .img{
                 flex: 0 0 2.40625rem;
                 height: 2.40625rem;
                 background-color: coral;
                 img{
                     width: 100%;
                }
            }
             ul{
                 padding-top: 0.15625rem;
                 flex: 1;
                 li{
                     font-size: 0.3125rem;
                     color:#030006;
                     line-height: 0.71875rem;
                     text-indent: 0.46875rem;
                }
            }
        }
    }
}


</style>