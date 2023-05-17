<template>

<table class="rwd-table">
    <tbody>
      <tr>
        <th v-for="(item,index) in columns" :key="index">{{item.title}} </th>        
      </tr>  
      <BaseRowTable v-for="(item) in dataTable " :key="item.user_code" :itemRow="item"/> 
     
    </tbody>
  </table>
  
</template>

<script>
import BaseRowTable from './BaseRowTable.vue';

export default {
  props: { dataTable: [],columns:[] },
  components:{BaseRowTable},
  created() {
  },
  data() {
    return {
     
    };
  },
};
</script>

<style>
</style>