<template>
    <div>
        <van-dropdown-menu>
            <van-dropdown-item disabled title="综合" />
            <van-dropdown-item @change="priceChange" title="价格" v-model="priceVal" :options="option2" />
            <van-dropdown-item @change="categoryChange" title="分类" v-model="categoryVal" :options="filterCategory" />
        </van-dropdown-menu>
        <van-empty v-if="goodsList.length==0" image="search" description="没有您搜索的商品" />
        <Products v-else :goodsList="goodsList"/>
    </div>
</template>

<script>
import Products from "./Products"
export default {
    props:["filterCategory", "goodsList"],
    data () {
        return {
            priceVal: "",
            categoryVal: "",  // 这个的值是哪一项的value，就表示这一项被勾上
            option2: [
                { text: '价格由高到低', value: 'desc' },
                { text: '价格由低到高', value: 'asc' },
            ],
        }
    },
    components:{
        Products
    },
    methods:{
        categoryChange(value){
            //console.log(value);  // 就是分类id
            this.$emit("categoryChange", value)
        },
        priceChange(value){
            // console.log(value);
            this.$emit("priceChange", value)
        }
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>