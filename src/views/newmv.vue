<template>
    <div>
        
        <div class="mvlists" ref="mvlists">
            <ul>
                <li class="" v-for="(item,index) in mvlists" :key="index">
                    <div class="imgs" :style="{'background-image':'url('+item.cover+')'}" v-show="playNum != index" @click="getUrlShow(index,item.id)" >
                        <span class="iconfont icon-bofang"></span>
                    </div>
                    <div class="imgs" v-if="playNum == index" @click="mvplayend">
                        <video id="video1" :ref="'video'+index"  @canplaythrough="canplayfun" :src="item.mvurl" preload="metadata" >
                        </video>
                    </div>
                    <p>
                        {{item.name}}
                    </p>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import {getMvlist,getMvUrl} from "../api/mv";
export default {
    data() {
        return {
            mvlists: [],
            offset:0,//页码
            flag:true,
            playNum:null,  //对应播放视频下标
        }
    },
    methods:{
        getMvlistFun(){
            getMvlist({limit:5,offset:this.offset}).then(data=>{
                this.mvlists = data.data;
            })
        },
        add(){
            // 防抖: 阻止用户多次请求服务器
            if(this.flag){
                this.flag = false;
                this.offset += 5;
                getMvlist({limit:5,offset:this.offset}).then(data=>{
                    this.mvlists = this.mvlists.concat(data.data);
                    this.flag = true;
                })
            }
        },
        handleScroll(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; //滚动条偏移量
            let lis = this.$refs.mvlists.getElementsByTagName("li");
            let num = lis.length;
            let liHeight = lis[num-3].offsetTop;
            if(scrollTop > liHeight){ //触发加载数据
                this.add();
            }
        },
        getUrlShow(index,id){
            this.playNum = index
            getMvUrl({id}).then(data=>{
                this.$set(this.mvlists[index],"mvurl",data.data.url);
            })
        },
        mvplayend(){
            // event.target.pause();
            
            this.$refs['video'+this.playNum][0].pause()
            this.playNum = null;
            
        },
        canplayfun(event){
            
            console.log("播放吧")
            event.target.play();
        }
    },

    created(){
        this.getMvlistFun();
    },
    mounted(){
        this.$nextTick(()=>{
            // 监听滚动事件
            window.addEventListener("scroll",this.handleScroll)

        })
    },
    beforeDestroy(){
        // this.$refs[this.playNum].pause();
        // this.playNum = null;
    }
}
</script>

<style lang="less">
    .mvlists{
        width: 100%;
        li{
            margin-bottom:10px ;
            .imgs{
                width: 100%;
                height: 300px;
                // background-color: yellow;
                background-repeat: no-repeat;
                background-size: cover;
                position: relative;
                span{
                    position: absolute;
                    top:0px;
                    left:0px;
                    right:0px;
                    bottom:0px;
                    margin:auto;
                    width: 80px;
                    height: 80px;
                    text-align: center;
                    line-height: 80px;
                    color:#fff;
                    font-size: 32px;
                    background: rgba(0, 0, 0,0.5);
                    border-radius: 50%;
                }
                video{
                    height: 300px;
                    margin: 0 auto;
                    display: block;
                }
            }
            p{
                font-size: 24px;
                text-indent: 1em;
                height: 40px;
                line-height: 40px;
                overflow: hidden;
            }
        }
    }
</style>