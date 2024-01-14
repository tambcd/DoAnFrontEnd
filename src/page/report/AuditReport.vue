<template>
  <Modal
    v-model:visible="toggerDialogSetup"
    title="Thiết lập báo cáo"
    ok-text="Thiết lập"
    cancel-text="Hủy"
    width="100%"
    wrap-class-name="full-modal"
    @cancel="hideModal"
    :footer="null"
  >
    <div class="class_tag">
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="2" tab="Chưa kiểm tra"> </TabPane>
        <TabPane key="4" tab="Gửi trả"> </TabPane>
        <TabPane key="3" tab="Hoản thành"> </TabPane>
      </Tabs>
    </div>
    <Table :dataSource="dataSource" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'STT'">
          {{ index + 1 }}
        </template>     
    
        <template v-if="column.dataIndex === 'action'" >
          <div class="action_btn" >           
            <Tag
              color="blue"
              @click="openAuditDetail(record, 5)"
              v-if="activeKey == '2'"
              >Chi Tiết</Tag
            >
            <Tag
              color="blue"
              @click="openAuditDetail(record, 6)"
              v-if="activeKey == '3'"
              >Chi Tiết</Tag
            >
            <Tag
              color="blue"
              @click="openAuditDetail(record, 7)"
              v-if="activeKey == '4'"
              >Chi Tiết</Tag
            >
          </div>
        </template>
      </template>
    </Table>
  </Modal>
  <summary-report-item v-if="AuditReportItemWorkbookShowHide" :dataReport ="AuditReportItemWorkbook" :typeAudit="typeStatus" @closeAuditItem="closeAuditItem" @ReloadData="loadData"/>

</template>
  
  <script>
import { Modal, TabPane, Tabs, Table, Tag } from "ant-design-vue";
//import ListEstimateReport from "./ListEstimateReport.vue";
import { get } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import SummaryReportItem from './SummaryReportItem.vue';


export default {
  components: { Modal, TabPane, Tabs, Table, Tag,SummaryReportItem },
 
  data() {
    return {
      toggerDialogSetup: true,
      activeKey: "2",
      AuditReportItemWorkbookShowHide:false,
      columns: [
        {
          title: "STT",
          dataIndex: "STT",
          key: "STT",
          width: "50px",
        },
        {
          title: "Mã người nộp",
          dataIndex: "member_code",
          key: "member_code",
          width: "150px",
        },
        {
          title: "Tên người nộp",
          dataIndex: "full_name",
          key: "full_name",
        },
        {
          title: "Chức năng",
          dataIndex: "action",
          key: "action",
          width: "auto",
        },
      ],
      dataSource: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {    
    openAuditDetail(data,status){
      this.AuditReportItemWorkbook = data;
      this.typeStatus = status;
      this.AuditReportItemWorkbookShowHide = true;
    },
    closeAuditItem(){
      this.AuditReportItemWorkbookShowHide = false;
    },
    loadData() {
      let urlApi = `ReportDetails/GetAllReportByStatus/${this.activeKey}`;
      get(
        urlApi,
        (res) => {
          this.dataSource = res.data;
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
    hideModal() {
      this.$emit("CloseAudit");
    },
  },
  watch: {
    activeKey(value) {
      this.loadData();
      this.tabIndex == 5;
      if (value == 3) {
        this.tabIndex == 6;
      } else if (value == 4) {
        this.tabIndex == 7;
      }
    },    
  },
};
</script>
  
  <style scoped>
.class_tag {
  height: 50px;
}
</style>