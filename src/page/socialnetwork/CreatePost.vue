<template>
  <Modal
    v-model:visible="toggerDialog"
    title="Tạo bài viết"
    ok-text="Đăng"
    cancel-text="Hủy"
    width="800px"
    @ok="createPost"
    @cancel="hideDialog"
  >
    <div class="write-post-container">
      <div class="user-profile">
        <input
          type="file"
          id="idSelectImg"
          @change="selectFile($event)"
          hidden
          accept="image/*"
        />
        <img :src="inforUser.urlAvartar || defautAvatar" alt="" />
        <div>
          <p style="font-size: 15px">{{ inforUser.full_name }}</p>
          <small v-if="inforUser.role"
            >Sinh viên <i class="fa-sharp fa-solid fa-caret-down"></i
          ></small>
          <small v-else
            >Giảng viên <i class="fa-sharp fa-solid fa-caret-down"></i
          ></small>
        </div>
      </div>
      <div class="post-input-container">
        <textarea
          rows="3"
          placeholder="Nội dung bạn muốn chia sẻ..."
          v-model="content"
        ></textarea>
      </div>
      <div class="img_post">
        <img v-show="showfile" :src="showfile" />
      </div>
      <div class="add-post-container">
        <a href="#" @click="selectImg()"
          ><img
            src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/photo.png?alt=media&token=12a806ce-f852-4e0e-bc24-9da9493db4c0"
            alt=""
          />Live Video</a
        >
        <a href="#"
          ><img
            src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/live-video.png?alt=media&token=c94382cb-0a34-46ed-bc8d-a31b657dbca8"
            alt=""
          />Photos/Video</a
        >
        <a href="#"
          ><img
            src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/feeling.png?alt=media&token=d7bf8066-c0e3-40e3-9624-6936a719502f"
            alt=""
          />Feelings</a
        >
      </div>
    </div>
  </Modal>
</template>

<script>
import { Modal } from "ant-design-vue";
import { post } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import storage from "@/common/resource/firebasev2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  props: {
    inforUser: null,
  },
  components: { Modal },
  data() {
    return {
      toggerDialog: true,
      fileData: null,
      showfile: null,
      defautAvatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      content: "",
    };
  },
  methods: {
    
    selectFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.fileData = null;
        return;
      }
      this.fileData = files[0];
      const storageRef = ref(storage, this.fileData.name);
      // Hàm update file lên theo tên file
      uploadBytes(storageRef, this.fileData).then(() => {
        //Hàm get file vể và hiển thị theo tên file
        getDownloadURL(ref(storage, this.fileData.name)).then(
          // get url gán vào src ảnh là được
          (urldownLoad) => (this.showfile = urldownLoad)
        );
      });
    },
    selectImg() {
      document.getElementById("idSelectImg").click();
    },
    createPost() {
      let attachments = null;
      if (this.fileData) {
        attachments = this.showfile;
      }
      post(
        `Posts`,
        {
          content: this.content,
          attachments: attachments,
          post_type: 0,
          account_id: localStorage.getItem("userId"),
        },
        () => {
          // Trường hợp thành công toast thồng báo
          toast.success(Resource.VN_AddSuccess, {
            autoClose: 2000,
            position: "bottom-right",
          });
          this.createNotify();
          this.toggerDialog = false;
          this.$emit("ReloadPost");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    createNotify(){
      post(
        `Notifications`,
        {
          notification_content: "",
          typelink: 0,
          create_by: localStorage.getItem("userId"),
        },
        () => {         
        },
        (error) => {
          console.log(error);
        }
      );
    },
    hideDialog() {
      this.toggerDialog = false;
      this.$emit("closeCreatePost");
    },
  },
};
</script>

<style>
</style>