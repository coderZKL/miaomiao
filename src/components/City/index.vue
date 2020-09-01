<template>
  <div class="city_body">
    <div class="city_list">
      <Scroller ref="scroller">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="city in hotList" :key="city.id" @click="handleCity(city)">{{city.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="cities in cityList" :key="cities.index">
              <h2>{{cities.index}}</h2>
              <ul>
                <li v-for="city in cities.list" :key="city.id" @click="handleCity(city)">{{city.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(cities, index) in cityList"
          :key="cities.index"
          @touchstart="handleToIndex(index)"
        >{{cities.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
    };
  },
  mounted() {
    this.axios.get("/dianying/cities.json").then((res) => {
      var cities = res.data.cts;
      var { cityList, hotList } = this.formatCityList(cities);
      this.cityList = cityList;
      this.hotList = hotList;
      this.$refs.scroller.scroll.refresh();
    });
  },
  methods: {
    formatCityList(cities) {
      var cityList = [];
      var hotList = [
        {
          id: 10,
          nm: "上海",
          py: "shanghai",
        },
        {
          id: 1,
          nm: "北京",
          py: "beijing",
        },
        {
          id: 20,
          nm: "广州",
          py: "guangzhou",
        },
        {
          id: 30,
          nm: "深圳",
          py: "shenzhen",
        },
        {
          id: 57,
          nm: "武汉",
          py: "wuhan",
        },
        {
          id: 40,
          nm: "天津",
          py: "tianjin",
        },
        {
          id: 42,
          nm: "西安",
          py: "xian",
        },
        {
          id: 55,
          nm: "南京",
          py: "nanjing",
        },
        {
          id: 50,
          nm: "杭州",
          py: "hangzhou",
        },
        {
          id: 59,
          nm: "成都",
          py: "chengdu",
        },
        {
          id: 45,
          nm: "重庆",
          py: "chongqing",
        },
      ];

      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
        if (toCom(firstLetter)) {
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        } else {
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }],
          });
        }
      }

      cityList.sort((n1, n2) => {
        return n1.index > n2.index ? 1 : -1;
      });

      function toCom(firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return true;
          }
        }
        return false;
      }

      return {
        cityList,
        hotList,
      };
    },
    handleToIndex(index) {
      var h2 = this.$refs.city_sort.getElementsByTagName("h2");
      // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
      this.$refs.scroller.toScrollTop(-h2[index].offsetTop);
    },
    handleCity(city) {
      var id = city.id;
      var name = city.nm;
      var ci = id + "," + name;
      this.$store.commit("changeCity", name);
      this.$store.commit("changeCityId", id);
      this.$cookies.set("selectci", "true");
      this.$cookies.set("ci", ci);
      this.$router.push({
        path: "/movie/nowplaying",
      });
    },
  },
  activated() {
    this.$refs.scroller.scroll.refresh();
  },
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>