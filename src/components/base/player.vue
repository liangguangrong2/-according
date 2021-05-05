<template>
  <div>
    <!-- 播放器 -->
    <div class="player" v-if="showplayer">
      <div class="button" @click="showplayerFun(false)">
        <span class="iconfont icon-arrow-down-bold"></span>
      </div>
      <div class="title">
        <h2>{{ musicData.name }}</h2>
        <h3>
          <span
            v-for="(item, index) in musicData.ar"
            :key="index"
            v-show="index < 3"
            >{{ item.name }}1122111</span
          >
        </h3>
      </div>

      <div class="content clearfix" @click="togglelyric = !togglelyric">
        <div
          v-show="togglelyric == true"
          :class="['img', 'play', { pause: iconplay }]"
        >
          <img :src="musicData.coverImgUrl" alt="" />
        </div>

        <div v-show="togglelyric != true" class="lyrics">
          <ul :style="{ top: lyricTop }">
            <li
              v-for="(item, index) in lyric"
              :class="{ con: currentRow === index }"
              :key="index"
            >
              {{ item.text }}
            </li>
          </ul>
        </div>
      </div>

      <div class="range">
        <div class="bar">
          <span class="timeLeft">{{ timeleft | playertime }}</span>
          <van-slider
            v-model="value"
            @change="sliderchange"
            bar-height="5px"
            active-color="#D4483D"
          >
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
          <span class="timeRight">{{ timeright | playertime }}</span>
        </div>
      </div>

      <div class="buttons">
        <div
          v-if="playerType == 1"
          class="iconfont icon-liebiaobofang1"
          @click="changeMode"
        >
          列表循环
        </div>
        <div v-else class="iconfont icon-user" @click.stop="changeMode"></div>

        <div class="iconfont icon-shangyiqu-wangyiicon" @click="startup"></div>
        <div class="iconbutton" @click.stop="toggleplay">
          <!-- 1111 -->
          <span v-if="iconplay" class="iconfont icon-bofang"></span>
          <span v-else class="iconfont icon-04"></span>
        </div>
        <div class="iconfont icon-shangyiqu" @click="lowerFun"></div>
        <div class="iconfont icon-shoucang"></div>
      </div>
    </div>

    <!-- 迷你版播放器 -->
    <div class="mini-player" v-if="musicData.coverImgUrl">
      <div class="img" @click="showplayerFun(true)">
        <img
          :class="['play', { pause: iconplay }]"
          :src="musicData.coverImgUrl"
          alt=""
        />
      </div>
      <div class="text">
        <h2>{{ musicData.name }}</h2>
        <h3>
          <span
            v-for="(item, index) in musicData.ar"
            :key="index"
            v-show="index < 3"
            >{{ item.name }}</span
          >
        </h3>
      </div>
      <div class="control" @click.stop="toggleplay">
        <span v-if="iconplay" class="iconfont icon-bofang"></span>
        <span v-else class="iconfont icon-zantingtingzhi"></span>
      </div>
    </div>

    <audio
      ref="audio"
      controls
      hidden
      :src="musicData.url"
      @canplay="canplayFun"
      @ended="endedFun"
    ></audio>
  </div>
</template>

