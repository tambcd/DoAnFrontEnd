<template>
  <div class="navigation" :class="{ active: miniMenu }">
    <ul>
      <li>
        <a href="#">
          <span class="icon"
            ><ion-icon name="logo-apple-appstore"></ion-icon
          ></span>
          <span class="title">ATM Class </span>
        </a>
      </li>
      <BaseItemMenu
        v-for="(item, index) in listItemMenu"
        :key="index"
        :classIcon="item.item_icon"
        :content="item.ItemTxt"
        :isRouter="item.path"
        :titleTootip="item.ItemTxt"
        :isTootip="miniMenu"
      />
        <li @click="logout()">
          <router-link to="/login">
          <span class="icon"><ion-icon name="log-out-outline"></ion-icon></span>
          <span class="title">Đăng xuất </span>
          </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import BaseItemMenu from "./BaseItemMenu.vue";
import DataObject from "@/common/helper/object";

export default {
  name: "TheMenu",
  props: {
    miniMenu: { default: true },
    roleUser: { default: 1 },
  },
  created() {
    if (this.roleUser == 1) {
      this.listItemMenu = DataObject.optionMenuUser;
    } else {
      this.listItemMenu = DataObject.optionMenuAdmin;
    }
  },
  components: { BaseItemMenu },
  data() {
    return {
      listItemMenu: DataObject.optionMenuUser,
    };
  },
  methods: {
    logout(){
      localStorage.clear();
      this.$emit("logout")
    }
  },
};
</script>

<style>
</style>