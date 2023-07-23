<template>
  <div class="topbar">
    <div class="toggle" @click="toggleMenu()">
      <ion-icon name="menu-outline"></ion-icon>
    </div>
    <div class="name-class">CNTT1 K60</div>
    <div class="header_right">
      <div class="icon_notify icon24"></div>
     
      <Popover   >
        <template #content> 
          <div class="user-detail">
             <button class="user_icon icon36">{{ TitliAvatar }}</button>
          </div>
          <div class="name-user">
            {{user.first_name+" "+user.last_name}}
          </div>
          <Button  style="width: 100%" type="primary" ghost>Chi tiết</Button>
           </template>
        <button class="user_icon icon36">{{ TitliAvatar }}</button>
      </Popover>
    </div>
  </div>
</template>

<script>
import { getById } from "@/common/api/api";
import { Popover,Button } from "ant-design-vue";

export default {
  name: "TheHeader",
  components: { Popover,Button },
  props: {
    idAccount: { default: "" },
  },
  created() {
    this.getDataUser();
  },
  data() {
    return {
      miniMenu: true,
      user: {},
      TitliAvatar: "TT",
    };
  },
  methods: {
    toggleMenu() {
      this.miniMenu = !this.miniMenu;
      this.$emit("toggleMenu", this.miniMenu);
    },
    getDataUser() {
      getById(
        "Users/getByIdAccount",
        localStorage.getItem("userId"),
        (res) => {
          this.user = res.data;
          console.log(this.user);
          this.TitliAvatar = this.getAvatar(
            this.user.first_name,
            this.user.last_name
          );
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          console.log(error);
        }
      );
    },
    getAvatar(fisrtName, lastName) {
      if (fisrtName[0] && lastName[0]) return fisrtName[0] + lastName[0];
      else return "TT";
    },
  },
  watch: {},
};
</script>

<style>
.user-detail{
  width: 130px;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>