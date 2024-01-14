<template>
  <div class="the-report">
    <div class="body-report">
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="reportListBH" tab="Thiết lập và ban hành" v-if="isRole">
           <ListEstimateReport
            :tabIndex=1
            :dataSource="dataSource"
            :columns="lastColums"
            @OpenDetail="(data) => OpenDetail(data)"
            @ReloadData ="loadData"
          />
        </TabPane>
        <TabPane key="reportList" tab="Danh sách báo cáo" v-if="!isRole">
          <ListEstimateReport
          :tabIndex=2
            :dataSource="dataSource"
            :columns="lastColums"
            @OpenDetail="(data) => OpenDetail(data)"
            @ReloadData ="loadData"
          />
        </TabPane>
        <TabPane key="estimate" tab="Thiết lập báo cáo" v-if="!isRole">
          <ListEstimateReport
          :tabIndex=3
            :dataSource="dataSource"
            :columns="lastColums"
            @OpenDetail="(data) => OpenDetail(data)"
            @ReloadData ="loadData"
            :isEdit="true"
          />
        </TabPane>
        <TabPane key="3" tab="Tổng hợp và Hoàn thành" v-if="isRole">
          <ListEstimateReport
          :tabIndex=4
            :dataSource="dataSource"
            :columns="lastColums"
            @OpenDetail="(data) => OpenDetail(data)"
            @ReloadData ="loadData"
          />
        </TabPane>
      </Tabs>
    </div>
  </div>
  <Modal
    v-model:visible="toggerDialog"
    :title="titleReport"
    width="100%"
    wrap-class-name="full-modal"
    :footer="null"
    v-if="toggerDialog"
  >
    <workbook-item
      :dataDetail="dataDetail"
      :workbookEdit="workbookEdit"
      @reload="loadData()"
      :ischeck="ischeck"
    />
  </Modal>
</template>

<script>
import { Tabs, TabPane, Modal } from "ant-design-vue";
import ListEstimateReport from "./ListEstimateReport.vue";
import { get } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import WorkbookItem from "./WorkbookItem.vue";

export default {
  components: {
    Tabs,
    TabPane,
    ListEstimateReport,
    Modal,
    WorkbookItem  

  },
  created() {
    
    if(localStorage.getItem("userRole") == 0){
      this.isRole = true;
      this.lastColums = this.columns;
      this.activeKey = "reportListBH"
    }
    else{
      this.isRole = false;     
    }
    if(this.activeKey =="estimate"){
      this.lastColums = this.columnsDetail;
    }
    else if(this.activeKey =="reportList"){
      this.lastColums = this.columns;
    }
    this.loadData();
  },
  data() {
    return {
      ischeck:false,
      isRole:false,
      workbookEdit: false,
      activeKey: "reportList",
      dataSource: [],
      titleReport: "",
      dataDetail: null,
      lastColums:[],
      columns: [
        {
          title: "STT",
          dataIndex: "STT",
          key: "STT",
          width: "50px",
        },
        {
          title: "Mã báo cáo",
          dataIndex: "report_code",
          key: "report_code",
          width: "150px",
        },
        {
          title: "Tên báo cáo",
          dataIndex: "report_name",
          key: "report_name",
        },      
        {
          title: "Trạng thái",
          dataIndex: "stt_report",
          key: "stt_report",
        },      
        {
          title: "Chức năng",
          dataIndex: "action",
          key: "action",
          width: "auto",
        },
      ],
      columnsDetail: [
        {
          title: "STT",
          dataIndex: "STT",
          key: "STT",
          width: "50px",
        },
        {
          title: "Mã báo cáo",
          dataIndex: "report_code",
          key: "report_code",
          width: "150px",
        },
        {
          title: "Tên báo cáo",
          dataIndex: "report_name",
          key: "report_name",
        },
        {
          title: "Trạng thái",
          dataIndex: "statusDetail",
          key: "statusDetail",
          width: "100px",
        },
        {
          title: "Chức năng",
          dataIndex: "action",
          key: "action",
          width: "auto",
        },
      ],
      toggerDialog: false,
    };
  },
  methods: {
    loadData() {
      let urlApi = `ReportDetails/getAllReportByAccount/${localStorage.getItem("userId")}`;
      if (this.isRole) {
        urlApi = "Reports";
      }
      get(
        urlApi,
        (res) => {
          this.dataSource = res.data;
          console.log(localStorage.getItem("userId"));
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
    OpenDetail(data) {
      this.toggerDialog = true;
      this.titleReport = data.report_name;
      this.dataDetail = data;
      this.ischeck = !this.ischeck;
    },
  },
  watch: {
    activeKey(value) {
      this.loadData();
      if (value == "estimate") {
        this.lo
        this.workbookEdit = true;
        this.lastColums = this.columnsDetail;
      } else {
        this.workbookEdit = false;
        this.lastColums = this.columns;
      }
    },
  },
};
</script>

<style>
</style>