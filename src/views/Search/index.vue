<template>
  <div class="search-box">
    <van-search
      v-autofocus
      v-model.trim="SearchValue"
      shape="round"
      background="#003472"
      placeholder="请输入搜索关键词"
      @input="inputFn"
      @search="enterFn"
    >
      <template #left>
        <div class="left-box">
          <van-icon
            name="arrow-left"
            color="white"
            size="0.48rem"
            @click="leftClickBtn"
          />
        </div>
      </template>
    </van-search>

    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="searchList.length !== 0">
      <div
        class="sugg-item"
        v-for="(item, index) in searchList"
        :key="index"
        @click="clickFn(item)"
      >
        {{ item }}
      </div>
    </div>

    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史记录">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="clearFn" />
        </template>
      </van-cell>
      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(item, index) in history"
          :key="index"
          @click="hisClickFn(item)"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchSuggestionApi } from "@/api";

export default {
  name: 'Search',
  data() {
    return {
      SearchValue: "", //输入框输入的内容
      theTime: null, //防抖定时器
      searchList: [], //建议关键字列表
      history: JSON.parse(localStorage.getItem("his")) || [], // 搜索历史
    };
  },
  methods: {
    // 输入框方法
    async inputFn() {
      // 清除计时
      clearTimeout(this.theTime);
      // 计时器防抖：
      this.theTime = setTimeout(async () => {
        if (this.SearchValue.length === 0) return; //防止空内容触发逻辑
        const res = await getSearchSuggestionApi({
          q: this.SearchValue,
        });

        // 获取建议列表
        this.searchList = res.data.data.options;
      }, 500);
    },
    // 输入框回车点击事件
    enterFn() {
      this.history.push(this.SearchValue); // 保存搜索关键字

      setTimeout(() => {
        this.$router.push(`/search/${this.SearchValue}`);
      }, 0);
      this.history = Array.from(new Set(this.history)); // 去重
    },
    // 建议列表点击事件
    clickFn(str) {
      this.history.push(str); // 保存搜索关键字
      setTimeout(() => {
        this.$router.push({
          path: `/search/${str}`,
        });
      }, 0);
      this.history = Array.from(new Set(this.history)); // 去重
    },
    // 历史记录点击事情
    hisClickFn(str) {
      this.$router.push({
        path: `/search/${str}`,
      });
    },
    // 清空历史记录数组
    clearFn() {
      this.history = [];
    },
    // 点击返回，跳转回首页
    leftClickBtn() {
      this.$router.push("/layout");
    },
  },
  watch: {
    // 监听历史搜索记录的改变
    history() {
      localStorage.setItem("his", JSON.stringify(this.history));
    },
  },
};
</script>

<style lang="less" scoped>
.left-box {
  margin-right: 10px;
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}

.van-search {
  height: 46px;
}
.van-search__content--round {
  height: 28px;
}
</style>
