<template>  
  <div class="topbar">
    <div class="toggle" @click="toggleMenu()"><ion-icon name="menu-outline"></ion-icon></div>
    <div class="name-class">CNTT1 K60</div>
    <div class="header_right">
    <div class="icon_notify icon24"></div>
    <button class="user_icon icon36">TT</button>
   
</div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      miniMenu:false
    }
  },
  methods: {
    toggleMenu(){
      this.miniMenu = !this.miniMenu
      this.$emit("toggleMenu",this.miniMenu)
    },
  },
};
</script>

<style>
</style>