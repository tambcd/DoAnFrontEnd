<template>
  <div class="login">
    <div class="main_login">
      <div class="left-login">
        <img src="https://img.freepik.com/premium-vector/stylish-bright-creative-text-welcome-white-background-vector_532963-3106.jpg?w=2000" alt="welcome">
      </div>
      <div class="right-login">
        <div class="title_login">
          <img src="https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/e19adc023378cfaab4f274dc82067b4d.png" alt="login">
        </div>
        <div class="username">
          <Input v-model:value="username" placeholder="Mã sinh viên..." />
        </div>
        <div class="username">
          <InputPassword style="border-radius: 10px; height: 40px; " v-model:value="password" placeholder="Mật khẩu"  />
        </div> 
        <div>
        </div>
        <div class="btn_login">
          <Button type="primary"  style="width: 100%" @click="login()"
            >Đăng nhập</Button
          >
        </div>
        <div class="sign">
          <a href="">Đăng ký</a>
          <a href="">Quên mật khẩu</a>
        </div>
        <div class="text">Hoặc đăng nhập với</div>
        <div class="social-media">
          <img src="https://vi.wizcase.com/wp-content/uploads/2022/05/Facebook-Logo.png" alt="face">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" alt="insta">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png" alt="mail">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" alt="apple">
        </div>
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