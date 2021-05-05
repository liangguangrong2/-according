<template>
    <div>
        <div class="header">
            <div class="left iconfont icon-user" @click="$router.push('/userInfo')">
            </div>
            <div class="center">
                MUSIC-VUE
            </div>
            <div class="right iconfont icon-search">
            </div>
        </div>

        <div class="navs">
            <router-link to="/recommend" class="item" tag="div"><span>推荐</span> </router-link>
            <router-link to="/rank" class="item" tag="div"><span>排行</span> </router-link>
            <router-link to="/singer" class="item" tag="div"><span>歌手</span> </router-link>
            <router-link to="/newmv" class="item" tag="div"><span>MV</span> </router-link>
        </div>
    </div>
</template>

<style lang="less">
.header{
     height: .984375rem;
     display: flex;
     background-color: #D4473C;
     color:#fff;
     text-align: center;
     .left{
         flex: 0 0 1.0625rem;
         font-size: .46875rem;
         line-height: .984375rem;
    }
     .center{
         flex: 1;
         line-height: .984375rem;
         font-size: .375rem;
    }
     .right{
         flex: 0 0 1.0625rem;
         font-size: .46875rem;
         line-height: .984375rem;
    }
}
 .navs{
     display: flex;
     color:#fff;
     background-color: #D4473C;
     .item{
         font-size: 0.34375rem;
         height: 1.140625rem;
         flex: 1;
         text-align: center;
         span{
             margin-top: .359375rem;
             height: .515625rem;
             line-height: .515625rem;
             display: inline-block;
             border-bottom: 0.03125rem solid transparent;
        }
         &.router-link-active span{
             font-weight: bold;
             border-color: #fff;
        }
    }
}
 
</style>