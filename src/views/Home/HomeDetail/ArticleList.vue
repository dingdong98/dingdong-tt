<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="van-mainlist">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="50"
        :immediate-check="false"
      >
        <div class="art-item">
          <!-- 文章列表 -->
          <article-item
            v-for="item in articleList"
            :key="item.art_id"
            :list="item"
            @hateArticle="hateArticle"
            @reportContain="reportContain"
            @click.native="itemClick(item.art_id)"
          ></article-item>
        </div>
      </van-list>
    </div>
  </van-pull-refresh>
</template>

<script>
import ArticleItem from "../../../components/ArticleItem.vue";
import { getArticleListApi, postHateApi, reportContainApi } from "@/api";
import { Notify } from "vant";
export default {
  props: {
    channelId: Number,
  },
  data() {
    return {
      articleList: [],
      loading: false, // 底部加载状态
      finished: false, // 数据是否全部加载完成
      theTime: new Date().getTime(), //当前时间戳
      isLoading: false, //顶部刷新状态
    };
  },
  components: {
    ArticleItem,
  },
  async created() {
    this.getArticleList();
  },
  methods: {
    // 封装-获取文章列表-方法
    async getArticleList() {
      // 网络打开时发送一次网络请求，拿到文章初始数据
      const articleListResult = await getArticleListApi({
        channelId: this.channelId,
        timestamp: this.theTime,
      });
      this.articleList = [
        ...this.articleList,
        ...articleListResult.data.data.results,
      ];
      // 设置下个时间戳
      this.theTime = articleListResult.data.data.pre_timestamp;

      this.loading = false; //如果不关闭，底部处于加载中状态，下次触底会再触发onload
      if (articleListResult.data.data.pre_timestamp === null) {
        //本次回来的数据是最后，没有下一段数据
        this.finished = true;
        return;
      }
      // 刷新完毕后，加载完成
      this.isLoading = false;
    },
    // 底部-加载文章列表-方法
    async onLoad() {
      if (this.articleList.length > 0) {
        this.getArticleList();
      }
    },
    // 顶部-刷新方法
    async onRefresh() {
      //请求列表数组和时间戳
      this.articleList = [];
      this.theTime = new Date().getTime();
      // 重新发起网络请求
      this.getArticleList();
    },
    // 反馈-文章-不感兴趣-方法
    async hateArticle(artid) {
      await postHateApi({ artid });
      Notify({ type: "success", message: "反馈成功" });
    },
    // 举报-内容-方法
    async reportContain(target, type) {
      await reportContainApi({ target, type });
      Notify({ type: "success", message: "举报成功" });
    },
    // 点击首页中的文章列表，跳转文章详情
    itemClick(id) {
      this.$router.push(`/detail?artid=${id}`);
    },
  },
};
</script>
