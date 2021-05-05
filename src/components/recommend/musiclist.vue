<template>
    <div>
        <div class="topheader">
            <div class="img">
                <img :src="playlist.coverImgUrl" alt="">
            </div>
            <div class="title">
                {{playlist.name}}
            </div>
            <div class="button" @click="$router.go(-1)">
                <span class="iconfont icon-arrow-left-bold"></span>
                歌单
            </div>
        </div>

        <dl class="musiclist">
            <dt>
                播放全部 <span>(共{{playlist.tracks.length}}首)</span>
            </dt>
            <dd v-for="(item,index) in playlist.tracks" :key="index" @click="playmusic(item.id,item.name,item.ar)">
                <h1>{{index+1}}</h1>
                <div class="info">
                    <h2>{{item.name}}</h2>
                    <h3>
                        <span v-for="(key,index) in item.ar" :key="index" >{{key.name}} &nbsp;&nbsp;</span>
                    </h3>
                </div>
            </dd>
        </dl>

    </div>
</template>

<script>
import {getDetail} from "../../api/recommend";
export default {
    data() {
        return {
            playlist:{
                tracks:[]
            }
        }
    },
    methods:{
        getDetailFun(){
            let id = this.$route.query.id;
            if(!id){
                return ;
            }
            getDetail({id:id}).then(data=>{
                console.log(data);
                this.playlist = data.playlist;
            })
        },
        playmusic(id,name,ar){
            let playMusicData = {
                coverImgUrl:this.playlist.coverImgUrl,
                id,
                name,
                ar,
                tracks:this.playlist.tracks
            }
            // 数据存存储
            // this.resetSetItem.save(playMusicData);
            this.$store.commit("musicDatafun",playMusicData);
        }
    },
    created(){
        this.getDetailFun();
    }
}
</script>

<style lang="less">
    .musiclist{
        border-radius: 12px;
        background-color: #fff;
        position: relative;
        top:-12px;
        min-height: 200px;
        dt{
            height: 61px;
            line-height: 61px;
            border-bottom:1px solid #E2E2E2;
            font-size: 25px;
            color:#131615;
            text-indent: 1em;
            span{
                font-size: 23px;
                color:#616262;
            }
        }
        dd{
            height: 91px;
            border-bottom:1px solid #E2E2E2;
            display: flex;
            h1{
                flex: 0 0 78px;
                line-height: 91px;
                text-align: center;
                font-size: 28px;
                color:#707271;
                font-weight: normal;
            }
            .info{
                flex:1;
                h2{
                    font-size: 25px;
                    color:#3A3C3C;
                    margin-top: 18px;
                    font-weight: normal;
                }
                h3{
                    font-size: 20px;
                    color:#777978;
                    font-weight: normal;
                }
            }
        }
    }
    .topheader{
        width: 100%;
        height: 463px;
        position: relative;
        .img{
            width: 100%;
            height: 463px;
            img{
                width: 100%;
            }
            background-color: aqua;
        }
        .title{
            position: absolute;
            left:32px;
            bottom: 42px;
            font-size: 32px;
            font-weight: bold;
            color:#fff;
            height: 38px;
            overflow: hidden;
        }
        .button{
            position: absolute;
            color:#fff;
            left:32px;
            top:26px;
            height: 40px;
            line-height: 40px;
            font-size: 35px;
            span{
                display: inline-block;
                font-size: 40px;
                vertical-align: top;
            }
        }
    }
</style>