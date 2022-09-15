<template>
  <div class="app">
    <!-- 设置缓存组件，包裹一级路由 -->
    <keep-alive
      :exclude="[
        'ArticleDetail',
        'Login',
        'Search',
        'SearchResult',
        'User',
        'UserDetail',
      ]"
    >
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
