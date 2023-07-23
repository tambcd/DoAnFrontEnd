<template>
  <Modal
    v-model:visible="toggerDialog"
    title="Sửa người dùng"
    ok-text="Lưu"
    cancel-text="Hủy"
    width="100%"
    wrap-class-name="full-modal"
    @ok="hideModal"
  >
    <div class="top-inf">
      <div class="code_student">
        <div class="code">Mã người dùng <span style="color: red">*</span></div>
        <div class="select_code">
          <Input v-model:value="studentCode" placeholder="Mã người dùng" />
        </div>
      </div>
      <div class="name_student_fisrt">
        <div class="first_name">Họ đệm <span style="color: red">*</span></div>
        <div class="name-input">
          <Input v-model:value="studenFirstname" placeholder="Trần Văn" />
        </div>
      </div>
      <div class="name_student_last">
        <div class="last_name">Tên <span style="color: red">*</span></div>
        <div class="name-input">
          <Input v-model:value="studentLastname" placeholder="A" />
        </div>
      </div>
    </div>
    <div class="top-inf">
      <div class="code_student">
        <div class="code">Mật khẩu <span style="color: red">*</span></div>
        <div class="select_code">
          <InputPassword v-model:value="studentPass" />
        </div>
      </div>
      <div class="name_student_fisrt">
        <div class="first_name">Email</div>
        <div class="name-input">
          <Input v-model:value="studentEmail" placeholder="abc@gmail.com" />
        </div>
      </div>
      <div class="name_student_last">
        <div class="last_name">Số điện thoại</div>
        <div class="name-input">
          <Input v-model:value="studentPhone" placeholder="0392857234" />
        </div>
      </div>
    </div>
    <div class="top-inf">
      <div class="code_student">
        <div class="code">Ngày sinh<span style="color: red">*</span></div>
        <div class="select_code">
          <DatePicker v-model:value="studetDob" format="DD//MM/YYYY" />
        </div>
      </div>
      <div class="name_student_fisrt">
        <div class="first_name">Giới tính</div>
        <div class="name-input">
          <RadioGroup v-model:value="valueGender">
            <Radio :value="0">Nam</Radio>
            <Radio :value="1">Nữ</Radio>
            <Radio :value="2">khác</Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="name_student_last">
        <div class="last_name">Trạng thái</div>
        <div class="name-input">
          <RadioGroup v-model:value="valueStatus">
            <Radio :value="0">Nghỉ học</Radio>
            <Radio :value="1">Đang học</Radio>
            <Radio :value="2">Bảo lưu</Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
    <div class="top-inf">
      <div class="code_student">
        <div class="code">Vai trò<span style="color: red">*</span></div>
        <div class="select_code">
          <RadioGroup v-model:value="valueRole">
            <Radio :value="0">Giảng viên</Radio>
            <Radio :value="1">Sinh viên</Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import {
  Modal,
  Input,
  InputPassword,
  DatePicker,
  RadioGroup,
  Radio,
} from "ant-design-vue";
import { post } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
export default {
  components: { Modal, Input, InputPassword, DatePicker, RadioGroup, Radio },

  props: {
    isToggler: { default: false },
  },
  created() {
    this.toggerDialog = this.isToggler;
  },
  data() {
    return {
      toggerDialog: true,
      valueGender: 0,
      valueStatus: 1,
      valueRole: 1,
      studetDob: null,
      studentEmail: "",
      studentPhone: "",
      studentPass: "",
      studentLastname: "",
      studenFirstname: "",
      studentCode: "",
      accountId: "",
    };
  },
  methods: {
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    hideModal() {
      this.accountId = this.uuidv4();
      console.log(this.accountId);
      this.addAccount();
    },

    addAccount() {
        let gender = "Nam";
      if (this.valueGender == 1) {
        gender = "Nữ";
      }
      if (this.valueGender == 2) {
        gender = "Khác";
      }
      post(
        `Accounts/CreateUser`,
        {
          user: {
            first_name: this.studenFirstname,
            last_name: this.studentLastname,
            gender: gender,
            date_of_birth: this.studetDob,
            email: this.studentEmail,
            phone_number: this.studentPhone,
            status: this.valueStatus,
            account_id: this.accountId,
            user_code: this.studentCode
          },
          userAccount: {
            account_id: this.accountId,
            account_name: this.studentCode,
            password: this.studentPass,
            role: this.valueRole
          },
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
   
  },
  watch: {
    isToggler(value) {
      this.toggerDialog = value;
    },
    toggerDialog(value) {
      this.$emit("hideDilog", value);
    },
  },
};
</script>

<style >
.ant-picker-focused,
.ant-picker {
  width: 100%;
}
.full-modal .ant-modal {
  max-width: 100%;
  top: 0;
  padding-bottom: 0;
  margin: 0;
}
.full-modal .ant-modal-content {
  display: flex;
  flex-direction: column;
  height: calc(100vh);
}
.full-modal .ant-modal-body {
  flex: 1;
}
</style>