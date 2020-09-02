<template>
  <div id="detailContrainer" :key="id" class="slide-enter-active">
    <Header title="影片详情">
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
    <Loading v-if="isLoading" />
    <div id="content" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="img" alt />
          </div>
          <div class="detail_list_info">
            <h2>{{name}}</h2>
            <p>{{enname}}</p>
            <p>{{score}}</p>
            <p>{{cat}}</p>
            <p>中国大陆 / {{showTime.split("/")[1]}}</p>
            <p>{{showTime.split("/")[0].replace("中国", '')}}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p class="intro_title">简介</p>
        <p class="intro_content">{{intro}}</p>
      </div>
      <div class="detail_player swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(actor, index) in actorList" :key="index">
            <div>
              <img :src="actor.avatar.replace('w.h', '100.100')" alt />
            </div>
            <p>{{actor.cnm}}</p>
            <p>{{actor.desc}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "Detail",
  components: {
    Header,
  },
  data() {
    return {
      img: "",
      name: "",
      enname: "",
      score: "",
      cat: "",
      showTime: "",
      intro: "",
      actorList: [],
      isLoading: true,
    };
  },
  props: ["id"],
  methods: {
    handleToBack() {
      this.$router.back();
    },
    getMovieInfo() {
      this.axios.get(`/asgard/movie/${this.id}`).then((res) => {
        var parser = new DOMParser();
        var data = parser.parseFromString(res.data, "text/html");
        this.parserHtml(data);
        this.isLoading = false;
        this.$nextTick(() => {
          new Swiper(".detail_player", {
            slidesPerView: "auto",
            slidesPerView: 3,
            freeMode: true,
            freeModeSticky: true,
          });
        });
      });
    },
    parserHtml(data) {
      this.img = data.getElementsByClassName("img noneBg poster")[0].src;
      this.name = data.querySelector(".movie-cn-name > h1").innerHTML;
      var ennameSpan = data.querySelector(".movie-en-name");
      this.cat = ennameSpan ? ennameSpan.innerHTML : "";
      var scoreSpan = data.querySelector("span.score");
      this.score = scoreSpan ? scoreSpan.innerHTML : "";
      this.cat = data.querySelector("span.movie-cat").innerHTML;
      this.showTime = data.querySelector(".movie-show-time > span").innerText;
      this.intro = data.getElementById("brief-introduction-content").innerHTML;
      var script = data.getElementsByTagName("script");
      this.findScript(script);
    },
    findScript(script) {
      for (var i = 0; i < script.length; i++) {
        if (script[i].innerHTML.indexOf("var AppData") > -1) {
          var data = script[i].innerHTML.replace("var AppData = ", "").trim();
          var result = JSON.parse(data.substring(0, data.length - 1));
          this.actorList = result.celebrities.slice(0, 30);
          return;
        }
      }
    },
  },
  mounted() {
    this.getMovieInfo();
  },
};
</script>

<style scoped>
#detailContrainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background: white;
}
#detailContrainer.slide-enter-active {
  animation: 0.5s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
#detailContrainer .contentDetail {
  display: block;
  margin-bottom: 0;
}
#detailContrainer .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: url(/images/movie_1.jpg) 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
.detail_intro {
  padding: 16px;
}
.detail_intro .intro_title {
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 18px;
}
.detail_intro .intro_content {
  font-size: 12px;
  line-height: 18px;
}
.swiper-container {
  padding: 20px;
}
.swiper-container img {
  height: 100px;
}
.swiper-container .swiper-slide p:nth-child(2) {
  font-size: 6px;
  line-height: 20px;
  width: 72px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
  text-align: center;
}
.swiper-container .swiper-slide p:nth-child(3) {
  font-size: 4px;
  width: 72px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
</style>