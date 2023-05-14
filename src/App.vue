<template>
   <div class="container">
       <TheMenu :miniMenu="isMiniMenu"/>
        <div class="main" :class="{active:isMiniMenu }">
           <TheHeader @toggleMenu="(size)=>{this.isMiniMenu = size}" />
            <div class="main-body">
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
  components: {TheMenu,TheHeader },
  data() {
    return {
      isMiniMenu:false
    }
  },
}
</script>

<style>
  @import url(@/assets/style/main.css);
</style>
