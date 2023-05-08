<template>  
    <span tooltip="" :flow="position" v-if="!displayTooltip"><slot></slot></span>
    <span :tooltip="tooltipText" :flow="position" v-else><slot></slot></span>
 
</template>

<script>
export default {
  name: "BaseTooltip",
  props: {
    /** nhãn tooltip */
    tooltipText: {
      type: String,
      default: "",
    },
    /** vị trí tooltip */
    position: {
      default: "down",
      type: String,
    },
    displayTooltip:{
      default:true,
      type:Boolean
    }
  },

}
</script>

<style  scoped>


</style>
