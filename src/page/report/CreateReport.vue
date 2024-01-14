<template>
  <Modal
    v-model:visible="toggerDialogSetup"
    title="Thiết lập báo cáo"
    ok-text="Thiết lập"
    cancel-text="Hủy"
    width="100%"
    wrap-class-name="full-modal"
    :footer="null"
    @cancel="hideModal"
  >
    <div class="create_header-report">
      <div class="left-header">
        <Button @click="OpenChoseFile"> Chọn mẫu ban hành </Button>
        <div class="input">
          <Input
            v-model:value="reportCode"
            placeholder="Mã báo cáo"
            class="input"
          />
        </div>
        <div class="input">
          <Input
            v-model:value="reportName"
            placeholder="Tên báo cáo"
            class="input"
          />
        </div>
      </div>

      <input
        id="selectedFile"
        type="file"
        text="Chọn"
        accept=".sjs, .xlsx, .xlsm, .ssjson, .json, .csv"
        hidden
        v-on:change="selectedFileChange($event)"
      />
      <Button class="settingButton" id="open" @click="SaveBM">Lưu</Button>
    </div>

    <gc-spread-sheets
      class="toolbar-workbook"
      @workbookInitialized="initSpread"
      :config='config'
    >
    </gc-spread-sheets>
  </Modal>
</template>

<script>
import { GcSpreadSheets } from "@grapecity/spread-sheets-vue";
//import GC from "@grapecity/spread-sheets";
import { Modal, Button, Input } from "ant-design-vue";
import { toast } from "vue3-toastify";
import { post } from "@/common/api/api";

export default {
  components: { GcSpreadSheets, Modal, Button, Input },
  data() {
    return {
      spread: null,
      toggerDialogSetup: true,
      selectedFile: null,
      openFileType: "",
      excelIO: null,
      reportName: "",
      reportCode: "",
      config:null,
      openOptionsConfig: {
        xlsx: [
          {
            propName: "openMode",
            type: "select",
            displayText: "OpenMode",
            options: [
              { name: "normal", value: 0 },
              { name: "lazy", value: 1 },
              { name: "incremental", value: 2 },
            ],
            default: 0,
          },
          { propName: "includeStyles", type: "boolean", default: true },
          { propName: "includeFormulas", type: "boolean", default: true },
          {
            propName: "frozenColumnsAsRowHeaders",
            type: "boolean",
            default: true,
          },
          {
            propName: "frozenRowsAsColumnHeaders",
            type: "boolean",
            default: true,
          },
          { propName: "fullRecalc", type: "boolean", default: true },
          { propName: "dynamicReferences", type: "boolean", default: true },
          { propName: "calcOnDemand", type: "boolean", default: true },
          { propName: "includeUnusedStyles", type: "boolean", default: true },
        ],
      },
    };
  },
  methods: {
    OpenChoseFile() {
      document.getElementById("selectedFile").click();
    },
    selectedFileChange(e) {
      this.selectedFile = e.target.files[0];
      var excelFile = this.selectedFile;
      if (!excelFile) {
        return;
      }
      this.spread.import(
        excelFile,
        function () {},
        function () {},
        this.openOptionsConfig.xlsx
      );
    },
    initSpread(spread) {
      this.spread = spread;
    },
    getOptions (mode) {
                let optionsConfig, optionsValue;
                if (mode === 'open') {
                    optionsConfig = this.openOptionsConfig['xlsx'];
                    optionsValue = this.openOptions;
                } else {
                    optionsConfig = this.saveOptionsConfig['xlsx'];
                    optionsValue = this.saveOptions;
                }
    
                let options = {};
                optionsConfig.forEach((prop) => {
                    let v = optionsValue[prop.propName];
                    if (prop.type === 'number') {
                        v = +v;
                    }
                    options[prop.propName] = v;
                });
    
                return options;
            },
    SaveBM() {
      if (this.reportName.trim() == "") {
        toast.error("Tên báo cáo không được để trống", {
          autoClose: 2000,
          position: "bottom-right",
        });
        return;
      }
      if (this.reportCode.trim() == "") {
        toast.error("Mã báo cáo không được để trống", {
          autoClose: 2000,
          position: "bottom-right",
        });
        return;
      }
      if (!this.selectedFile) {
        toast.error("Vui lòng chọn báo cáo", {
          autoClose: 2000,
          position: "bottom-right",
        });
        return;
      }
      post(
        `Reports`,
        {
          report_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          report_name: this.reportName,
          report_type: 0,
          report_code: this.reportCode,
          data_detail: JSON.stringify(this.spread.toJSON()),
          stt_report: 0,
        },
        () => {
          toast.success("Lưu thành công!", {
            autoClose: 2000,
            position: "bottom-right",
          });
          this.$emit("CloseCreate");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    hideModal() {
      this.$emit("CloseCreate");
    },
  },
};
</script>

<style scoped>
.toolbar-workbook{
  margin-top: 5px;
  height: calc(100% - 30px);
}
</style>