<template>
  <!-- 首页 -->
  <div class="login">
    <!-- 导航组件 -->
    <van-nav-bar title="叮咚头条-登录" />
    <!-- 表单组件 -->
    <van-form @submit="onSubmit">
      <van-field
        required
        v-model="users.mobile"
        name="mobile"
        label="手机号"
        placeholder="请输入手机号码"
        :rules="[
          {
            required: true,
            message: '请填写手机号码',
            pattern: /^1[3~9]\d{9}$/,
          },
        ]"
      />
      <van-field
        required
        v-model="users.code"
        type="password"
        name="code"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写6位验证码', pattern: /^\d{6}$/ },
        ]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="isLoading"
          :disabled="isLoading"
          loading-text="正在登录中"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi } from "@/api";
import { Notify } from "vant";
import { setToken } from "@/utils/aboutToken";
export default {
  data() {
    return {
      users: {
        mobile: "13199999999", //手机号
        code: "246810", //校验验证码： 只能是246810
      },
      isLoading: false,
    };
  },
  methods: {
    // 提交表单
    async onSubmit() {
      // 设置加载状态
      this.isLoading = true;
      // 发送登录网络请求，校验数据
      try {
        const loginResult = await loginApi(this.users);
        Notify({ type: "success", message: "登录成功", duration: "500" });
        // 保存token
        setToken(loginResult.data.data.token);
        // 跳转到layout界面
        this.$router.replace({
          path: "/layout",
        });
      } catch (error) {
        Notify({ type: "danger", message: "账号或密码错误" });
      }
      // 关闭加载状态
      this.isLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
