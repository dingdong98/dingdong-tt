<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ articleDetail.title }}</h1>

      <!-- 用户信息 -->
      <van-cell
        center
        :title="articleDetail.aut_name"
        :label="formateDate(articleDetail.pubdate)"
      >
        <template #icon>
          <img :src="articleDetail.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button
              type="info"
              size="mini"
              v-if="articleDetail.is_followed === true"
              @click="followedFn(true)"
              >已关注</van-button
            >
            <van-button
              icon="plus"
              type="info"
              size="mini"
              plain
              v-else
              @click="followedFn(false)"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="articleDetail.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="articleDetail.attitude === 1"
          @click="loveFn(false)"
          >已点赞</van-button
        >
        <van-button
          icon="good-job-o"
          type="danger"
          plain
          size="small"
          v-else
          @click="loveFn(true)"
          >点赞</van-button
        >
      </div>
    </div>

    <!-- 文章评论区域 -->
    <comment-list></comment-list>
  </div>
</template>

<script>
import {
  getArticlDetailApi,
  concelAttentionApi,
  getPraiseApi,
  cancelGetPraiseApi,
} from "@/api";
import { timeAgo } from "@/utils/formate";
import { getAttentionApi } from "@/api";
import CommentList from "./CommentList.vue";
export default {
  components: {
    CommentList,
  },
  data() {
    return {
      articleDetail: {}, //文章详情数据对象
    };
  },
  async created() {
    const articleResultResult = await getArticlDetailApi({
      artId: this.$route.query.artid,
    });
    this.articleDetail = articleResultResult.data.data;
  },
  methods: {
    formateDate: timeAgo,
    //关注、取关按钮
    async followedFn(boolen) {
      if (boolen === true) {
        //关注  -> 取关
        this.articleDetail.is_followed = false;
        // 发送取消关注-存储到后台中
        await concelAttentionApi({
          targetId: this.articleDetail.aut_id,
        });
      } else {
        //取关  -> 关注
        this.articleDetail.is_followed = true;
        // 发送关注用户网络请求-存储在后台中
        await getAttentionApi({
          userId: this.articleDetail.aut_id,
        });
      }
    },
    // 点赞按钮
    async loveFn(bool) {
      if (bool === true) {
        //点击了点赞按钮
        this.articleDetail.attitude = 1;
        // 发送已点赞网络请求-后台存储
        await getPraiseApi({
          artId: this.articleDetail.art_id,
        });
        console.log(this.articleDetail.art_id);
      } else {
        // 取消点赞按钮
        this.articleDetail.attitude = -1;
        // 发送取消点赞网络请求-后台存储
        await cancelGetPraiseApi({
          artId: this.articleDetail.art_id,
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
