<template>
  <div class="btn_gr">
    <Button
      style="margin-right: 10px"
      block
      @click="setupReport()"
      class="summit_btn btn_1"
      v-if="tabIndex == 1"
    >
      Thiết lập
    </Button>
   
  </div>
  <Table
    :dataSource="dataSource"
    :columns="columns"
    :pagination="false"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.dataIndex === 'STT'">
        {{ index + 1 }}
      </template>
      <template v-if="column.dataIndex === 'statusDetail'">
        <Tag color="orange" v-if="record.statusDetail == 0">Chưa lập</Tag>
        <Tag color="blue" v-if="record.statusDetail == 1">Đang lập</Tag>
        <Tag color="cyan" v-if="record.statusDetail == 2">Chờ duyệt</Tag>
        <Tag color="green"  v-if="record.statusDetail == 3">Hoàn thành</Tag>
        <Tag color="red"  v-if="record.statusDetail == 4">Gửi trả</Tag>
      </template>
      <template v-if="column.dataIndex === 'stt_report'">
        <Tag color="orange" v-if="record.stt_report == 0">Chưa ban hành</Tag>
        <Tag color="green" v-else >Đã ban hành</Tag>
        
      </template>
      <template v-if="column.dataIndex === 'action'">
        <div class="action_btn" v-if="tabIndex != 6">
          <Tag color="blue" @click="openDetail(record)" v-if="tabIndex < 3">Chi tiết</Tag>
          <Tag color="blue" @click="AuditReportShow(record)" v-if="tabIndex == 4">Kiểm tra</Tag>
        <Tag color="orange" @click="openDetail(record)" v-if="tabIndex == 3">Sửa</Tag>
        <Tag color="cyan" @click="SubmitAction(record)" v-if="tabIndex == 3">Nộp</Tag>
        <Tag color="cyan" @click="openDetail(record)" v-if="tabIndex == 1">Thiết lập</Tag>
        <Tag color="green" @click="promulgateReport(record)" v-if="tabIndex == 1">Ban hành</Tag>
        <Tag color="blue" @click="openAuditDetail(record,5)" v-if="tabIndex == 5">Chi Tiết</Tag>
        <Tag color="blue" @click="openAuditDetail(record,6)" v-if="tabIndex == 6">Chi Tiết</Tag>
        <Tag color="blue" @click="openAuditDetail(record,7)" v-if="tabIndex == 7">Chi Tiết</Tag>
        </div>        
      </template>
    </template>
  </Table>
  <promulgate-item :dataPromulgateReport="dataPromulgateReport" @closeBH ="closeBH" v-if="PromulgateReportShowHide"  />
  <CreateReport @CloseCreate ="CloseCreate" v-if="IsCloseCreate"/>
  <audit-report  v-if="AuditReportShowHide" @CloseAudit ="CloseAudit" />
</template>
<script>
import { Button, Table ,Tag} from "ant-design-vue";
import { putNo } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import PromulgateItem from "./PromulgateItem.vue";
import CreateReport from './CreateReport.vue';
import AuditReport from './AuditReport.vue';

export default {
  props: {
    dataSource: [],
    columns: [],
    isEdit: { default: false },
    listSubmit: null,
    tabIndex: { default: 1 },
  },
  components: { Table, Button, PromulgateItem, CreateReport,Tag, AuditReport },
  created() {
    if (this.tabIndex == 1) {
      this.buttonName = "Ban hành";
    } else {
      this.buttonName = "Nộp báo cáo";
    }
  },
  data() {
    return {
      typeStatus:5,
      AuditReportItemWorkbook:null,
      PromulgateReportShowHide:false,
      AuditReportShowHide:false,
      IsCloseCreate:false,
      data: null,
      buttonName: "Nộp báo cáo",
      dataPromulgateReport :null,
      
    };
  },
  methods: {
    
    CloseAudit(){
      this.AuditReportShowHide = false; 
    },
    AuditReportShow(){
      this.AuditReportShowHide = true; 
    },
    CloseCreate(){
      this.IsCloseCreate = false
      this.$emit('ReloadData')
    },
    setupReport(){
      this.IsCloseCreate = true
    },
    promulgateReport(data){
      this.dataPromulgateReport = data;
      this.PromulgateReportShowHide = true;
    },
    closeBH(){
      this.dataPromulgateReport = null;
      this.PromulgateReportShowHide = false;
    },
    openDetail(data) {
      this.$emit("OpenDetail", data);
    },
    SubmitAction(data) {
        putNo(
          `ReportDetails/UpdateByReportDetailStatus?idReport=${data.report_detail_id}&status=2`,
          () => {
            toast.success(Resource.updateMessage, {
              autoClose: 2000,
              position: "bottom-right",
            });
            this.$emit('ReloadData')
          },
          (error) => {
            console.log(error);
          }
        );      
    },
  },
};
</script>

<style scoped>
.btn_gr {
  float: right;
}
.btn_gr .summit_btn {
  width: 100px;
}
</style>