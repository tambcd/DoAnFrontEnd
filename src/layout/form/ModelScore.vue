<template>
  <Modal
    v-model:visible="toggerDialog"
    :title="titleScoreModel"
    ok-text="Lưu"
    cancel-text="Hủy"
    width="50%"
    @ok="hideModal"
  >
    <div class="top-inf">
      <div class="code_student">
        <div class="code">Mã sinh viên <span style="color: red">*</span></div>
        <div class="select_code">
          <Select
            v-model:value="valueCode"
            show-search
            placeholder="191203380"
            style="width: 200px"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            :options="dataCodeSutudent"
            @search="handleSearch"
            @change="handleChange"
          ></Select>
        </div>
      </div>
      <div class="name_student">
        <div class="fullname">Họ và tên</div>
        <div class="name-input">
          <Input v-model:value="valuenameStudent" :disabled="true" />
        </div>
      </div>
    </div>
    <div class="subject">
      <div class="name_subject">
        Tên học phần <span style="color: red">*</span>
      </div>
      <div class="subject-input">
        <Input
          v-model:value="valueNameSubject"
          placeholder="nhập tên học phần"
        />
      </div>
    </div>
    <div class="school_year">
      <div class="model_year">
        <div class="name_year">Năm học <span style="color: red">*</span></div>
        <div class="input_year">
          <Input v-model:value="valueSchoolYear" placeholder="2020-2021" />
        </div>
      </div>
      <div class="semester">
        <div class="name_semester">Học kỳ<span style="color: red">*</span></div>
        <div class="select_semester">
          <Select
            ref="select"
            v-model:value="valuesemester"
            style="width: 200px"
            @focus="focus"
            placeholder="Chọn học kỳ"
          >
            <SelectOption value="1">1</SelectOption>
            <SelectOption value="2">2</SelectOption>
          </Select>
        </div>
      </div>
    </div>
    <div class="score-inf">
      <div class="score-model">
        <div class="name_subject">
          Điểm tổng kết <span style="color: red">*</span>
        </div>
        <div class="subject_input">
          <InputNumber
            v-model:value="valueScore"
            placeholder="0,0"
            :min="1"
            :max="10"
            :step="0.01"
          />
        </div>
      </div>
      <div class="number_shif">
        <div class="name_subject">
          số tín chỉ <span style="color: red">*</span>
        </div>
        <div class="subject_input">
          <InputNumber
            v-model:value="valueNumber_shif"
            placeholder="0.0"
            :min="1"
            :max="10"
            :step="1"
          />
        </div>
      </div>
      <div class="times_learn">
        <div class="name">Lần học <span style="color: red">*</span></div>
        <div class="subject_input">
          <InputNumber
            v-model:value="valueTimesLearn"
            placeholder="0"
            :min="1"
            :max="3"
            :step="1"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { post ,put} from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";

import {
  Modal,
  Select,
  Input,
  InputNumber,
  SelectOption,
} from "ant-design-vue";
export default {
  components: { Modal, Select, Input, InputNumber, SelectOption },
  props: {
    dataUser: [],
    isToggler: { default: false },
    dataScore: {},
  },
  created() {
    this.toggerDialog = this.isToggler;
    this.dataRoot = this.dataUser;
    this.dataCodeSutudent = this.dataUser;
    this.ByData(this.dataScore);
  },
  mounted() {},
  data() {
    return {
      titleScoreModel: "Thêm điểm",
      idScore:"",
      toggerDialog: true,
      valuenameStudent: "",
      valueCode: "",
      valueScore: 0,
      valuesemester: "",
      valueTimesLearn: 0,
      valueNumber_shif: 0,
      valueNameSubject: "",
      valueSchoolYear: "",
      dataRoot: [],
      dataCodeSutudent: [],
    };
  },
  methods: {
    ByData(data) {
      if (data) {
        this.idScore = data.score_id
        this.titleScoreModel =  Resource.typeadd.update;
        this.valueScore = data.score_number,
        this.valuesemester = data.semester;
        this.valueNumber_shif = data.number_credits;
        this.valueNameSubject = data.subject_name;
        this.valueSchoolYear = data.school_year;
        this.valueCode = data.user_code;
        this.valuenameStudent = data.full_name;
        this.valueTimesLearn = data.study_times;
      } else {
        this.titleScoreModel = Resource.typeadd.add;
        (this.valueScore = 0), (this.valuesemester = "");
        this.valueNumber_shif = 0;
        this.valueNameSubject = "";
        this.valueSchoolYear = "";
        this.valueCode = "";
        this.valuenameStudent = "";
        this.valueTimesLearn = 0;
      }
    },
    hideModal() {
      if( this.titleScoreModel == Resource.typeadd.add){
        this.addScore();
      }
      else{
        this.updateScore();
      }
    },
    updateScore(){
       put(
        `Scores`,this.idScore,
        {
          score_id:this.idScore,
          score_number: this.valueScore,
          semester: Number(this.valuesemester),
          number_credits: this.valueNumber_shif,
          score_type: 1,
          subject_name: this.valueNameSubject,
          school_year: this.valueSchoolYear,
          user_code: this.valueCode,
          study_times: this.valueTimesLearn,
        },
        () => {
          this.toggerDialog = false;
          // Trường hợp thành công toast thồng báo
          toast.success(Resource.update, {
            autoClose: 2000,
            position: "bottom-right",
          });
          this.$emit("ReloadData");
        },
        (error) => {
          console.log(error);
        }
      );
    },

    addScore() {
      post(
        `Scores`,
        {
          score_number: this.valueScore,
          semester: Number(this.valuesemester),
          number_credits: this.valueNumber_shif,
          score_type: 1,
          subject_name: this.valueNameSubject,
          school_year: this.valueSchoolYear,
          user_code: this.valueCode,
          study_times: this.valueTimesLearn,
        },
        () => {
          this.toggerDialog = false;
          // Trường hợp thành công toast thồng báo
          toast.success(Resource.VN_AddSuccess, {
            autoClose: 2000,
            position: "bottom-right",
          });
          this.$emit("ReloadData");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    handleChange(txt) {
      this.valuenameStudent = txt;
      for (let i = 0; i < this.dataRoot.length; i++) {
        if (this.dataRoot[i].value === txt) {
          this.valuenameStudent = this.dataRoot[i].fullname;
          break;
        }
      }
    },
    handleSearch(text) {
      this.dataCodeSutudent = this.dataRoot.filter((obj) =>
        obj.value.includes(text)
      );
      console.log(this.dataRoot);
    },
  },
  watch: {
    isToggler(value) {
      this.toggerDialog = value;
    },
    toggerDialog(value) {
      this.$emit("hideDilog", value);
    },
    dataScore(value) {
      this.ByData(value);
    },
  },
};
</script>

<style >
</style>