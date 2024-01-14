<template>
  <div class="item-tab">
    <div class="item-tab-main">
      <div class="tag-icon">
        <ion-icon :name="icon_clase" class="icon-infor"></ion-icon>
      </div>
      <div class="tag-title">{{ InforTag.member_tag_name || "" }}</div>
      <div class="icon-action" v-if="isTagCustom">
        <Tooltip placement="top">
          <template #title>
            <span>Sửa</span>
          </template>
          <div class="edit-tag icon-tag-action" @click="editTag()">
            <ion-icon
              name="create-outline"
              class="icon-action-size action-edit"
            ></ion-icon>
          </div>
        </Tooltip>

        <Tooltip placement="top">
          <template #title>
            <span>Xóa</span>
          </template>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa nhan này không？"
            ok-text="Có"
            cancel-text="Không"
            @confirm="deleteTag()"
          >
           <div class="delete-tag icon-tag-action" >
            <ion-icon
              name="trash-outline"
              class="icon-action-size action-delete"
            ></ion-icon>
          </div>
          </Popconfirm>          
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { Tooltip,Popconfirm } from "ant-design-vue";
export default {
  components: { Tooltip,Popconfirm },
  props: {
    InforTag: {},
    icon_clase: {
      typeof: String,
      default: "pricetag-outline",
    },
    isTagCustom: { default: false },
  },  
  methods: {
    editTag(){
      this.$emit("editTag",this.InforTag);
    },
    deleteTag(){
      this.$emit("DeleteTag",this.InforTag);
    }
  },
};
</script>

<style>
</style>