<template>
  <Modal
    v-model:visible="toggerDialogDetail"
    :title="dataDetail.schedule_content"
    :footer="null"
    ok-text="Đóng"
    cancel-text="Quay lại"
    width="100%"
    wrap-class-name="full-modal"
    @ok="hideModal"
  >
    <div class="body_model_event">
      <div class="inf_model_event">
        <div class="title_created">
          <ion-icon name="calendar-clear-outline"></ion-icon>
          <span>Ngày tạo: {{ showTime(dataDetail.created_day) }}</span>
        </div>
        <div class="title_created">
          <ion-icon name="today-outline"></ion-icon>
          <span>Bắt đầu: {{ showTime(dataDetail.time_start) }}</span>
        </div>
        <div class="title_created">
          <ion-icon name="skull-outline"></ion-icon>
          <span>Hạn cuối: {{ showTime(dataDetail.time_end) }}</span>
        </div>
        <div class="content_detail">
          Nội dung
          <p style="font-weight: 300">{{ dataDetail.schedule_name }}</p>
        </div>

        <div class="menu_detail" v-show="adminQ">
          <Popconfirm
            title="Bạn chắc chắn muốn xóa sự kiên này không？"
            ok-text="Có"
            cancel-text="Không"
            @confirm="confirmDelete()"
          >
            <div class="menu_delete">
              <ion-icon name="trash-outline"></ion-icon> <span>Xóa</span>
            </div>
          </Popconfirm>
          <div class="menu_update">
            <ion-icon name="settings-outline"></ion-icon> <span>Sửa</span>
          </div>
        </div>
      </div>
      <div class="comment_model_event">
        <div class="title_comment">Bình Luận</div>
        <div class="body_comment_model_event">
          <div class="item" v-for="(item,index) in data" :key="index">
            <div class="comment_item">
              <div class="autho">
                {{item.full_name}} <span>{{showTime(item.comment_time)}}</span>
              </div>
              <div class="content_comment">{{item.comment_content}}</div>
            </div>
          </div>
        </div>
        <div class="footer_body_comment_model_event">
          <InputSearch
            v-model:value="valueComment"
            placeholder="Aa..."
            size="large"
            @search="SendComment"
          >
            <template #enterButton>
              <a-button><ion-icon name="send-outline"></ion-icon></a-button>
            </template>
          </InputSearch>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { Modal, InputSearch, Popconfirm } from "ant-design-vue";
import { deleteOne, getByFilter, post } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import db from "@/common/firebase";

export default {
  components: { Modal, InputSearch, Popconfirm },
  props: {
    isTogglerDetail: { default: false },
    dataDetail: {},
    adminQ: { default: false },
  },
  created() {
    this.toggerDialogDetail = this.isTogglerDetail;
    this.getCommentDb()
    this.getComment()
  },
  data() {
    return {
      toggerDialogDetail: false,
      valueComment:"",
      data:[]
    };
  },
  methods: {
    addComment() {
      post(
        `Comments`,
        {
          schedule_id: this.dataDetail.schedule_id,
          account_id: localStorage.getItem("userId"),
          comment_content:this.valueComment,
        },
        () => {
          addDoc(collection(db, "comment"), {
            message: this.valueComment,
          });
          this.valueComment = "";
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getCommentDb() {
      getByFilter(
        "Comments/CommentBySchedule",{
            id_schedule:this.dataDetail.schedule_id
        },
        (res) => {
          this.data = res.data;
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
    SendComment() {
      if (this.valueComment.trim() !== "") {
        this.addComment();
      }
    },
    getComment() {
      onSnapshot(collection(db, "comment"), () => {       
        this.getCommentDb();
      });
    },
    confirmDelete() {
      deleteOne(
        "Schedules",
        this.dataDetail.schedule_id,
        () => {
          this.visibleDelete = false;
          toast.success(Resource.VN_DeleteSuccess, {
            autoClose: 2000,
            position: "top-center",
          });
          this.toggerDialogDetail = false;
          this.$emit("ReloadEvent");
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
    showTime(dateTime) {
      return new Date(dateTime)
        .toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" })
        .replace(",", "");
    },
  },
  watch: {
    isTogglerDetail(value) {
      this.toggerDialogDetail = value;
      if(value){

        this.getCommentDb()
      }
    },
    toggerDialogDetail(value) {
      this.$emit("hideDilogDetail", value);
    },
  },
};
</script>

<style >
.full-modal .ant-modal {
  max-width: 100%;
  top: 0;
  padding-bottom: 0;
  margin: 0;
}
.full-modal .ant-modal-content {
  display: flex;
  flex-direction: column;
  height: calc(100vh);
}
.full-modal .ant-modal-body {
  flex: 1;
}
</style>