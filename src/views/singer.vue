<template>
    <div>
        <div class="singer">
            <com-scroll :right="artistsList" :left="rightList" ></com-scroll>
        </div>
    </div>
</template>
<script>
import comScroll from "../components/base/BScroll";
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
    },
    
    created(){
        this.artistsListFun(); //数据列表结构
        this.getArtistListsFun();
        this.getTopArtistListsFun();
    },
    components:{
        comScroll
    }
}
</script>

<style lang="less">
    .singer{
        position:absolute;
        left:0px;
        right:0px;
        top:2.125rem;
        bottom:0px;
        margin: auto;
        overflow: hidden;
        background-color: chocolate;
    }
</style>

