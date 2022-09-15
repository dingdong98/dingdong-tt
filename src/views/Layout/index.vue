<template>
  <div>
    <!-- 二级路由界面 -->
    <keep-alive>
      <div class="home_container">
        <router-view></router-view>
      </div>
    </keep-alive>

    <!-- 底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/layout/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style lang="less" scoped>
.home_container {
  padding-bottom: 50px;
}
/* 底部导航上边框 */
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
