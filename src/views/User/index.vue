<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="$store.state.photoimg" class="avatar" />
        </template>
        <template #title>
          <span class="username">{{ userDate.name }}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>2298</span>
          <span>发布动态</span>
        </div>
        <div class="user-data-item">
          <span>{{ userAttentions.total_count }}</span>
          <span>关注用户数</span>
        </div>
        <div class="user-data-item">
          <span>666</span>
          <span>粉丝数量</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link to="/user/edit" />
      <van-cell icon="chat-o" title="小智AI助手" is-link to="/chat" />
      <van-cell
        icon="warning-o"
        @click="exitLoginFn"
        title="退出登录"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserDataApi, getAttentionListApi } from "@/api";
import { Dialog } from "vant";
import { setToken } from "@/utils/aboutToken";
import { Notify } from "vant";
export default {
  name: "User",
  data() {
    return {
      userDate: "", //用户基本数据
      userAttentions: "", //用户关注列表
    };
  },
  methods: {
    // 退出登录
    exitLoginFn() {
      Dialog.confirm({
        title: "退出登录",
        message: "请用户确认是否退出登录",
      })
        .then(() => {
          // 清空token
          setToken("");
          // 跳转到登录页
          Notify({ message: "退出登录", type: "warning", duration: "500" });

          this.$router.replace("/login");
        })
        .catch(() => {});
    },
    // 获取用户关注列表
    async getAttentions() {
      const res = await getAttentionListApi();
      console.log(res);
      this.userAttentions = res.data.data;
    },
  },
  async created() {
    // 获取用户基本数据
    const res = await getUserDataApi();
    this.userDate = res.data.data;

    // 调用用户关注列表
    this.getAttentions();
  },
};
</script>

<style scoped lang="less">
.user-container {
  .user-card {
    background-color: #003472;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #003472;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>
