<template>
  <div class="home-chat">
    <div class="home-message">
      <ItemMessage/>
      <ItemMessage/>
      <ItemMessage/>
      <ItemMessage/>
      <ItemMessage/>
      <ItemMessage/>
      <ItemMessage/>
      <ItemMessage/>
      <ItemMessage/>
    </div>
    <div class="home-input-send">
      <div class="input-icon"><ion-icon name="happy-outline"></ion-icon></div>
      <div class="input-send">
        <InputSearch
          v-model:value="value"
          placeholder="Aa"
          size="large"
          @search="onSearch"
        >
          <template #enterButton>
            <ion-icon name="send-outline"></ion-icon>
          </template>
        </InputSearch>
      </div>
    </div>
  </div>
</template>
<script>
import { InputSearch } from "ant-design-vue";
import ItemMessage from '@/components/ItemMessage.vue';
// import { HomeOutlined } from '@ant-design/icons-vue';

export default {
  name: "TheHome",
  components: { InputSearch,ItemMessage },
  data() {
    return {
      value: "",
      dataSource: [
        {
          key: "1",
          stt: 32,
          msv: "10 Downing Street",
          name: "Mike",
        },
        {
          key: "2",
          stt: 42,
          msv: "10 Downing Street",
          name: "John",
        },
        {
          key: "3",
          stt: 32,
          msv: "10 Downing Street",
          name: "Mike",
        },
        {
          key: "4",
          stt: 42,
          msv: "10 Downing Street",
          name: "John",
        },
      ],
      current: 3,
      columns: [
        {
          title: "STT",
          dataIndex: "stt",
          key: "stt",
          resizable: true,
        },
        {
          title: "Mã sinh viên",
          dataIndex: "msv",
          key: "msv",
          resizable: true,
        },
        {
          title: "Họ và tên",
          dataIndex: "name",
          key: "name",
          resizable: true,
        },
      ],
    };
  },
  methods: {
    showsize(a, b) {
      console.log(a);
      console.log(b);
    },
    onSearch(value) {
      console.log(value);
    },
    handleResizeColumn(w, col) {
      col.width = w;
    },
  },
};
</script>

<style>
.input_search {
  width: 50%;
}
</style>