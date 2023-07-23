<template>
    <ModelStudent :isToggler="isShowModel" @hideDilog ="(value)=>{this.isShowModel = value}" @ReloadData="ReloadData"/>

  <div class="student">
    <div class="student-top">
      <div class="search">
        <label>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, mã sinh viên"
            v-model="txtSearch"
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
        <Button type="primary" :size="70" @click="openModel()">
          <template #icon>
            <PlusOutlined />
          </template>
          Thêm sinh viên
        </Button>
      </div>
    </div>

    <div class="data-table-student">
      <Table
        :dataSource="dataStudent"
        :columns="columnsStudent"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            {{record.status = 1 ? "Đang học" : record.status = 2 ? "Bảo lưu" : "Nghỉ học"}}
          </template>
          <template v-if="column.key === 'Action'">
            <Button
              type="primary"
              style="margin-right: 5px"
              @click="btnUpdate(record)"
              >Sửa</Button
            >
            <Popconfirm title="Bạn chắc chắn muốn xóa sinh viên？" @confirm ="btndelete(record)" okText="Có" cancelText="Hủy"> 
              <template #icon
                ><question-circle-outlined style="color: red"
              /></template>
              <Button type="primary" danger 
              >Xóa</Button
            >
            </Popconfirm>
           
          </template>
        </template>
      </Table>
    </div>
    <div class="paging">
      <Pagination
        v-model:current="PageNumber"
        :total="sumRecord"
        @showSizeChange="(a, b) => showsize(a, b)"
        :show-total="(total) => `Sĩ số ${total} sinh viên`"
        @change="(a, b) => changeNumberPage(a, b)"
      >
        <template #buildOptionText="props">
          <span>{{ props.value }} Trang</span>
        </template>
      </Pagination>
    </div>
  </div>
</template>

<script>
import { Button, Pagination, Table,Popconfirm } from "ant-design-vue";
import { FileExcelOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { getByFilter ,deleteOne} from "@/common/api/api";
import { dateToStringShow } from "@/common/helper/format";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import DataObject from "@/common/helper/object";
import _ from "lodash";
import ModelStudent from '@/layout/form/ModelStudent.vue';

export default {
  components: {
    Button,
    FileExcelOutlined,
    PlusOutlined,
    Table,
    Pagination,
    Popconfirm,
    ModelStudent
  },
  created() {
    this.loadData();
  },
  data() {
    return {
      isShowModel:false,
      initUser:{},
      sumRecord: 0,
      txtSearch: "",
      PageNumber: 1,
      PageSize: 10,
      dataStudent: [],
      columnsStudent: DataObject.columnsStudent,
    };
  },
  methods: {
    ReloadData(){
      this.PageNumber = 1;
      this.loadData();
    },
    openModel(){
      this.isShowModel = true
    },
    btndelete(record){
     deleteOne(
        "account",
        record.account_id,
        () => {
          this.visibleDelete = false;
          toast.success(Resource.VN_DeleteSuccess, {
            autoClose: 2000,
            position: "top-center",
          });
           this.loadData();
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
    changeNumberPage(a, b) {
      this.PageNumber = a;
      this.PageSize = b;
      this.loadData();
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
          if (res.data.length > 0) {
            // Trường hợp thành công  gửi lên form sửa
            res.data.map((item) => {
              item.date_of_birth = dateToStringShow(item.date_of_birth);
            });
            this.dataStudent = res.data;
            this.sumRecord = res.data[0].totalRecord;
          } else {
            this.dataStudent = [];
            this.sumRecord = 0;
          }
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
    searchInput() {
      this.loadData();
    },
  },
  watch: {
    txtSearch: _.debounce(function (data) {
      this.searchInput(data);
    }, 500),
  },
};
</script>

<style>
</style>