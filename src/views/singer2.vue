<template>
    <div>
        <!-- 歌手
        http://127.0.0.1:3000/top/artists?limit=100 -->
        <div class="artists">
            <ul class="rightList">
                <li v-for="(item,index) in rightList" :key="index" @click="selectclick(index,$event)">{{item}}</li>
            </ul>

            <div class="content" ref="lefts">
                <div class="ul">
                    <dl v-for="(item,index) in artistsList" :key="index">
                        <dt>{{item.name}}</dt>
                        <dd v-for="(data,i) in item.data" :key="i">
                            <div class="img">
                                <img :src="data.picUrl" alt="">
                            </div>
                            <p>{{data.name}}</p>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import {getArtistLists,getTopArtistLists} from "../api/singer";

export default {
    data() {
        return {
            rightList:["热","A","B","C","D","E","F","G"],
            // artistsList: {
            //     // "A":[]
            // },
            artistsList:[
                // {
                //     name:"A",
                //     data:[]
                // }
            ],
        }
    },

    methods:{
        _initScroll(){
                // 左侧滚动效果初始化
                console.log("22222");
                this.lefts = new BScroll(this.$refs.lefts,{
                    click:true, //点击触发
                    probeType:3, // 深针的效果，时时获取滚动高度
                })

            },
        getTopArtistListsFun(){
            getTopArtistLists({limit:10}).then(data=>{
                // console.log(data);
                this.artistsList.unshift({
                    name:"热",
                    data:data.artists
                })
            })
        },
        getArtistListsFun(){
            for(let key in this.artistsList){
                getArtistLists({type:1,area:96,initial:this.artistsList[key].name,limit:10}).then(data=>{
                    // console.log(data);
                    // this.artistsList[key] = data.artists
                    this.$set(this.artistsList[key],"data",data.artists);
                    // Object.assign(this.artistsList[key],data.artists)
                })
            }
            console.log("----",this.artistsList);
            
        },
        // 初始化对象
        artistsListFun(){
            for(let i = 1;i < this.rightList.length;i++){
                this.artistsList.push({
                    name:this.rightList[i]
                })
            }
            // console.log("----",this.artistsList);
        },
        selectclick(index,event){
            console.log(index);
            // better-scroll 派发事件的event和普通浏览器的点击是啊见event有区别_constructed
            // 浏览器原生点击事件没有_constructed所有浏览器监听到属性return掉
            if(!event._constructed){
                return;
            }else{
                // 获取右侧所有li对象
                let leftItems = this.$refs.left.getElementsByTagName("dl");
                let el = leftItems[index]; //与左侧对象右侧位置对象
                // 插件内置方法 scrollToElement(DOM,过度时间)
                this.lefts.scrollToElement(el,300);

            }
        }
    },
    created(){
        this.artistsListFun(); //数据列表结构
        this.getArtistListsFun();
        this.getTopArtistListsFun();
    },
    mounted() {
        // $nextTick()保证生命周期与视图数据执行完成后，再调用第三方js库
        this.$nextTick(()=>{
            this._initScroll()
        })
    },
};
</script>

<style lang="less">
    .artists{
        position:absolute;
        left:0px;
        right:0px;
        top:136px;
        bottom:100px;
        margin: auto;
        overflow: hidden;
        .rightList{
            position: absolute;
            right: 10px;
            top:30px;
            font-size: 18px;
            color:#636365;
            text-align: center;
            z-index: 999;
            li{
                margin-bottom: 3px;
            }
        }
        .content{
            dl{
                padding: 10px 10px 0 10px;
                background-color: #F2F3F4;
                dt{
                    height: 32px;
                    line-height: 32px;
                    background-color: #DADBDC;
                    color:#fff;
                    text-indent: 15px;
                    font-size: 18px;
                }
                dd{
                    border-bottom: 1px solid #E1E2E3;
                    padding:4px 0px;
                    display: flex;
                    .img{
                        flex: 0 0 78px;
                        height: 78px;
                        img{
                            width: 100%;
                        }
                    }
                    p{
                        height: 78px;
                        line-height: 78px;
                        font-size: 24px;
                        color:#2E2E35;
                        text-indent: 2em;
                    }
                }
            }
        }
        
    }
</style>