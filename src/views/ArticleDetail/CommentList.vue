<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="50"
      :immediate-check="false"
    >
      <!-- 评论列表 -->
      <div
        class="cmt-list"
        :class="isShowButton ? 'art-cmt-container-2' : 'art-cmt-container-1'"
      >
        <!-- 评论的 Item 项 -->
        <div class="cmt-item" v-for="(item, index) in commentList" :key="index">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="item.aut_photo" class="avatar" />
              <span class="uname">{{ item.aut_name }}</span>
            </div>
            <!-- 头部右侧---喜欢or不喜欢图标 -->
            <div class="cmt-header-right">
              <van-icon
                name="like"
                size="16"
                color="red"
                v-if="item.is_liking === true"
                @click="likeFn(true, item)"
              />
              <van-icon
                name="like-o"
                size="16"
                color="gray"
                v-else
                @click="likeFn(false, item)"
              />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{ item.content }}
          </div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ formateDate(item.pubdate) }}</div>
        </div>
      </div>
    </van-list>

    <!-- 底部添加评论区域 - 1 -->
    <div class="add-cmt-box van-hairline--top" v-if="isShowButton === false">
      <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
      <div class="ipt-cmt-div" @click="isShowButton = true">评论</div>
      <div class="icon-box">
        <van-badge :content="totalComment" :max="99">
          <van-icon name="comment-o" size="0.53333334rem" />
        </van-badge>
        <van-icon name="star-o" size="0.53333334rem" />
        <van-icon name="share-o" size="0.53333334rem" />
      </div>
    </div>

    <!-- 底部添加评论区域 - 2 -->
    <div class="cmt-box van-hairline--top" v-else>
      <textarea
        v-model="commentValue"
        placeholder="友善评论、理性发言、阳光心灵"
        v-autofocus
        @blur="blurFn"
      ></textarea>
      <van-button
        type="default"
        :disabled="commentValue.length === 0"
        @click="sendFn"
        >发布</van-button
      >
    </div>
  </div>
</template>

<script>
import {
  getCommentListApi, //获取评论列表
  getCommentLikeApi, //获取评论喜欢数据
  getCommentUnLikeApi, //获取评论不喜欢数据
} from "@/api";
import { timeAgo } from "@/utils/formate";
export default {
  data() {
    return {
      commentList: [], //获取评论数据
      isShowButton: false, //控制底部评论框的显示和隐藏
      totalComment: "", //评论总数
      commentValue: "", //评论区内容
      loading: false, // 底部加载状态
      finished: false, // 底部是否加载完成
      offset: null, //偏移量，默认为null第一页，axios遇到null会忽略次参数
    };
  },
  async created() {
    this.getCommentList();
  },
  methods: {
    // 发送网络请求-获取评论数据
    async getCommentList() {
      const res = await getCommentListApi({
        source: this.$route.query.artid,
      });
      // 判断是否还有数据
      if (res.data.data.results.length === 0) {
        this.finished = true;
      }
      this.commentList = [...this.commentList, ...res.data.data.results];
      this.totalComment = res.data.data.total_count || "";
      this.offset = res.data.data.lase_id;
      // 关闭加载状态
      this.loading = false;
    },
    // 时间格式化函数
    formateDate: timeAgo,
    // 喜欢/不喜欢  按钮切换
    async likeFn(bool, item) {
      if (bool === true) {
        // 喜欢 -> 不喜欢
        item.is_liking = false;
        // 发送不喜欢的网络请求
        // 显示（红 到 灰）
        const res = await getCommentUnLikeApi({
          artId: item.com_id,
        });
        console.log(res);
        console.log("设置不喜欢");
      } else {
        // 不喜欢 -> 喜欢
        item.is_liking = true;
        // 发送喜欢的网络请求
        // 显示（灰 到 红）
        const res = await getCommentLikeApi({
          artId: item.com_id,
        });
        console.log(res);
        console.log("设置喜欢");
      }
    },
    // 点击发布事件
    sendFn() {
      console.log(this.commentValue);
    },
    // 底部评论区域失去焦点
    blurFn() {
      setTimeout(() => {
        this.isShowCmtInput = false;
      });
    },
    // 下拉加载更多
    async onLoad() {
      this.getCommentList();
    },
  },
};
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
