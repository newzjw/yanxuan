<template>
  <div class="search-popup">
    <van-search
      v-model="searchVal"
      show-action
      :placeholder="placeholderVal"
      @search="onSearch"
      @cancel="onCancel"
      @input="onInput"
    />
    <HistoryHot
      v-if="blockShow == 1"
      :historyListData="historyListData"
      :hotKeywordListData="hotKeywordListData"
    />
    <SearchTipsList
      v-else-if="blockShow == 2"
      :searchTipsListData="searchTipsListData"
      @cellClick="tagClick"
    />
    <SearchProducts
      v-else
      :filterCategory="filterCategory"
      :goodsList="goodsList"
      @categoryChange="categoryChange"
      @priceChange="priceChange"
    />
  </div>
</template>

<script>
import { GetSearchPopupData, GetSearchTipsListData, GetGoodsListData } from "@/request/api"
import HistoryHot from "@/components/SearchPopup/HistoryHot"
import SearchTipsList from "@/components/SearchPopup/SearchTipsList"
import SearchProducts from "@/components/SearchPopup/SearchProducts"
export default {
  data() {
    return {
      // 搜索的文字，也就是用户输入的文本
      searchVal: "",
      // 占位符文本
      placeholderVal: "",
      // blockShow值可以为1或2或3
      // 为1，表示展示历史记录和热门搜索
      // 为2，表示展示搜索提示的列表
      // 为3，表示展示搜索的产品的内容
      blockShow: 1,
      // 历史记录的列表数据
      historyListData: [],
      // 热门搜索列表数据
      hotKeywordListData: [],
      // 搜索实时提示的列表数据
      searchTipsListData: [],
      // 搜索产品内容的分类数据
      filterCategory: [],
      // 搜索产品内容的列表数据
      goodsList: [],
      // 价格排序：(由高到低或者由低到高)
      order: "desc",
      // 分类id
      categoryId: 0,
      // 搜索方式  是id 还是price
      sort: "id"
    }
  },
  created() {
    GetSearchPopupData().then(res => {
      this.placeholderVal = res.data.defaultKeyword.keyword
      this.historyListData = res.data.historyKeywordList
      this.hotKeywordListData = res.data.hotKeywordList
    })
  },
  methods: {
    onSearch(val) { //onSearch用户回车搜索的时候执行，val就是用户输入的值
      // console.log("onSearch什么时候执行",val);
      this.blockShow = 3;
      GetGoodsListData({
        keyword: val,
        page: 1,
        size: 10,
        order: this.order,
        categoryId: this.categoryId,
        sort: this.sort
      }).then(res => {
        if (res.errno == 0) {
          let { filterCategory, goodsList } = res.data;
          this.goodsList = goodsList;
          // 小技巧，使用深拷贝，修改对象的key，name改成text，id改成value
          let newArr = JSON.parse(JSON.stringify(filterCategory).replace(/name/g, 'text').replace(/id/g, 'value'))
          // console.log(newArr);
          this.filterCategory = newArr
        }
      })
    },
    onCancel() {
      this.$router.go(-1);
    },
    onInput(val) {
      this.blockShow = 2;
      // 发送请求，获取实时搜索的文本提示的数据列表
      GetSearchTipsListData({ keyword: val }).then(res => {
        if (res.errno == 0) {
          this.searchTipsListData = res.data
        }
      })
    },
    priceChange(value) {  // value是desc或者asc
      this.order = value
      this.sort = "price"
      this.onSearch(this.searchVal)
    },
    categoryChange(value) {
      // 改id
      this.categoryId = value
      // 发送搜索商品的请求
      this.onSearch(this.searchVal)
    },
    tagClick(val){
      // 改变上面搜索框的值，后面再给价格排序的时候调用到priceChange()的时候传入的就是这次点击的这个值
      this.searchVal = val
      this.onSearch(val)
    },
  },
  watch: {
    ['id_card'](val) {
      this.$nextTick(() => {
        this.id_card = val.replace(/\s/g, '').replace(/......(?!$)/g, '$& ');
      });
    }
  },
  components: {
    HistoryHot,
    SearchTipsList,
    SearchProducts
  }
}
</script>

<style lang="less" scoped>
.search-popup {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #efefef;
}
</style>