<template>
  <div class="toolar-workbook" v-show="workbookEdit">
    <div class="left-toolbar">
      <Button v-show="statusEdit">Lấy lại mẫu ban đầu</Button>
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
        <Button type="primary" block @click="SaveAction()">{{
          nameButton
        }}</Button>
      </div>
      <div class="action-workbook" v-show="statusEdit">
        <Button type="danger block" block @click="CancelEdit()">Hủy</Button>
      </div>
    </div>
  </div>
  <div class="workbook_container">
    <GcSpreadSheets class="spreadHost" @workbookInitialized="initWorkbook">
    </GcSpreadSheets>
  </div>
</template>
  
  <script>
import { Button, DropdownButton, Menu, MenuItem } from "ant-design-vue";
import { GcSpreadSheets } from "@grapecity/spread-sheets-vue";
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
import { put, getById, putNo } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";

// import GC from '@grapecity/spread-sheets';

export default {
  props: {
    dataDetail: {},
    workbookEdit: { default: true },
    ischeck: { default: true },
  },
  components: { GcSpreadSheets, Button, DropdownButton, Menu, MenuItem },
  created() {
    this.statusEdit = false;
    if (!this.statusEdit) {
      this.nameButton = "Sửa";
    } else {
      this.nameButton = "Lưu";
    }
  },
  methods: {
    exportReport(status) {
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
      if (this.workbookEdit) {
        this.getdataEdit(this.dataDetail.report_detail_id);
      } else {
        this.spread.fromJSON(JSON.parse(this.dataDetail.data_detail));
      }
    },

    getdataEdit(idReport) {
      getById(
        "ReportDetails",
        idReport,
        (res) => {
          this.dataSource = res.data;
          this.spread.fromJSON(JSON.parse(res.data.data_detail));
          this.spread.getActiveSheet().options.isProtected = true;
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          console.log(error);
        }
      );
    },
    SaveAction() {
      if (!this.statusEdit) {
        this.statusEdit = !this.statusEdit;
        if (!this.statusEdit) {
          this.nameButton = "Sửa";
        } else {
          this.nameButton = "Lưu";
        }
        this.spread.getActiveSheet().options.isProtected = !this.statusEdit;
        return;
      }
      put(
        `ReportDetails`,
        this.dataDetail.report_detail_id,
        {
          report_detail_id: this.dataDetail.report_detail_id,
          report_id: this.dataDetail.report_id,
          data_detail: JSON.stringify(this.spread),
        },
        () => {
          this.statusEdit = !this.statusEdit;
          toast.success(Resource.updateMessage, {
            autoClose: 2000,
            position: "bottom-right",
          });
          putNo(
            `ReportDetails/UpdateByReportDetailStatus?idReport=${this.dataDetail.report_detail_id}&status=1`,
            () => {
              this.$emit("reload");
            },
            (error) => {
              console.log(error);
            }
          );
          this.spread.getActiveSheet().options.isProtected = true;
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
  },
  data() {
    return {
      spread: null,
      nameButton: "Sửa",
      statusEdit: false,
    };
  },
  watch: {},
};
</script>
  
  <style>
</style>