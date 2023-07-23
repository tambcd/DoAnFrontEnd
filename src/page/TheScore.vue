<template>
  <ModelScore
    :isToggler="visibleScore"
    @hideDilog="hideDilog"
    :dataUser="listStudents"
    @ReloadData="ReloadData"
    :dataScore="updateScore"
  />
  <Modal
    v-model:visible="visibleDelete"
    title="Xóa điểm"
    @ok="handleOkDelete"
    width="50%"
    ok-text="Xóa"
    cancel-text="Hủy"
  >
    <span v-html="txtDelete"></span>
  </Modal>
  <div class="score">
    <div class="score-top">
      <div class="score-filter">
        <div class="search-score">
          <InputSearch
            v-model:value="filterScore.txtSearch"
            placeholder="nhập tên,mã sinh viên,tên môn học"
            style="width: 300px"
            @search="onSearch"
          />
        </div>
        <div class="filter-elr">
          <Select
            ref="select"
            v-model:value="valueHK"
            style="width: 200px; height: 35px"
            @focus="focus"
            placeholder="Chọn học kỳ"
          >
            <SelectOption value="all">Tất cả</SelectOption>
            <SelectOption value="2020-2021-1">2020-2021-1</SelectOption>
            <SelectOption value="2020-2021-2">2020-2021-2</SelectOption>
            <SelectOption value="2021-2022-1">2021-2022-1</SelectOption>
            <SelectOption value="2021-2022-2">2021-2022-2</SelectOption>
            <SelectOption value="2022-2023-1">2022-2023-1</SelectOption>
            <SelectOption value="2022-2023-2">2022-2023-2</SelectOption>
          </Select>
        </div>
        <div class="display-score">
          <Select
            ref="select"
            v-model:value="valueDisplay"
            style="width: 200px"
            @focus="focus"
            placeholder="tất cả điểm"
          >
            <SelectOption value="2020-2021-1">Tổng kết theo kỳ</SelectOption>
            <SelectOption value="2020-2021-2">Tất cả điểm</SelectOption>
          </Select>
        </div>
      </div>
      <div class="score-action">
        <div class="list-button">
          <DropdownButton type="primary" v-show="isActionTable">
            <a class="ant-dropdown-link" @click.prevent> Thêm </a>
            <template #overlay>
              <Menu>
                <MenuItem @click="addOne()">
                  <a>Thêm một bản ghi</a>
                </MenuItem>

                <MenuItem>
                  <input
                  class="custom-file-input"
                    type="file"
                    name="file"
                    @change="ImportScore()"
                    ref="fileInput"
                    accept=".xls,.xlsx"
                  />
                </MenuItem>
              </Menu>
            </template>
          </DropdownButton>
        </div>
      </div>
    </div>
    <div class="score-body">
      <div class="data-table-score">
        <Table
          :dataSource="dataSourceScores"
          :columns="columnsScore"
          :pagination="false"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key == 'STT'">
              {{ index + 1 }}
            </template>

            <template v-if="column.key === 'Action' && isActionTable">
              <Button
                type="primary"
                style="margin-right: 5px"
                @click="btnUpdate(record)"
                >Sửa</Button
              >
              
              <Button type="primary" danger @click="btndelete(record)"
                >Xóa</Button
              >
            </template>
          </template>
        </Table>
      </div>
      <div class="paging-score">
        <Pagination
          @showSizeChange="(a, b) => showsize(a, b)"
          @change="(a, b) => changeNumberPage(a, b)"
          v-model:current="filterScore.PageNumber"
          :total="sumRecordScore"
          :show-total="(total) => `Tổng: ${total} bản ghi`"
        >
          <template #buildOptionText="props">
            <span>{{ props.value }} Trang</span>
          </template>
        </Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Pagination,
  InputSearch,
  SelectOption,
  Select,
  Button,
  DropdownButton,
  MenuItem,
  Menu,
  Table,
  Modal,
} from "ant-design-vue";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import DataObject from "@/common/helper/object";
import { getByFilter, deleteOne, getById } from "@/common/api/api";
import { score4, statusScore } from "@/common/helper/format";
import _ from "lodash";
import ModelScore from "@/layout/form/ModelScore.vue";
import axios from "axios";

