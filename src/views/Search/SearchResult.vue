<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- 列表数据展示 -->
      <article-item
        v-for="(item, index) in searchResultList"
        :key="index"
        :list="item"
        :isShow="false"
        @click.native="itemClickBtn(item.art_id)"
        >{{ item }}</article-item
      >
    </van-list>
  </div>
</template>

<script>
import { searchResultApi } from "@/api";
import ArticleItem from "@/components/ArticleItem.vue";
export default {
  name: "SearchResult",
  components: {
    ArticleItem,
  },
  data() {
    return {
      page: 1, //设置默认页码
      searchResultList: [], //搜索结果
      loading: false,
      finished: false,
    };
  },
  async created() {
    // 组件创建时，初始化加载数据
    const res = await searchResultApi({
      page: this.page,
      q: this.$route.params.keywords,
    });
    this.searchResultList = res.data.data.results;
  },
  methods: {
    async onLoad() {
      if (this.searchResultList.length > 0) {
        // 触底时重新发送网络请求
        this.page++;
        const res = await searchResultApi({
          page: this.page,
          q: this.$route.params.keywords,
        });

        // 如果数据全部加载完毕
        if (res.data.data.results.length === 0) {
          this.finished = true;
          return;
        }
        this.searchResultList = [
          ...this.searchResultList,
          ...res.data.data.results,
        ];

        this.loading = false;
      }
    },
    // 点击文章列表，跳转文章详情
    itemClickBtn(id) {
      this.$router.push(`/detail?${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