<script>
import { getSongUrl, getSongLyric } from "../../api/base";
export default {
  data() {
    return {
      iconplay: true,
      // musicData: {},
      showplayer: false,
      value: 0,
      timeleft: 0,
      timeright: 0,
      clearset: null,
      playerType: 1, //1 列表播放  2 随机播放
      lyric: [], //歌词对象
      currentRow: 0,
      lyricTop: "300px",
      togglelyric: true
    };
  },
  watch: {
    musicData: {
      handler: function() {
        getSongUrl({ id: this.musicData.id }).then(data => {
          this.iconplay = true;
          this.$set(this.musicData, "url", data.data[0].url);
          // 计算事件
        });
        // 调用歌词
        this.getSongLyricFun();
      },
      deep: true
    },
    timeleft: function() {
      for (let i = 0; i < this.lyric.length; i++) {
        if (parseInt(this.timeleft) == this.lyric[i].time) {
          this.currentRow = i; //文字选中切换
          this.lyricTop = 300 - i * 50 + "px";
          break;
        }
      }
    }
  },
  methods: {
    toggleplay() {
      if (this.iconplay) {
        this.$refs.audio.play(); //播放
        clearInterval(this.clearset); //清除定时器
        // 设置定时器
        this.clearset = setInterval(() => {
          let currentTime = this.$refs.audio.currentTime;
          let duration = this.$refs.audio.duration;
          this.timeleft = currentTime;
          // 计算滑块位置
          this.value = (currentTime / duration) * 100;

          if (this.value == 100) {
            clearInterval(this.clearset);
            this.$refs.audio.pause(); //暂停
          }
        }, 999);
      } else {
        this.$refs.audio.pause(); //暂停
        clearInterval(this.clearset); //清除定时器
      }
      // 按钮切换
      this.iconplay = !this.iconplay;
    },
    showplayerFun(bol) {
      this.showplayer = bol;
    },
    // 进度条
    sliderchange() {
      let duration = (this.$refs.audio.duration * this.value) / 100;
      this.timeleft = duration; //百分比
      this.$refs.audio.currentTime = duration; //修改时间
    },
    // 上一曲
    startup() {
      let { id, tracks } = this.musicData;
      // 返回数组下标
      let index = tracks.findIndex(item => {
        return item.id == id;
      });
      index = index - 1 < 0 ? tracks.length - 1 : index - 1;
      this.$set(this.musicData, "id", tracks[index].id);
      this.$set(this.musicData, "name", tracks[index].name);
      this.$set(this.musicData, "ar", tracks[index].ar);
    },
    // 下一曲
    lowerFun() {
      let { id, tracks } = this.musicData;
      // 返回数组下标
      let index = tracks.findIndex(item => {
        return item.id == id;
      });
      index = index + 1 > tracks.length - 1 ? 0 : index + 1;
      this.$set(this.musicData, "id", tracks[index].id);
      this.$set(this.musicData, "name", tracks[index].name);
      this.$set(this.musicData, "ar", tracks[index].ar);
    },
    // 音乐加载完后调用
    canplayFun() {
      this.timeright = this.$refs.audio.duration;
      // this.timeleft = 0;
      this.iconplay = true; //播放
      this.toggleplay();
    },
    // 获取歌词
    getSongLyricFun() {
      this.lyricTop = "300px";
      this.currentRow = 0;
      getSongLyric({ id: this.musicData.id }).then(data => {
        this.formatLyric(data.lrc.lyric);
      });
    },
    // 处理歌词结构
    formatLyric(text) {
      this.lyric = [];

      let arr = text.split("\n"); //把原歌曲字符串转数组
      let row = arr.length; //获取数组长度
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //获取数据"[00:00.000] 作词 : G.E.M.邓紫棋"
        let temp_arr = temp_row.split("]"); //分成两个数组
        // [00:00.000      作词 : G.E.M.邓紫棋
        let text = temp_arr.pop(); //删除数组最后以为，返回删除数据

        temp_arr.forEach(element => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":"); //02:00.000 获取时间数据
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //得到当前秒数
          obj.time = s;
          obj.text = text;
          if (text.length > 0) {
            this.lyric.push(obj); //每一行处理好数据放入数组
          }
        });
      }
    },
    // 音乐播放结束
    endedFun() {
      this.iconplay = true;
      this.$refs.audio.play(); //播放
      clearInterval(this.clearset); //清除定时器
      if (this.playerType == 1) {
        //列表播放
        this.lowerFun();
        this.iconplay = false;
      } else {
        //随机播放
        let num = parseInt(Math.random() * this.musicData.tracks.length);

        let { tracks } = this.musicData;
        this.$set(this.musicData, "id", tracks[num].id);
        this.$set(this.musicData, "name", tracks[num].name);
        this.$set(this.musicData, "ar", tracks[num].ar);
      }
    },
    // 修改类型
    changeMode() {
      this.playerType = this.playerType == 1 ? 2 : 1;
    }
  },
  computed: {
    musicData() {
      return this.$store.state.musicData;
    }
  },
  created() {
    // 获取数据
    // window.addEventListener("setItem",()=>{
    //     this.musicData = this.resetSetItem.fetch();
    // })
  },
  filters: {
    playertime(data) {
      let m = parseInt(data / 60); //分钟
      let s = parseInt(data % 60); //秒
      s = s < 10 ? "0" + s : s;
      if (m == 0 && s == 0) {
        return "0:00";
      } else {
        return m + ":" + s;
      }
    }
  },
  beforeDestroy() {
    // 销毁清除定时器
    clearInterval(this.clearset); //清除定时器
  }
};
</script>

