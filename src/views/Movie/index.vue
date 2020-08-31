<template>
  <div id="main">
    <Header title="猫眼电影" />
    <TabBar />
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";

export default {
  name: "Movie",
  components: {
    Header,
    TabBar,
  },
};
</script>

<style>
</style>