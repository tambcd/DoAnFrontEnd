<template>
  <AutoComplete
    placeholder="Chọn kỳ học"
    :options="options"
    v-model:value="value"
    :dropdown-match-select-width="252"
    style="width: 252px; height: 50px"
    @select="onSelect"
    @search="handleSearch"
  >
    <template #option="{ value: val }">
      {{ val.split('@')[0] }} 
      <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
    </template>
  </AutoComplete>
</template>

<script>
import { AutoComplete } from "ant-design-vue";

export default {
  components: { AutoComplete },
  data() {
    return {
      value: "",
      options: [],
    };
  },
  methods: {
    handleSearch(val) {
        console.log(val);
      let res;
      if (!val || val.indexOf('@') >= 0) {
        res = [];
      } else {
        res = ['gmail.com', '163.com', 'qq.com'].map(domain => ({
          value : `${val}@${domain}`
        }));
      }
      this.options = res;
      console.log(this.value);
    },
  },
};
</script>

<style>
</style>