<template>
  <router-link to="/home">
    <div class="menu_item_logo">
      <div class="icon_menu_class icon30"></div>
    </div>
  </router-link>  
  <BaseItemMenu :isRouter="item.path" v-for="item in listItemMenu" :key="item.ItemID" :content="item.ItemTxt" :classIcon ="item.item_icon" />
</template>

<script>
import BaseItemMenu from "./BaseItemMenu.vue";
import DataObject from "@/common/helper/object";

export default {
  name: "TheMenu",
  components: { BaseItemMenu },
  data() {
    return {
      listItemMenu:DataObject.optionMenu
    }
  },
};
</script>

<style>
</style>