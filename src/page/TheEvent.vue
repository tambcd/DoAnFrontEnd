<template>
  <dialog-event/>
  <div class="main-event">
    <div class="event-header">
      <div class="search">
        <label>
          <input type="text" placeholder="Tìm kiếm theo tiêu đề sự kiện" />
          <ion-icon name="search-outline"></ion-icon>
        </label>
      </div>
      <div class="btn-add">
         <Button type="primary" :size="70">
          <template #icon>
           <PlusOutlined />
          </template>
          Thêm sự kiện
        </Button>
      </div>
    </div>
    <div class="items">
      <div class="item" v-for="(item, index) in data" :key="index">
        <ion-icon name="document-text-outline" class="document icon icon24"></ion-icon>
          <div class="content-item">
            <div class="header">{{ item.title }}</div>
            <div class="content">
              <div class="create-date">
                Ngày tạo : {{ item.created_date }}
              </div>
              <div class="deadline">Thời gian nộp bài: {{ item.deadline }}</div>
            </div>
            
          </div>
          <div class="progess">{{ item.complete }}/{{ item.all }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "ant-design-vue";
import { PlusOutlined } from '@ant-design/icons-vue';
import DialogEvent from '@/layout/form/DialogEvent.vue';

export default {
    name:"TheEvent",
    components:{Button,PlusOutlined,DialogEvent},
    data() {
      return {
        data:[{
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      },
      {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      },
      {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      },
       {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      },
       {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }, {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      },
      {
        title : 'Title',
        created_date : '10/05/2023 22:55',
        deadline : '26/05/2023 22:55',
        complete : 0,
        all : 2
      }
    ]
      }
    },
  
  
}
</script>

<style scoped>

</style>