<template>
  <the-login v-if="!isLogin" @loginok="loginok" />
  <div class="container" v-else>
    <div class="header-menu">
      <TheHeader
        @toggleMenu="
          (size) => {
            this.isMiniMenu = size;
          }
        "
        :idAccount="accountId"
      />
    </div>
    <div class="container-content">    
        <router-view/>      
    </div>
  </div>
</template>

<script>
import TheHeader from "@/layout/TheHeader.vue";
import TheLogin from "./page/TheLogin.vue";
import { getById } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";

export default {
  name: "App",
  components: { TheHeader, TheLogin },
  created() {
    this.getDataUser();
  },
  data() {
    return {
      isMiniMenu: true,
      isLogin: true,
      roleUser: 0,
      accountId: "",
    };
  },
  methods: {
    logout() {
      this.isLogin = true;
    },
    loginok(res) {
      this.isLogin = false;
      console.log(res);
      this.roleUser = res.role;
    },
    getDataUser() {
      getById(
        "Accounts",
        localStorage.getItem("userId"),
        (res) => {
          if (res.data) {
            this.isLogin = false;
            this.roleUser = res.data.role;
            this.accountId = res.data.account_id;
          } else {
            this.isLogin = true;
          }
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          toast.error(Resource.VN_ErroData, {
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
@import url(@/assets/style/main.css);
</style>
