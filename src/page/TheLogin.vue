<template>
  <div class="login">
    <div class="main_login">
      <div class="title_login">Đăng nhập</div>
      <div class="username">
        Tên tài khoản
        <Input v-model:value="username" placeholder="Mã sinh viên..." />
      </div>
      <div class="username">
        Mật khẩu
        <InputPassword v-model:value="password" placeholder="Mật khẩu" />
      </div>
      <div class="btn_login">
        <Button type="primary"  style="width: 100%" @click="login()"
          >Đăng nhập</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Input, InputPassword, Button } from "ant-design-vue";
import { get } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";

export default {
  components: { Input, InputPassword, Button },
  created() {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      get(
        `Accounts/login?username=${this.username} &password=${this.password}`,
        (res) => {
          if (res.data.account_id) {
            localStorage.setItem("userId",res.data.account_id);
            this.$emit("loginok",res.data)
           
          } else {
             toast.error(Resource.errologin, {
            autoClose: 2000,
            position: "top-center",
          });
          }
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          toast.error(Resource.errologin, {
            autoClose: 2000,
            position: "top-center",
          });
          console.log(error);
        }
      );
    },
  },
};
</script>

<style>
</style>