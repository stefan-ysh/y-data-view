<template>
  <div class="login-wrap">
    <div id="login-form">
      <h1>{{ formType === "login" ? "Login" : "Register" }}</h1>
      <n-spin :show="show" description="登录中...">
        <n-form
          label-placement="left"
          label-width="auto"
          ref="formRef"
          :model="model"
          :rules="rules"
        >
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
          <n-form-item
            v-show="formType === 'register'"
            label="邮箱"
            path="email"
          >
            <n-input
              v-model:value="model.email"
              @keydown.enter.prevent="handleLogin"
            />
          </n-form-item>
          <n-form-item
            v-show="formType === 'register'"
            label="电话"
            path="mobile"
          >
            <n-input
              v-model:value="model.mobile"
              @keydown.enter.prevent="handleLogin"
            />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleLogin" style="width: 100%">
              {{ formType === "login" ? "登录" : "注册" }}
            </n-button>
          </n-form-item>
        </n-form>
      </n-spin>
      <span class="switch-form" @click="switchFormType">{{
        formType === "login" ? "还没帐号？去注册" : "已有帐号，现在登录"
      }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { login, register } from "@/api/login";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  useMessage,
  FormRules,
} from "naive-ui";
const router = useRouter();
const formType = ref<"login" | "register">("login");
const model = ref({
  userName: "",
  password: "",
  email: "",
  mobile: "",
});
const show = ref(false);
const formRef = ref<FormInst | null>(null);
const rules: FormRules = {
  userName: [{ required: true, message: "请输入年龄" }],
  password: [{ required: true, message: "请输入密码" }],
  email: [{ required: false, message: "请输入正确的邮箱地址", type: "email" }],
  mobile: [
    {
      required: false,
      message: "请输入正确的电话号码",
      // 验证电话号码  中国的移动电话
      pattern: /^1[3456789]\d{9}$/,
    },
  ],
};
const switchFormType = () => {
  formType.value = formType.value === "login" ? "register" : "login";
};
const handleLogin = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      show.value = true;
      if (formType.value === "register") {
        const res = await register(model.value);
        if (res.code === 200) {
          show.value = false;
          window.$message.success("注册成功");
          formType.value = "login";
        } else {
          show.value = false;
          window.$message.error("注册失败，请重试");
        }
      } else {
        const res: any = await login(model.value);
        if (res.code === 200) {
          setTimeout(() => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("userName", res.data.user_name);
            // alert("登录成功");
            window.$message.success("登录成功！");
            show.value = false;
            router.push("/");
          }, 1500);
        } else {
          show.value = false;
          window.$message.error("登录失败，请重试");
        }
      }
    } else {
      console.log(errors);
    }
  });
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
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 400px;
  padding: 10px 50px 50px 50px;
  transition: all 0.5s;
  border-radius: 20px;
  animation: shake 10s linear infinite alternate;
  position: relative;
}
.switch-form {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: pink;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.5s;
  &:hover {
    opacity: 1;
  }
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
@keyframes shake {
  0% {
    box-shadow: 5px 0 0 0 #504152;
  }
  25% {
    box-shadow: 0 5px 0 0 #504152;
  }
  50% {
    box-shadow: 0 0 5px 0 #504152;
  }
  75% {
    box-shadow: 0 0 0 5px #504152;
  }
  100% {
    box-shadow: 5px 0 0 0 #504152;
  }
}
</style>
