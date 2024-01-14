<template>
  <Modal
    v-model:visible="toggerDialog"
    :title="titleModel"
    ok-text="Lưu"
    cancel-text="Hủy"
    width="100%"
    wrap-class-name="full-modal"
    @ok="hideModal"
  >
    <div class="schedule_top">
      <div class="Title_Schedule">
        <h3>Tiêu đề <span style="color: red">*</span></h3>
      </div>
      <div class="select_code">
        <Input
          v-model:value="initEvent.schedule_name"
          placeholder="Nhập tiêu đề sự kiên..."
        />
      </div>
    </div>
    <div class="schedule_time">
      <div class="schedule_time_title">Thời gian hoàn thành</div>
      <div class="schedule_time_input">
          <ConfigProvider :locale="locale">
          <RangePicker
              width: 100%
            :show-time="{ format: 'HH:mm' }"
            format="HH:mm DD-MM-YYYY"
            :placeholder="['Ngày bắt đầu', 'Ngày kết thúc']"
            @change="onRangeChange"
            @ok="onRangeOk"
          />
          </ConfigProvider>
        </div>      
    </div>
    <div class="content_schdule">
      <div class="title_content">
        Nội dung
      </div>
      <div class="title_content_input">
        <Textarea rows="10" placeholder="Nhập nội dung sự kiện" v-model:value="initEvent.schedule_content" /> 
      </div>
    </div>
    <div class="type_event">
        <Checkbox v-model:checked="checked" @change="ChangeType()">Sinh viên xác nhận</Checkbox>

    </div>
   
  </Modal>
</template>

<script>
import { Modal, Input, RangePicker,ConfigProvider,Textarea,Checkbox } from "ant-design-vue";
import { post } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
export default {
  components: { Modal, Input, RangePicker,ConfigProvider,Textarea,Checkbox },
  props: {
    isShowActionEvent: { default: false },
    dataEvent:{},
  },
  created() {
    this.toggerDialog = this.isShowActionEvent;
  },
  data() {
    return {
      checked:false,
      locale:locale,
      titleModel: "Thêm sự kiện mới",
      toggerDialog: false,
      dataCodeSutudent: [
        {
          value: "12323",
          label: "123132",
        },
      ],
      initEvent: {
        schedule_name: "",
        schedule_content: "",
        time_start: "",
        time_end: "",
        schedule_type: 0,
        class_room_id: "0aee1c4c-3fd8-4182-8003-b10b27fc7262",
        account_id: "8c90f8b6-1952-470a-96e8-84983553bafb",
      },
    };
  },
  methods: {
    ByData(data) {
      if (data) {
        this.titleModel = Resource.typeAddEvent.update
        this.initEvent.schedule_name = data.schedule_name
        this.initEvent.schedule_content = data.schedule_content
        this.initEvent.time_start = data.time_start
        this.initEvent.time_end = data.time_end
        this.initEvent.schedule_type = data.schedule_type
      } else {
        this.titleModel = Resource.typeAddEvent.add
        this.initEvent = {
        schedule_name: "",
        schedule_content: "",
        time_start: new Date(),
        time_end: new Date(),
        schedule_type: 0,
        class_room_id: "0aee1c4c-3fd8-4182-8003-b10b27fc7262",
        account_id: "8c90f8b6-1952-470a-96e8-84983553bafb",
      }
      }
    },
    hideModal(){
        this.addEvent()    
    },
    addEvent() {
      post(`Schedules`,
      {
        schedule_name: this.initEvent.schedule_name,
        schedule_content: this.initEvent.schedule_content,
        time_start: this.initEvent.time_start,
        time_end: this.initEvent.time_end,
        schedule_type: this.initEvent.schedule_type,
        class_room_id: "0aee1c4c-3fd8-4182-8003-b10b27fc7262",
        account_id: "8c90f8b6-1952-470a-96e8-84983553bafb",
      } ,
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
    ChangeType(){
        if(this.checked){
          this.schedule_type=1
        }else{
          this.schedule_type = 0
        }

    },
    onRangeChange(value,valueTime){
      console.log(valueTime);
      this.initEvent.time_start = value[0].$d
      this.initEvent.time_end = value[1].$d
    }
  },
  watch: {
    isShowActionEvent(value) {
      this.toggerDialog = value;
    },
    toggerDialog(value) {
      this.$emit("hideDilog", value);
    },
      dataEvent(value) {
      this.ByData(value);
    },
  },
};
</script>

<style >
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