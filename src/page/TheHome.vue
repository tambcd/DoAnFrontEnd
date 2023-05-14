<template>
  
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

  <Table :columns="columns" :pagination="false" :dataSource="dataSource"   :loading="loading" @resizeColumn="handleResizeColumn"></Table>
  <Pagination v-model:current="current" :total="500" @showSizeChange="(a,b)=>showsize(a,b)" :show-total="total => `Sĩ số ${total} sinh viên`"/>
  <DatePicker v-model:value="value1" />

  <HomeOutlined />


</template>
<script>
import { Pagination,Table  ,InputSearch,Button,DatePicker} from "ant-design-vue";
import { HomeOutlined } from '@ant-design/icons-vue';


export default {
    name:"TheHome",
    components:{Pagination,Table ,InputSearch,Button,DatePicker,HomeOutlined},
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
             resizable: true,
          },
          {
            title: 'Mã sinh viên',
            dataIndex: 'msv',
            key: 'msv',
             resizable: true,
          },
          {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
             resizable: true,
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
      },
       handleResizeColumn(w, col) {
        col.width = w;
      },
    },
}
</script>

<style>
.input_search{
  width: 50%;
}
</style>