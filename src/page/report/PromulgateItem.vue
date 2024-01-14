<template>
  <Modal
    v-model:visible="toggerDialog"
    title="Thiết lập ban hành"
    ok-text="Ban hành"
    cancel-text="Hủy"
    width="500px"
    @ok="saveAction"
    @cancel="hideModal"
  > 
  <Checkbox
      v-model:checked="stateGV"
      @change="onCheckAllChange"
    >
      Giảng viên
    </Checkbox>
    <br/>
    <Checkbox
      v-model:checked="stateSV"
      @change="onCheckAllChange"
    >
      Sinh viên
    </Checkbox>
  </Modal>
</template>

<script>
import { Modal,Checkbox } from "ant-design-vue";
import { get,post } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
export default {
  components: { Modal ,Checkbox},
  props:{
    dataPromulgateReport:null
  },
  data() {
    return {
      toggerDialog: true,
      stateGV:false,
      stateSV:false,
      plainOptions:['Apple', 'Pear', 'Orange']
    };
  },
  methods: {    
    hideModal(){
      this.$emit("closeBH");      
    },
    createNotify(){
      post(
        `Notifications`,
        {
          notification_content: "",
          typelink: 1,
          create_by: localStorage.getItem("userId"),
        },
        () => {         
        },
        (error) => {
          console.log(error);
        }
      );
    },
    saveAction(){
      console.log(this.dataPromulgateReport);
      if(this.dataPromulgateReport == null) return;
        let a= 0;
        if(this.stateSV && this.stateGV ){
          a= 3
        }
        if(this.stateSV && !this.stateGV ){
           a= 2
        }
        if(!this.stateSV && this.stateGV ){
           a= 1
        }
        get(
          `Reports/PromulgateByReport?status=${a} &IdReport=${this.dataPromulgateReport.report_id}`,
        () => {
          toast.success("Ban hành thành công ! ", {
            autoClose: 2000,
            position: "top-center",
          });
          this.createNotify();
          this.$emit("closeBH");
        },
        () => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          toast.error(Resource.VN_ErroData, {
            autoClose: 2000,
            position: "top-center",
          });
        }
      );
    }
  },
};
</script>

<style>
</style>