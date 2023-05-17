<template>
  <div class="student">
    <div class="student-top">
      <div class="search">
        <label>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, mã sinh viên"
            v-model="txtSearch"
            @input="searchInput"
          />
          <ion-icon name="search-outline"></ion-icon>
        </label>
      </div>
      <div class="list-button">
        <Button type="primary" :size="70">
          <template #icon>
            <FileExcelOutlined />
          </template>
          Xuất danh sách SV
        </Button>
        <Button type="primary" :size="70">
          <template #icon>
            <PlusOutlined />
          </template>
          Thêm sinh viên
        </Button>
      </div>
    </div>

    <div class="data-table-student">
      <BaseTable :dataTable="dataStudent" :columns="columnsStudent" />
    </div>
    <div class="paging">
      <Pagination
        v-model:current="PageNumber"
        :total="sumRecord"
        @showSizeChange="(a, b) => showsize(a, b)"
        :show-total="(total) => `Sĩ số ${total} sinh viên`"
        @change ="(a, b) => changeNumberPage(a, b)" >

        <template #buildOptionText="props">
      <span>{{ props.value }} Trang</span>
    </template>
      </Pagination>
    </div>
  </div>
</template>

<script>
import { Button, Pagination } from "ant-design-vue";
import { FileExcelOutlined, PlusOutlined } from "@ant-design/icons-vue";
import BaseTable from "@/components/table/BaseTable.vue";
import { getByFilter } from "@/common/api/api";
import { dateToStringShow } from "@/common/helper/format";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import DataObject from "@/common/helper/object";
import _ from "lodash";

export default {
  components: {
    Button,
    FileExcelOutlined,
    PlusOutlined,
    BaseTable,
    Pagination,
  },
  created() {
    this.loadData();
  },
  data() {
    return {
      sumRecord: 0,
      txtSearch: "",
      PageNumber: 1,
      PageSize: 10,
      dataStudent: [],
      columnsStudent: DataObject.columnsStudent,
    };
  },
  methods: {
    changeNumberPage(a,b){
      this.PageNumber = a
      this.PageSize = b
      this.loadData()
    },
    loadData() {
      getByFilter(
        "Users/getClass",
        {
          idClass: "0aee1c4c-3fd8-4182-8003-b10b27fc7262",
          txtSearch: this.txtSearch,
          PageSize: this.PageSize,
          PageNumber: this.PageNumber,
        },
        (res) => {
          // Trường hợp thành công  gửi lên form sửa
          res.data.map((item) => {
            item.date_of_birth = dateToStringShow(item.date_of_birth);
            item.action = "Sửa";
          });
          this.dataStudent = res.data;
          this.sumRecord = res.data[0].totalRecord;

          console.log(this.dataStudent);
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          toast.error(Resource.VN_ErroData, {
            autoClose: 2000,
            position: "top-center",
          });
          console.log(error);
        }
      );
    },
    showsize(a, b) {
      this.PageSize = b;
      this.PageNumber = a;
      this.loadData();
    },
    searchInput(){     
        this.loadData();
    }
  },
  watch: {
     txtSreach: _.debounce(function (data) {
      this.searchInput(data);
    }, 700),
  },
};
</script>

<style>
</style>