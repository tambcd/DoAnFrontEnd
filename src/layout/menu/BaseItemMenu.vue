<template>
  <Tooltip placement="right" >
    <template #title v-if="isTootip">
      <span>{{titleTootip}}</span>
    </template>
    <li>
      <router-link :to="isRouter">
        <span class="icon"><ion-icon :name="classIcon"></ion-icon></span>
        <span class="title">{{ content }} </span>
      </router-link>
    </li>
  </Tooltip>
</template>

<script>
import { Tooltip } from "ant-design-vue";

export default {
  name: "BaseItemMenu",
  components: { Tooltip },
  props: {
    isTootip:{default:true},
    titleTootip:{default:""},
    classIcon: { default: "" },
    content: { default: "" },
    isRouter: {
      default: "/",
    },
  },
};
</script>

<style>
</style>