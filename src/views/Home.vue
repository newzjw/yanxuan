<template>
  <div class="home">
    <van-search
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      disabled
      input-align="center"
      @click="$router.push('/home/searchPopup')"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#39a9ed">
      <van-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.image_url" width="100%" :style="{display:'block'}">
      </van-swipe-item>
    </van-swipe>

    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { GetHomeList } from "@/request/api"
export default {
  data() {
    return {
      searchValue: '',
      banner: []
    }
  },
  created() {
    GetHomeList()
      .then(res => {
        this.banner = res.data.banner
      })
      .catch(err => {
        console.log(err);
      })
  }
}
</script>

<style lang="less" scoped>

</style>
