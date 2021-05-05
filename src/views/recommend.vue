<template>
    <div>
        <div class="banner">
            <div class="imgs">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="(item,index) in banners" :key="index">
                        <img :src="item.pic" alt="">
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <div class="remLists">
            <div class="title">
                推荐
            </div>
            <div class="content">
                <van-row gutter="5">
                    <van-col class="li" span="8" v-for="(item,index) in personalized" :key="index" @click="goMusiclist(item.id)">
                        <img :src="item.picUrl" alt="">
                        <span class="remd_lnum">{{item.playCount | playCountA}}</span>
                        <p>{{item.name}}</p>
                    </van-col>
                </van-row>
            </div>
        </div>

        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
</template>


<script>
import {getBanner,getPersonalized} from "../api/recommend"; 
export default {
    data() {
        return {
            banners: "",
            personalized:"",
        }
    },
    methods:{
        getBannerFun(){
            // 请求数据
            getBanner().then(data=>{
                if(data.code == 200){
                    this.banners = data.banners;
                }
                console.log(data);
            })
        },
        getPersonalizedFun(){
            // 请求数据
            getPersonalized({limit:9}).then(data=>{
                console.log(data);

                this.personalized = data.result;
            })
        },
        goMusiclist(id){
            console.log(id);
            this.$router.push({
                path:"/recommend/musiclist",
                query:{id}
            })
        }
    },
    created(){
        this.getBannerFun();
        this.getPersonalizedFun();
    },
    filters:{
        playCountA(value){
            let w = value > 10000 ? value/10000 : value;// 万计算
            let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万"; //亿计算
            return y;
        }
    }
}
</script>


<style lang="less" >
    .banner{
        height: 228px;
        background-color: #D4473C;
        width: 100%;
        position: relative;
        // margin-bottom: 55px;
        .imgs{
            min-height: 228px;
            position: absolute;
            left:0px;
            right:0px;
            top:0px;
            margin:auto;
            width: 96%;
            background-color: #D4473C;
            border-radius: 5px;
            img{
                width: 100%;
            }
        }
    }
    .remLists{
        .title{
            font-size: .34375rem;
            height: 100px;
            line-height: 100px;
            font-weight: bold;
            text-indent: 0.5em;
        }
        .content .li{
            width: 33.33%;
            float: left;
            position: relative;
            margin-bottom: 16px;
            img{
                display: block;
                width: 100%;
                height: 200px;
                margin:0 auto;
                border-radius: 3px;
            }
            p{
                font-size: .28125rem;
                color:#2F3035;
                height: .78125rem;
                overflow: hidden;
                line-height: .4375rem;
                padding: .15625rem .109375rem;    
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .remd_lnum{
                position: absolute;
                top:0px;
                right: 20px;
                font-size: .234375rem;
                color:#fff;
            }
        }
    }

    
</style>