<template>
  danh sach nhan vien
  <div class="input_search">

  <InputSearch
      v-model:value="value"
      placeholder="input search text"
      enter-button
      @search="onSearch"
    />
  </div>
  <div class="btn_add">
    <Button  type="primary">
      <Plusoutlined />Thêm sinh viên
    </Button>
  </div>

  <Table :columns="columns" :pagination="false" :dataSource="dataSource"   :loading="loading"></Table>
  <Pagination v-model:current="current" :total="500" @showSizeChange="(a,b)=>showsize(a,b)" :show-total="total => `Total ${total} items`"/>

</template>

<script>
import { Pagination,Table  ,InputSearch,Button} from "ant-design-vue";

export default {
    name:"TheHome",
    components:{Pagination,Table ,InputSearch,Button},
    data() {
      return {
        value:"",
         dataSource: [
          {
            key: '1',
            stt: 32,
            msv: '10 Downing Street',
            name: 'Mike',
          },
          {
            key: '2',
            stt: 42,
            msv: '10 Downing Street',
            name: 'John',
          },
           {
            key: '3',
            stt: 32,
            msv: '10 Downing Street',
            name: 'Mike',
          },
          {
            key: '4',
            stt: 42,
            msv: '10 Downing Street',
            name: 'John',
          },
          
        ],
        current:3,
         columns: [
          {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
          },
          {
            title: 'Mã sinh viên',
            dataIndex: 'msv',
            key: 'msv',
          },
          {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
          },
        ],
      }
    },
    methods: {
      showsize(a,b){
          console.log(a);
          console.log(b);
      },
      onSearch(value){
        console.log(value);
      }
    },
}
</script>

<style>
.input_search{
  width: 50%;
}
</style>