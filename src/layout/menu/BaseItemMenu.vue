<template>
  <router-link :to="isRouter">
<BaseTooltip position="right" :tooltipText="content" :displayTooltip="isTypeMenu">

    <div class="menu_item">
      <div class="icon24" :class="classIcon"></div>
    </div>
</BaseTooltip>
  </router-link>
</template>

<script>

export default {
name:"BaseItemMenu",
props:{
    classIcon:{default:""},
    content:{default:""},
    isTypeMenu:{default:true},
    isBottom:{default:false},
    isRouter:{
        default:"/"
    }
} 
}
</script>

<style>

</style>