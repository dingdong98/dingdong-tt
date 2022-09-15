<template>
  <div class="article-box">
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ list.title }}</span>
          <!-- 单图区域 -->
          <img
            v-if="list.cover.type === 1"
            class="thumb"
            alt="图片"
            v-lazy="list.cover.images[0]"
          />
        </div>
        <!-- 多图区域 -->
        <div class="thumb-box" v-if="list.cover.type > 1">
          <img
            v-for="(item, index) in list.cover.images"
            :key="index"
            class="thumb"
            v-lazy="item"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>作者：{{ list.aut_name }}</span>
            <span>评论数：{{ list.comm_count }}</span>
            <span>时间：{{ formate(list.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true" v-show="isShow" />
        </div>
      </template>
    </van-cell>

    <!-- 弹出框 -->
    <van-action-sheet
      v-model="show"
      get-container="body"
      :actions="actions"
      :cancel-text="bottomText"
      @select="onSelect"
      @cancel="cancelFn"
      @close="closeFn"
    ></van-action-sheet>
  </div>
</template>

<script>
import { timeAgo } from "@/utils/formate";
import { firstActions, secondActions } from "@/comdata/reqort";
export default {
  props: {
    list: Object, //文章对象
    isShow: {
      type: Boolean,
      default: true, //默认显示反馈图标
    },
  },
  data() {
    return {
      show: false,
      actions: firstActions,
      bottomText: "取消",
    };
  },
  methods: {
    formate: timeAgo,
    // 反馈面板-选项选择事件
    onSelect(actions) {
      if (actions.name === "反馈垃圾内容") {
        this.actions = secondActions;

        this.bottomText = "返回";
      } else if (actions.name === "不感兴趣") {
        this.$emit("hateArticle", this.list.art_id);
        this.show = false;
      } else {
        this.$emit("reportContain", this.list.art_id, actions.value);
        this.show = false;
      }
    },
    // 反馈面板-底部按钮-点击事件
    cancelFn() {
      if (this.bottomText === "返回") {
        this.show = true;
        this.actions = firstActions;
      }
      this.bottomText = "取消";
    },
    // 反馈面板-关闭面板-触发事件
    closeFn() {
      this.actions = firstActions;
      this.bottomText = "取消";
    },
  },
};
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
