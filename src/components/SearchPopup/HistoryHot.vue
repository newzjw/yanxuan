<template>
  <div>
    <div class="his-hot">
      <div class="hd">
        <h4>历史记录</h4>
        <van-icon name="delete" />
      </div>
      <div class="bd">
        <van-tag
          v-for="(item, index) in historyListData"
          :key="index"
          plain
          type="default"
          >{{ item }}</van-tag
        >
      </div>
    </div>
    <div class="his-hot">
      <div class="hd">
        <h4>热门搜索</h4>
      </div>
      <div class="bd">
        <van-tag
          v-for="(item, index) in hotKeywordListData"
          :key="index"
          plain
          type="default"
          :class="item.is_hot ? 'red' : ''"
          >{{ item.keyword }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: ["historyListData", "hotKeywordListData"]
}
</script>

<style lang="less" scoped>
.his-hot {
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  .hd {
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    h4 {
    }
    i {
    }
  }
  .bd {
    margin-top: 10px;
    .van-tag {
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 5px;
    }
  }
  .red {
    color: darkred;
  }
}
</style>