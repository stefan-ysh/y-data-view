<template>
  <div class="login-wrap">
    <div id="login-form">
      <h1>Login</h1>
      <n-spin :show="show" description="登录中...">
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item path="userName" label="用户名">
            <n-input
              v-model:value="model.userName"
              @keydown.enter.prevent="handleLogin"
            />
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input
              v-model:value="model.password"
              type="password"
              @keydown.enter.prevent="handleLogin"
            />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleLogin" style="width: 100%">
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </n-spin>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { login } from "@/api/login";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const model = ref({
  userName: "",
  password: "",
});
const show = ref(false);
const rules = {
  userName: [{ required: true, message: "请输入年龄" }],
  password: [{ required: true, message: "请输入密码" }],
};
const handleLogin = async () => {
  show.value = true;
  const res = await login(model.value);
  if (res.code === 200) {
    show.value = false;
    // alert("登录成功");
    router.push("/");
  } else {
    alert("登录失败");
  }
};
</script>
<style lang="less">
.login-wrap {
  position: absolute;
  inset: 0;
  font-family: "Open Sans", sans-serif;
  margin: 0;
  background-color: #4a374a;
}
#login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -150px;
  width: 300px;
  height: 300px;
}
#login-form h1 {
  color: #fff;
  text-shadow: 0 0 10px;
  letter-spacing: 1px;
  text-align: center;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
</style>
