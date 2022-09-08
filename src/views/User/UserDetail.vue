<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="userDate.photo"
            @click="imageClickFn"
          />
          <!-- file 选择框 -->
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <!-- 名称 -->
      <van-cell
        title="名称"
        is-link
        :value="userDate.name"
        @click="nameClickFn"
      />
      <!-- 名称弹出框 -->
      <van-dialog
        v-model="isShowDiolog"
        title="修改名称"
        show-cancel-button
        :beforeClose="closeDialogFn"
      >
        <!-- 输入框 -->
        <van-field
          v-model.trim="userDate.name"
          input-align="center"
          maxlength="15"
          placeholder="请输入名称"
          v-autofocus
        />
      </van-dialog>
      <!-- 生日 -->
      <van-cell
        title="生日"
        is-link
        :value="userDate.birthday"
        @click="birthdayClickFn"
      />

      <van-popup
        v-model="isShowDateTime"
        position="bottom"
        style="height: 50%"
        round
      >
        <!-- 时间选择控件 -->
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择生日时间"
          :min-date="minDate"
          :max-date="maxDate"
          :v-show="isShowDateTime"
          @confirm="changeBirthdayFn"
        ></van-datetime-picker>
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import { getUserDataApi, updateUserPhotoApi, changeUserDateApi } from "@/api";
import moment from "moment";
import { Notify } from "vant";
export default {
  name: "UserEdit",
  data() {
    return {
      editUserDate: "", //编辑的用户信息
      userDate: "", //用户基本数据
      isShowDiolog: false, //是否显示输入框
      isShowDateTime: false, //是否显示时间控件
      currentDate: new Date(), //当前时间----选择的生日时间
      minDate: new Date(1900, 0, 1), // 最小的可选的日期
      maxDate: new Date(), // 最大的可选日期
    };
  },
  methods: {
    // 获取用户个人信息
    async getUserDate() {
      const res = await getUserDataApi();
      this.userDate = res.data.data;
    },
    // 编辑资料-图标点击事件
    imageClickFn() {
      this.$refs.iptFile.click(); //触发image标签中的 input点击事件
    },
    // 编辑资料-文件选择方法
    async onFileChange(ev) {
      if (ev.target.files.length === 0) return; // 用户可能没有选择图片文件阻止代码往下
      console.log(ev.target.files[0]); //数组中的图片特殊对象
      // 创建formData对象
      const theFd = new FormData();
      theFd.append("photo", ev.target.files[0]);
      const res = await updateUserPhotoApi(theFd);
      console.log(res.data.data.photo);
      this.userDate.photo = res.data.data.photo; //修改后台图片数据
    },
    // 编辑资料-名称点击事件
    nameClickFn() {
      // 显示弹出框
      this.isShowDiolog = true;
    },
    // 姓名修改后弹出框
    async closeDialogFn(action, done) {
      if (action === "confirm") {
        // 确认按钮
        await changeUserDateApi({
          name: this.userDate.name,
        });
        Notify({ type: "success", message: "修改用户名成功", duration: 500 });
        console.log("修改用户名成功");
        done();
      } else if (action === "cancel") {
        // 取消按钮
        done();
      }
    },
    // 生日点击事件
    birthdayClickFn() {
      this.isShowDateTime = true;
    },
    // 生日数值确定事件
    async changeBirthdayFn() {
      // 后台要"年-月-日"格式字符串参数值
      const dataStr = moment(this.currentDate).format("YYYY-MM-DD");
      // 发送网络请求
      await changeUserDateApi({
        birthday: dataStr,
      });
      // 前端页面展示
      this.userDate.birthday = dataStr;
      // 时间控件关闭
      this.isShowDateTime = false;
    },
  },
  async created() {
    this.getUserDate();
    console.log(this.$store.state.photoimg);
  },
};
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
