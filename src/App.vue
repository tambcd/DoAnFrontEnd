<template>

  <div class="the__main">
    <div class="the__menu">
        <TheMenu/>
      </div>
   
    <div class="the__body">
       <div class="the__header">
          <TheHeader/>
    </div>
      <div class="the__content">
          <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import TheMenu from '@/layout/menu/TheMenu.vue'
import TheHeader from '@/layout/TheHeader.vue'
export default {
  name: 'App',
  components: {TheMenu,TheHeader  }
}
</script>

<style>
  @import url(@/assets/style/main.css);
</style>
