<template>
    <Modal
      v-model:visible="toggerDialogSetup"
      :title="dataReport.report_name"
      ok-text="Thiết lập"
      cancel-text="Hủy"
      width="100%"
      wrap-class-name="full-modal"
      @cancel="hideModal"
      :footer="null"
      
    >
    <div class="toolar-workbook" >
      <div class="left-toolbar">
        <DropdownButton type="primary">
        <a class="ant-dropdown-link" @click="exportReport(1)"> Xuất khẩu </a>
        <template #overlay>
          <Menu>
            <MenuItem @click="exportReport(1)">
              <a>Excel</a>
            </MenuItem>
            <MenuItem @click="exportReport(2)">
              <a>PDF</a>
            </MenuItem>
          </Menu>
        </template>
      </DropdownButton>
      </div>
      <div class="right_toolbar"> 
        <div class="action-workbook">
          
        </div>
        <div class="action-workbook_audit" v-show="typeAudit==5 || typeAudit==6">
          <Button block @click="chanstatus(3)" v-if="typeAudit==5">Hoàn thành</Button>
          <Button type="danger block" block @click="chanstatus(2)" v-if="typeAudit==6">Thu hồi</Button>
          <Button type="danger block" block @click="chanstatus(4)" v-if="typeAudit==5">Gửi trả</Button>
        </div>
      </div>
    </div>
    <div class="workbook_container">
      <GcSpreadSheets class="spreadHost" @workbookInitialized="initWorkbook">
      </GcSpreadSheets>
    </div>
    </Modal>
  </template>
    
    <script>
  import { Button,Modal,MenuItem,Menu,DropdownButton } from "ant-design-vue";
  import { GcSpreadSheets } from "@grapecity/spread-sheets-vue";
  import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
  import {  putNo } from "@/common/api/api";
  import { toast } from "vue3-toastify";
  import { Resource } from "@/common/resource/Resource";  
  
  export default {
    props: {
      dataReport:null,
      typeAudit:   {
        default :5
      }
    },
    components: { GcSpreadSheets, Button,Modal,DropdownButton,MenuItem,Menu },
   
    created() {
      this.statusEdit = false;
      if (!this.statusEdit) {
        this.nameButton = "Sửa";
      } else {
        this.nameButton = "Lưu";
      }
    },
    methods: {
      exportReport (status) {
      console.log(status);
      if (status == 1) {
        this.spread.export(
          function (blob) {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";

            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = "export.xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
          },
          function () {},
          ""
        );
      }
      else{
        this.spread.savePDF(
                function (blob) {
                  var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";

            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = "export.pdf";
            a.click();
            window.URL.revokeObjectURL(url);
                },
                console.log,
                {
                    title: 'Test Title',
                    author: 'Test Author',
                    subject: 'Test Subject',
                    keywords: 'Test Keywords',
                    creator: 'test Creator'
                });
      }
    },
      initWorkbook(spread) {
        this.spread = spread;
        this.spread.fromJSON(JSON.parse(this.dataReport.data_detail));              
      },      
      chanstatus(status){     
        putNo(
          `ReportDetails/UpdateByReportDetailStatus?idReport=${this.dataReport.report_detail_id}&status=${status}`,
          () => {
            toast.success(Resource.updateMessage, {
              autoClose: 2000,
              position: "bottom-right",
            });
            this.toggerDialogSetup = false;
            this.$emit('ReloadData')
            this.$emit("closeAuditItem")
          },
          (error) => {
            console.log(error);
          }
        );      
      },
      CancelEdit() {
        this.statusEdit = false;
        this.spread.getActiveSheet().options.isProtected = !this.statusEdit;
      },
      hideModal(){
        this.$emit("closeAuditItem")
      }
    },
    data() {
      return {
        toggerDialogSetup:true,
        spread: null,
        nameButton: "Sửa",
        statusEdit: false,
      };
    },
    watch: {
      statusEdit(value) {
        if (!value) {
          this.nameButton = "Sửa";
        } else {
          this.nameButton = "Lưu";
        }
      },
      "this.dataReport"(){
        console.log(this.dataReport);
        this.spread.fromJSON(JSON.parse(this.dataReport.data_detail));   
      }
    },
  };
  </script>
    
    <style scoped>
    .action-workbook_audit{
        display: flex;
    }
    .action-workbook_audit button{
       margin-left: 10px;
    }
  </style>