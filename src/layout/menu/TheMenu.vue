<template>
 <div class="navigation" :class="{'active':miniMenu}">
            <ul>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="logo-apple-appstore"></ion-icon></span>
                        <span class="title">Bran name </span>
                    </a>
                </li>
                <BaseItemMenu v-for="(item,index) in listItemMenu" :key="index" :classIcon="item.item_icon" :content="item.ItemTxt" :isRouter="item.path"/>
               
                
            </ul>
        </div>
  
</template>

<script>
import BaseItemMenu from "./BaseItemMenu.vue";
import DataObject from "@/common/helper/object";

export default {
  name: "TheMenu",
  props:{
    miniMenu:{default:false}
  },
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