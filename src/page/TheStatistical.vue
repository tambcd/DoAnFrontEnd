<template>
<div class="container-report">
  <Image
    :width="350"
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  />
  <Image
    :width="350"
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  />
  <Image
    :width="350"
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  />
  
</div>
</template>

<script>
import { Image } from "ant-design-vue";
export default {
  name: "TheStatistical",
  components:{Image}
};
</script>

<style scoped>
.container-report{
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
</style>