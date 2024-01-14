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
    title="Tổng quan điểm"
    @ok="handleOkDelete"
    width="100%"
    wrap-class-name="full-modal"
    ok-text="Xóa"
    cancel-text="Hủy"
    :footer="null"
  >
    <div class="hearder_chart_score">
      <Select
        ref="select"
        v-model:value="valueHKChart"
        style="width: 200px; height: 35px"
        @focus="focus"
        placeholder="Chọn học kỳ"
        @change="changeSemesterChart()"
        
      >
        <SelectOption value="all">Tất cả</SelectOption>
        <SelectOption v-for="semester in Semesters" :key="semester.semester" :value="semester.semester">Kỳ {{ semester.semester }} </SelectOption>

      </Select>
    </div>
    <div class="body_chart_score">
      <Bar :data="chartData" />
    </div>
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
            @change="filterSemester"
          >
            <SelectOption value="all">Tất cả</SelectOption>
            <SelectOption v-for="semester in Semesters" :key="semester.semester" :value="semester.semester">Kỳ {{ semester.semester }} </SelectOption>
         
          </Select>
        </div>
        <div class="display-score">          
        </div>
      </div>
      <div class="score-action">
        
        <div class="list-button">
          <Button @click="btndelete()" type="primary" danger>Thống kê</Button>

          <DropdownButton type="primary">
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
          :dataSource="dataFilterScores"
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
import { getByFilter, deleteOne, getById, get } from "@/common/api/api";
import { score4, statusScore } from "@/common/helper/format";
import _ from "lodash";
import ModelScore from "@/layout/form/ModelScore.vue";
import axios from "axios";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
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
    Bar,
  },
  name: "TheScore",
  created() {
    this.getDataUser();
    this.getSemester()

    this.DataSudent();
    if (!this.isActionTable) {
      this.columnsScore = DataObject.columnsScore;
    } else {
      this.columnsScore = DataObject.columnsScoreUser;
    }
  },
  data() {
    return {
      Semesters:[],
      chartData: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
          {
            label: "Sinh viên",
            backgroundColor: "#f87979",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      options: {
        responsive: true,
      },
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
      sumRecordScore: 100,
      dataSourceScores: [],
      dataFilterScores: [],
      valueHK: "Tất cả",
      valueHKChart: "Tất cả",
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
    filterSemester(){
      if(this.valueHK == "all"){
        this.dataFilterScores = this.dataSourceScores;
      }
      else{
        this.dataFilterScores = this.dataSourceScores.filter((obj) => obj.semester == this.valueHK);
      }      
    },
    changeSemesterChart(){
      let data =[];
      if(this.valueHK == "all"){
         data = this.dataSourceScores;
      }
      else{
        data = this.dataSourceScores.filter((obj) => obj.semester == this.valueHKChart);
      } 
      this.chartScore(data);
      console.log(this.chartData.datasets[0]);
    },
    chartScore(data) {
      this.chartData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      data.forEach((number) => {       
          this.chartData.datasets[0].data[Math.round(number.sore_number)]++;        
      });

    },
    ImportScore() {
      const formData = new FormData();
      formData.append("formFile", event.target.files[0]);
      axios
        .post("https://localhost:7155/api/v1/Scores/Import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success(Resource.ImportMessage, {
            autoClose: 2000,
            position: "top-center",
          });
          this.loadData();
          this.getSemester()
        })
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
    btndelete() {
      this.chartScore(this.dataSourceScores);
      this.visibleDelete = true;
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
    getSemester(){
      get(
        "Scores/getSemester",
        (res) => {
          // Trường hợp thành công  gửi lên form sửa
          if (res.data.length > 0) {            
            this.Semesters = res.data;
          } else {
            this.Semesters = [];
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
    loadData() {
      get(
        "Scores",
        (res) => {
          // Trường hợp thành công  gửi lên form sửa
          if (res.data.length > 0) {
            res.data.map((item) => {
              item.score_number_4 = score4(item.sore_number);
              item.status = statusScore(item.sore_number);
            });
            this.dataSourceScores = res.data;
            this.dataFilterScores = res.data;
          } else {
            this.sumRecordScore = 0;
            this.dataSourceScores = [];
            this.dataFilterScores = [];
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
      
      this.dataFilterScores = this.dataSourceScores.filter(obj => obj.subject_name.includes(this.filterScore.txtSearch));

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
.hearder_chart_score {
  height: 50px;
}
.body_chart_score {
  height: calc(95% - 50px);
}
.custom-file-input {
  color: transparent;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "Nhập Khẩu";
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