<template>
  <Table :dataSource="dataSource" :columns="columns" :pagination="false"  >
    <template  #bodyCell="{ column, record ,index}" >
      <template v-if="column.dataIndex === 'STT'">
        {{index+1}}
      </template>
      <template v-if="column.dataIndex === 'stt_report'">
        <div v-if="!record.stt_report">
          Chưa lập 
        </div>
        <div v-else>
          Đang lập
        </div>      
      </template>
      <template v-if="column.dataIndex === 'action'">
        <a @click="openDetail(record)">Xem chi tiết</a>
      </template>
    </template>
  </Table>
</template>

<script>
import { Table } from "ant-design-vue";
export default {
  props: {
    dataSource: [],
    columns: [],
  },
  components: { Table },
  data() {
    return {};
  },
  methods: {
    openDetail(data) {
      this.$emit("OpenDetail", data);
    }    
  },
};
</script>

<style>
</style>