export default {
  components: {
    InputSearch,
    SelectOption,
    Select,
    Button,
    DropdownButton,
    MenuItem,
    Menu,
    Table,
    Pagination,
    ModelScore,
    Modal,
  },
  name: "TheScore",
  created() {
    this.getDataUser();

    this.DataSudent();
    if (!this.isActionTable) {
      this.columnsScore = DataObject.columnsScore;
    } else {
      this.columnsScore = DataObject.columnsScoreUser;
    }
  },
  data() {
    return {
      header: {
        "Content-Type": "multipart/form-data",
      },
      fileImport: null,
      isActionTable: false,
      idDelete: "",
      txtDelete: "",
      visibleDelete: false,
      updateScore: {},
      listStudents: [],
      visibleScore: false,
      valueDisplay: "Tất cả điểm",
      columnsScore: [],
      sumRecordScore: 0,
      dataSourceScores: [],
      valueHK: "Tất cả",
      filterScore: {
        PageNumber: 1,
        PageSize: 10,
        txtSearch: "",
        codeUser: "",
        schoolYear: "",
        semester: null,
      },
    };
  },
  methods: {
    ImportScore() {
      const formData = new FormData();
      formData.append("formFile", event.target.files[0]);
      axios
        .post("https://localhost:7155/api/v1/Scores/Import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() =>this.loadData())
        .catch((error) => {
          // Xử lý lỗi (nếu có)
          console.error(error);
        });
    },
    getDataUser() {
      getById(
        "Accounts",
        localStorage.getItem("userId"),
        (res) => {
          if (res.data.role == 1) {
            this.filterScore.codeUser = res.data.account_name;
            this.isActionTable = false;
          } else if (res.data.role == 0) {
            this.filterScore.codeUser = "";
            this.isActionTable = true;
          }
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

    ReloadData() {
      this.PageNumber = 1;
      this.loadData();
    },
    handleOkDelete() {
      deleteOne(
        "Scores",
        this.idDelete,
        () => {
          this.visibleDelete = false;
          toast.success(Resource.VN_DeleteSuccess, {
            autoClose: 2000,
            position: "top-center",
          });
          this.ReloadData();
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
    DataSudent() {
      getByFilter(
        "Users/getClass",
        {
          idClass: "0aee1c4c-3fd8-4182-8003-b10b27fc7262",
          txtSearch: "",
          PageSize: 100000,
          PageNumber: 1,
        },
        (res) => {
          if (res.data.length > 0) {
            // Trường hợp thành công  gửi lên form sửa
            res.data.map((item) => {
              this.listStudents.push({
                value: item.user_code,
                label: item.user_code,
                fullname: item.full_name,
              });
            });
          } else {
            this.listStudents = [];
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
    hideDilog(value) {
      this.visibleScore = value;
    },
    addOne() {
      this.updateScore = [];
      this.visibleScore = true;
    },
    handleChangeHk(a) {
      console.log(a);
    },
    btnUpdate(record) {
      this.visibleScore = true;
      this.updateScore = record;
    },
    btndelete(record) {
      this.txtDelete = `Bạn có chắc chắn muôn xóa điểm môn <b>${record.subject_name}</b> của sinh viên <b>${record.full_name}</b>?`;
      this.visibleDelete = true;
      this.idDelete = record.score_id;
    },
    changeNumberPage(a, b) {
      this.filterScore.PageNumber = a;
      this.filterScore.PageSize = b;
      this.loadData();
    },
    showsize(a, b) {
      this.filterScore.PageSize = b;
      this.filterScore.PageNumber = a;
      this.loadData();
    },
    loadData() {
      getByFilter(
        "Scores/getFilter",
        this.filterScore,
        (res) => {
          // Trường hợp thành công  gửi lên form sửa
          if (res.data.length > 0) {
            res.data.map((item) => {
              item.score_number_4 = score4(item.score_number);
              item.status = statusScore(item.score_number);
            });
            this.sumRecordScore = res.data[0].totalRecord;
            this.dataSourceScores = res.data;
          } else {
            this.sumRecordScore = 0;
            this.dataSourceScores = [];
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
  },
  watch: {
    "filterScore.txtSearch": _.debounce(function () {
      this.loadData();
    }, 500),
    valueHK(value) {
      if (value == "all") {
        this.filterScore.semester = null;
        this.filterScore.schoolYear = "";
      } else {
        this.filterScore.semester = Number(value.split("-")[2]);
        this.filterScore.schoolYear =
          value.split("-")[0] + "-" + value.split("-")[1];
      }
      this.loadData();
    },
  },
};
</script>

<style>
.custom-file-input {
  color: transparent;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: 'Nhập Khẩu';
  color: black;
  display: inline-block;
  background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active {
  outline: 0;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9); 
}
</style>