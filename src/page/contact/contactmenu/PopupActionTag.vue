<template>
  <Modal
    v-model:visible="toggerDialog"
    :title="titleModel"
    ok-text="Lưu"
    cancel-text="Hủy"
    @ok="SaveTagName()"
    width="300px"
  >
    <Input v-model:value="nameTag" placeholder="Nhập tên nhãn..." />
  </Modal>
</template>

<script>
import { Modal, Input } from "ant-design-vue";
import { post,put } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";

export default {
  components: { Modal, Input },
  props: {
    showPopup: { default: false },
    titlePopup: { default: "Thêm nhãn" },
    statusSave: { default: false },
    itemTag:{}
  },
  created() {
    (this.toggerDialog = this.showPopup), (this.titleModel = this.titlePopup);
  },
  data() {
    return {
      toggerDialog: false,
      titleModel: "Thêm nhãn",
      nameTag: "",
    };
  },
  methods: {
    hideModal() {
      this.toggerDialog = false;
    },
    SaveTagName() {
      console.log("save");
      let me = this;
      if (!me.statusSave) {
        me.SaveAction();
      } else {
        me.editAction();
      }
    },
    SaveAction() {
      post(`MemberTags`,
      {
        member_tag_id:"3fa85f64-5717-4562-b3fc-2c963f66afa6",
        member_tag_name: this.nameTag,
        list_member: '[]',
        account_id: "08689cdb-6b66-11ee-b310-6c2b59ff60e6"        
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
    editAction(){
       put(
        `MemberTags`,this.itemTag.member_tag_id,
        {
          member_tag_id:this.itemTag.member_tag_id,
          member_tag_name: this.nameTag,
          list_member: this.itemTag.list_member,
          account_id: "08689cdb-6b66-11ee-b310-6c2b59ff60e6"  
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
    }
  },
  watch: {
    toggerDialog(value) {
      if (!value) {
        this.$emit("popupClose");
      }
    },
  },
};
</script>

<style>
</style>