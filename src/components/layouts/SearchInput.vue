<template>
  <el-autocomplete
    v-model="state4"
    :fetch-suggestions="querySearchAsync"
    placeholder="搜索感兴趣的内容"
    @select="handleSelect"
    class="querySearch"
  ></el-autocomplete>
</template>
<script>
export default {
  data () {
    return {
      restaurants: [],
      state4: '',
      timeout: null
    }
  },
  methods: {
    loadAll () {
      return [
        { value: '三全鲜食（北新泾店）", "address": "长宁区新渔路144号' },
        { value: 'Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号' },
        { value: '阳阳麻辣烫", "address": "天山西路389号'},
        { value: '南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ]
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      console.log(item)
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  }
}
</script>

<style lang="stylus" scoped>
  .querySearch>>>input
    background-image url('~@/assets/image/search.png')
    background-repeat no-repeat
    background-size 14px 14px
    background-position 10px
    padding-left 28px
</style>
