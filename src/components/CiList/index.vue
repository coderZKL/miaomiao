<template>
  <div class="cinema_body">
    <Scroller ref="scroller">
      <ul>
        <li v-for="movie in movieList" :key="movie.id">
          <div>
            <span>{{movie.name.replace('（', '(')}}&nbsp;&nbsp;</span>
            <span v-if="movie.price" class="q">
              <span class="price">{{movie.price}}</span> 元起
            </span>
          </div>
          <div class="address">
            <span>{{movie.address}}</span>
            <span>{{movie.distance}}</span>
          </div>
          <div class="card">
            <div v-if="movie.allowRefund" class="bl">退</div>
            <div v-if="movie.endorse" class="bl">改签</div>
            <div v-if="movie.snack" class="or">小吃</div>
            <div v-if="movie.vipTag" class="or">折扣卡</div>
            <div v-for="type in movie.hallType" :key="type" class="bl">{{type}}</div>
          </div>
          <div v-if="movie.discount" class="discount">
            <img src="//p1.meituan.net/scarlett/ff1c6e33ed0ac3cd862910a83d4bf959583.png" />
            <span>开卡特惠，首单2张最高立减2元</span>
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: "CiList",
  data() {
    return {
      movieList: [],
    };
  },
  mounted() {
    this.axios
      .get(`/ajax/moreCinemas?cityId=${this.$store.state.id}`)
      .then((res) => {
        var parser = new DOMParser();
        var data = parser.parseFromString(res.data, "text/html");
        var Atags = data.getElementsByTagName("a");
        this.parserA(Atags);
        this.$refs.scroller.scroll.refresh();
      });
  },
  methods: {
    parserA(Atags) {
      for (var i = 0; i < Atags.length; i++) {
        var movie = {};
        movie.id = i;
        movie.name = Atags[i].querySelector(
          "div.title.line-ellipsis > span:nth-child(1)"
        ).innerHTML;
        if (Atags[i].querySelector("span.price")) {
          movie.price = Atags[i].querySelector("span.price").innerHTML;
        }
        movie.address = Atags[i].querySelector(
          "div.flex.line-ellipsis"
        ).innerHTML;
        movie.distance = Atags[i].querySelector("div.distance").innerHTML;

        if (Atags[i].querySelector("div.allowRefund")) {
          movie.allowRefund = true;
        }
        if (Atags[i].querySelector("div.endorse")) {
          movie.endorse = true;
        }
        if (Atags[i].querySelector("div.snack")) {
          movie.snack = true;
        }
        if (Atags[i].querySelector("div.vipTag")) {
          movie.vipTag = true;
        }
        if (Atags[i].querySelector("div.hallType")) {
          var hallTypes = Atags[i].getElementsByClassName("hallType");
          movie.hallType = [];
          for (var j = 0; j < hallTypes.length; j++) {
            movie.hallType.push(hallTypes[j].innerHTML);
          }
        }
        if (Atags[i].querySelector("div.discount-block").innerHTML.trim()) {
          movie.discount = true;
        }
        this.movieList.push(movie);
      }
    },
  },
  activated() {
    this.$refs.scroller.scroll.refresh();
  },
};
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 5px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-child(1) {
  display: inline-block;
  width: 260px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
.cinema_body .discount {
  font-size: 11px;
  color: #999;
  margin-top: -3px;
  margin-bottom: 16px;
}
.cinema_body .discount img {
  display: inline-block;
  width: 15px;
  position: relative;
  top: 3px;
  margin-right: 3px;
}
</style>