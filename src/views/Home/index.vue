<template>
  <div class="home">
    <div class="header-nav">
      <!-- 头部导航栏 -->
      <van-nav-bar fixed>
        <template #left>
          <img class="logo" src="@/assets/toutiao_logo.png" alt="" />
        </template>
        <template #right>
          <van-icon name="search" size="18" @click="pushSearchFn" />
        </template>
      </van-nav-bar>
    </div>

    <!-- 标签页 -->
    <div class="main">
      <van-tabs v-model="activeName" animated sticky offset-top="1.226667rem">
        <van-tab
          v-for="item in userChannelList"
          :key="item.id"
          :title="item.name"
          :name="item.id"
        >
          <article-list :channelId="activeName"></article-list>
        </van-tab>
      </van-tabs>

      <!-- 编辑频道图标 -->
      <van-icon
        name="plus"
        size="0.37333334rem"
        class="moreChannels"
        @click="popBtn"
      />
      <!-- 弹出层页面 -->
      <van-popup v-model="popshow" class="edit_wrap" @closed="closedFn">
        <channel-edit
          :userChannelList="userChannelList"
          :unChooseChannelList="unChooseChannelList"
          @addFn="addFn"
          @removeFn="removeFn"
          @close="popshow = false"
          @changeChannelId="changeChannelIdFn"
          @closePage="closePage"
          ref="channelEdit"
        ></channel-edit>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getUserChannelApi, getAllChannelApi, updataChannelApi } from "@/api";
import ArticleList from "./HomeDetail/ArticleList.vue";
import ChannelEdit from "./HomeDetail/ChannelEdit.vue";
export default {
  name: 'Home',
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      activeName: 0, //选中的频道ID
      userChannelList: [],
      allChannelList: [],
      articleList: [],
      popshow: false,
    };
  },
  methods: {
    // 弹出框显示/隐藏方法
    popBtn() {
      this.popshow = true;
    },
    // 封装-更新频道方法
    async updateChannel() {
      const newArr = this.userChannelList.map((obj) => {
        const newObj = { ...obj };
        return newObj;
      });

      // 删除推荐
      const index = newArr.findIndex((obj) => obj.name === "推荐");
      newArr.splice(index, 1);

      // 转换字段
      newArr.forEach((obj, index) => {
        delete obj.name;
        obj.seq = index + 1;
      });

      // 调用接口
      await updataChannelApi({
        channels: newArr,
      });
    },
    // 添加新频道方法
    async addFn(item) {
      this.userChannelList.push(item);
      this.updateChannel();
    },
    // 删除频道方法
    async removeFn(item) {
      // 找到这个频道在数组下表删除
      const index = this.userChannelList.findIndex((obj) => obj.id === item.id);
      this.userChannelList.splice(index, 1);

      //
      this.updateChannel();
    },
    // 弹窗关闭-重置编辑频道状态
    closedFn() {
      this.$refs.channelEdit.isEdit = false;
    },
    // 弹出框点击进入频道
    changeChannelIdFn(item) {
      this.activeName = item.id;
    },
    // 跳转到search路由
    pushSearchFn() {
      this.$router.push("/search");
    },
    // 关闭频道页面
    closePage() {
      this.popshow = false;
    },
  },
  async created() {
    // 获取用户频道数据
    const getUserResult = await getUserChannelApi();
    this.userChannelList = getUserResult.data.data.channels;
    // 获取所有频道数据
    const getAllChannelResult = await getAllChannelApi();
    this.allChannelList = getAllChannelResult.data.data.channels;
  },
  computed: {
    // 获取未选择的频道数据
    unChooseChannelList() {
      // 定义一个新数组，接受未选择数据
      const newArr = this.allChannelList.filter((bigObj) => {
        const index = this.userChannelList.findIndex((smallObj) => {
          return smallObj.id === bigObj.id;
        });

        // 如果找到
        if (index > -1) {
          return false;
        } else {
          return true;
        }
      });

      // 函数返回一个新数组
      return newArr;
    },
  },
};
</script>

<style scoped lang="less">
.logo {
  width: 100px;
  height: 30px;
}
.van-nav-bar .van-icon {
  color: white;
}

/deep/ .van-tabs__content {
  padding-top: 44px;
}

// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}

/* 频道编辑弹出层铺满屏幕 */
.edit_wrap {
  width: 100%;
  height: 100%;
}
</style>
