<template>
  <li>
    <router-link :to="isRouter">
      <span class="icon"><ion-icon :name="classIcon"></ion-icon></span>
      <span class="title">{{ content }} </span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "BaseItemMenu",
  props: {
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