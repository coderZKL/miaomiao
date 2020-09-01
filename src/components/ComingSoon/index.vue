<template>
  <div class="movie_body">
    <ul>
      <li v-for="movie in movieList" :key="movie.id">
        <div class="pic_show">
          <img :src="movie.img | img" />
        </div>
        <div class="info_list">
          <h2>
            <span>{{movie.nm}}</span>
            <img v-if="movie.version" :src="movie.version | type" alt />
            <img v-if="movie.preShow" src="/images/4.png" alt />
          </h2>
          <p>
            <span class="grade">{{movie.wish}}</span> 人想看
          </p>
          <p v-if="movie.star">主演: {{movie.star}}</p>
          <p>{{movie.rt}}上映</p>
        </div>
        <div v-if="movie.showst == 1" class="btn_mall">想看</div>
        <div v-else class="btn_pre">预售</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ComingSoon",
  data() {
    return {
      movieList: [],
    };
  },
  methods: {
    getMovieList() {
      var url = "/ajax/comingList?token=" + "&ci=" + this.$store.state.id;
      this.axios.get(url).then((res) => {
        if (this.movieList) {
          this.movieList = res.data.coming;
        } else {
          this.$router.push({ path: "/movie/city" });
        }
      });
    },
  },
  beforeRouteEnter(from, to, next) {
    next((vm) => {
      vm.getMovieList();
    });
  },
  filters: {
    img(value) {
      return value.replace("w.h", "170.230");
    },
    type(value) {
      if (value === "v2d imax") {
        return "/images/1.png";
      } else if (value === "v3d") {
        return "/images/2.png";
      } else if (value === "v3d imax") {
        return "/images/3.png";
      }
    },
  },
};
</script>

<style>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  display: inline-block;
  height: 16px;
  position: relative;
  left: 5px;
  top: 2px;
  margin-right: 4px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .btn_mall {
  background-color: #faaf00;
}
</style>