<style lang="less" scoped>
.player {
  overflow: hidden;
  position: fixed;
  top: 0px;
  bottom: 0px;
  width: 640px;
  height: 100%;
  margin: auto;
  background: #837f7d;
  z-index: 500;
  .button {
    position: absolute;
    top: 23px;
    left: 23px;
    font-size: 34px;
    width: 34px;
    height: 34px;
    span {
      display: block;
      font-size: 34px;
      height: 34px;
      line-height: 34px;
      color: #fff;
      font-weight: bold;
    }
  }
  .title {
    text-align: center;
    color: #fff;
    h2 {
      font-size: 32px;
      margin-top: 4px;
    }
    h3 {
      font-size: 28px;
    }
  }
  .content {
    height: 666px;
    text-align: center;
    .img {
      float: left;
      width: 100%;
      margin-top: 86px;
      img {
        display: block;
        width: 468px;
        height: 468px;
        border: 24px solid #878381;
        border-radius: 50%;
        background-color: #fff;
        margin: 0 auto;
      }

      &.play {
        animation: rotate 20s linear infinite;
      }
      &.pause {
        animation-play-state: paused;
      }
    }
    .lyrics {
      width: 100%;
      height: 666px;
      position: relative;
      overflow: hidden;
      ul {
        position: absolute;
        width: 100%;
        min-height: 1000px;
        top: 300px;
        left: 0px;
        li {
          width: 100%;
          color: #4f4b49;
          text-align: center;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          &.con {
            color: #fff;
            font-size: 22px;
          }
        }
      }
    }
  }
  .range {
    text-align: center;
    height: 20px;
    .bar {
      width: 420px;
      margin: 0 auto;
      position: relative;
      font-size: 18px;
      color: #fff;
      .timeLeft {
        position: absolute;
        left: -44px;
        top: -7px;
      }
      .timeRight {
        position: absolute;
        right: -44px;
        top: -7px;
      }
    }
  }
  .buttons {
    display: flex;
    margin-top: 33px;
    .iconfont {
      flex: 1;
      text-align: center;
      font-size: 34px;
      color: #fff;
      height: 66px;
      line-height: 66px;
    }
    .iconbutton {
      flex: 1;
      text-align: center;
      color: #fff;
      height: 66px;
      .iconfont {
        display: block;
        border: 5px solid #fff;
        font-size: 20px;
        height: 55px;
        width: 55px;
        line-height: 55px;
        margin: 0 auto;
        border-radius: 50%;
      }
    }
  }
}

.mini-player {
  position: fixed;
  left: 0px;
  bottom: 0px;
  height: 91px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  .img {
    flex: 0 0 109px;
    img {
      width: 63px;
      height: 63px;
      margin: 13px 0 0 30px;
      border-radius: 50%;
      &.play {
        animation: rotate 20s linear infinite;
      }
      &.pause {
        animation-play-state: paused;
      }
    }
  }
  .text {
    flex: 1;
    h2 {
      margin-top: 20px;
      font-size: 22px;
      color: #3a3c3e;
    }
    h3 {
      font-size: 18px;
      color: #3a3c3e;
    }
  }
  .control {
    flex: 0 0 50px;
    margin: 20px 20px 0 0;
    span {
      display: block;
      font-size: 20px;
      width: 42px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      border: 4px solid #646565;
      color: #646565;
      border-radius: 50%;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.custom-button {
  width: 5px;
  height: 5px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 50%;
  border: 8px solid #fff;
}
</style>
