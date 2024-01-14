<template>
  <div class="items-contact">
    <div class="tag-sys">
      <tag-item
       @click="showItemTag(item)"
        :InforTag="item"
        :icon_clase="item.icon_clase"
        v-for="(item, index) in sysTag"
        :key="index"
      />
    </div>
    <div class="tag-custom" :class="{ 'mini-tag': isMiniTag }">
      <div class="item-tab" @click="zoomCustomTag()">
        <div class="item-tab-main">
          <div class="tag-title">Nhãn</div>
          <div class="tag-icon">
            <ion-icon name="chevron-down-outline" class="icon-infor"></ion-icon>
          </div>
        </div>
      </div>
      <TagItem
        :InforTag="item"
        :isTagCustom="true"
        :icon_clase="item.icon_clase"
        v-for="(item, index) in customTag"
        :key="index"
        @editTag="(data) => editTag(data)"
        @DeleteTag="(data) => DeleteTag(data)"
        @click="showItemTag(item)"
        
      />
    </div>
    <div class="add-tag-custom">
      <div class="item-tab" @click="AddCustomTag()">
        <div class="item-tab-main">
          <div class="tag-title">Thêm nhãn mới</div>
          <div class="tag-icon">
            <ion-icon name="add-outline" class="icon-infor"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
  <popup-action-tag
    :itemTag="itemSave"
    :titlePopup="titlePopup"
    :showPopup="isShowPopup"
    v-if="isShowPopup"
    @popupClose="ClosePopup"
    @ReloadData ="loadData()"
  />
</template>

<script>
import PopupActionTag from "./PopupActionTag.vue";
import TagItem from "./TagItem.vue";
import { get,deleteOne } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
export default {
  components: { TagItem, PopupActionTag },
  created() {
    this.loadData();
  },
  data() {
    return {
      titlePopup: "Thêm Nhãn",
      isMiniTag: false,
      isShowPopup: false,
      sysTag: [
        {
          member_tag_name: "Tất cả liên lạc",
          type: "all",
          icon_clase: "people",
        },
        {
          member_tag_name: "Yêu Thích",
          type: "love",
          icon_clase: "star-outline",
        },
      ],
      itemSave: {},
      customTag: [],
    };
  },
  methods: {
    showItemTag(data){
      this.$emit("LoadDataToTag",data)
    },
    zoomCustomTag() {
      this.isMiniTag = !this.isMiniTag;
    },
    AddCustomTag() {
      this.titlePopup = "Thêm nhãn";
      this.isShowPopup = true;
    },
    ClosePopup() {
      this.isShowPopup = false;
    },
    editTag(data) {
      this.titlePopup = "Sửa nhãn";
      this.itemSave = data;
      this.isShowPopup = true;
    },
    DeleteTag(data){
       deleteOne(
        "MemberTags",
        data.member_tag_id,
        () => {
          toast.success(Resource.VN_DeleteSuccess, {
            autoClose: 2000,
            position: "top-center",
          });
           this.loadData();
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
    loadData(){
      get(
        "MemberTags",
        (res) => {
          this.customTag = res.data;
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
    }
  },
};
</script>

<style>
</style>