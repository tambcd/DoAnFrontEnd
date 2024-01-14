<template>
  <div class="home_social_network">
    <div class="left_social_network">
      <div class="left-sidebar">
        <div class="imp-links">
          <a href=""
            ><img :src="userLogin.urlAvartar || defautAvatar" />Trang cá nhân</a
          >
          <a href=""
            ><img
              src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/friends.png?alt=media&token=f6a68c1e-9bcf-4ecb-a06e-8d43ac967960"
            />Bạn bè</a
          >
          <a href=""
            ><img
              src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/group.png?alt=media&token=c3403b46-4d76-44aa-9dea-b01e52c30e6b"
            />Nhóm</a
          >
          <a href=""
            ><img
              src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/marketplace.png?alt=media&token=436504af-d5db-486f-9991-cef784ff6268"
            />Chợ</a
          >
          <a href=""
            ><img
              src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/watch.png?alt=media&token=3dacee10-324b-4a43-b2af-5db8e10962c0"
            />Xem</a
          >
          <a href="">Xem Thêm</a>
        </div>
      </div>
    </div>
    <div class="main_social_network">
      <div class="write-post-container">
        <div class="user-profile">
          <img :src="userLogin.urlAvartar || defautAvatar" alt="" />
          <div>
            <p style="font-size: 15px">{{ userLogin.full_name }}</p>
            <small
              >{{ role }} <i class="fa-sharp fa-solid fa-caret-down"></i
            ></small>
          </div>
        </div>
        <div class="post-input-container" @click="OpenCreatePost()">
          <textarea
            rows="3"
            placeholder="Nội dung bạn muốn chia sẻ..."
          ></textarea>
        </div>
        <div class="add-post-container" @click="OpenCreatePost()">
          <a href=""
            ><img
              src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/photo.png?alt=media&token=12a806ce-f852-4e0e-bc24-9da9493db4c0"
              alt=""
            />Live Video</a
          >
          <a href=""
            ><img
              src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/live-video.png?alt=media&token=c94382cb-0a34-46ed-bc8d-a31b657dbca8"
              alt=""
            />Photos/Video</a
          >
          <a href=""
            ><img
              src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/feeling.png?alt=media&token=d7bf8066-c0e3-40e3-9624-6936a719502f"
              alt=""
            />Feelings</a
          >
        </div>
      </div>
      <div class="post-container" v-for="item in dataPost" :key="item.post_id">
        <div class="post-row">
          <div class="user-profile">
            <img
              :src="item.urlAvartar || defautAvatar"
              alt=""
              style="width: 40px"
            />
            <div>
              <p style="font-size: 15px">{{ item.full_name }}</p>
              <span style="font-size: 12px; color: #9a9a9a">{{
                gettime(item.create_date)
              }}</span>
            </div>
          </div>
          <a href=""
            ><i class="fas fa-ellipsis-v" style="color: #9a9a9a"></i
          ></a>
        </div>

        <p style="font-size: 12px; margin-top: 8px">
          {{ item.content }}
          <a href="" style="text-decoration: none; color: #1876f2">#new</a>
          <a href="" style="text-decoration: none; color: #1876f2">#viral</a>
        </p>
        <img
          :src="item.attachments"
          width="100%"
          style="margin: 20px 0; border-radius: 4px ;width: 90%;"
        />
        <div class="post-row">
          <div class="activity-icon" >
            <div>
              <button style="border: unset; background-color: transparent;">
              <img
                  src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/like-blue.png?alt=media&token=a8031cea-2719-465b-9349-e21012fa41db"
                  alt=""
                />120 
              </button >
              <button  @click="OpenListComment(item)" style="border: unset; background-color: transparent;margin:0 5px;">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/comments.png?alt=media&token=1d0d5808-0f75-4973-913b-e8c605fd22ec"
                  alt=""
                />45
              </button>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/doantotnghiep-255fc.appspot.com/o/share.png?alt=media&token=9e3ffa6b-c467-43d0-96b8-8f26342288f7"
                  alt=""
                />20
              
            </div>
          </div>
          <div class="post-profile-icon">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              style="width: 20px; border-radius: 50%"
            />
            <i
              class="fa-sharp fa-solid fa-caret-down"
              style="margin-left: -10px"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <div class="right_social_network">
      <div class="sidebar-title">
        <h4>Sinh nhật trong ngày</h4>
        <a href="">Ẩn</a>
      </div>
      <div class="online-list">
        <div class="online">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
          />
        </div>
        <p>Nguyễn Thị Thủy</p>
      </div>
      <div class="online-list">
        <div class="online">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
          />
        </div>
        <p>Nguyễn Văn Huy</p>
      </div>
      <div class="online-list">
        <div class="online">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
          />
        </div>
        <p>{{ userLogin.full_name }}</p>
      </div>
    </div>
  </div>
  <create-post
    v-if="isPost"
    @closeCreatePost="closeCreatePost"
    :inforUser="userLogin"
    @ReloadPost="ReloadPost"
  />
  <comment-post v-if="isComment" @CloseListComment="CloseListComment" :postId="postIdCm" :TitleComment="memberPost" />
</template>

<script>
import CommentPost from "./CommentPost.vue";
import CreatePost from "./CreatePost.vue";
import { getById, get } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";


export default {
  components: { CreatePost, CommentPost },
  created() {
    this.getDataUser();
    this.LoadDataPost();
  },
  data() {
    return {
      isComment: false,
      isPost: false,
      userLogin: null,
      role: "Sinh viên",
      defautAvatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      dataPost: [],
      postIdCm:"null",
      memberPost:"",
    };
  },
  methods: {    
    gettime(inputDate) {
      const dateObj = new Date(inputDate);

      const options = { day: "numeric", month: "numeric", year: "numeric" };
      const formattedDate = dateObj.toLocaleDateString("en-US", options);

      const hours = dateObj.getHours();
      const minutes = dateObj.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedTime = `${hours}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;

      const result = `${formattedDate}, ${formattedTime}`;
      return result;
    },
    ReloadPost() {
      this.LoadDataPost();
      this.closeCreatePost();
    },
   LoadDataPost() {
      get(
        "Posts/GetPostTime",
        (res) => {          
           this.dataPost =res.data;
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
    OpenCreatePost() {
      this.isPost = true;
    },
    closeCreatePost() {
      this.isPost = false;
    },
    OpenListComment(data) {
      this.postIdCm = data.post_id;
      this.memberPost = data.full_name;
      this.isComment = true;
    },
    CloseListComment() {
      
      this.isComment = false;
    },
    getDataUser() {
      getById(
        "Users/getByIdAccount",
        localStorage.getItem("userId"),
        (res) => {
          this.userLogin = res.data;
          if (res.data.role == 1) {
            this.role = "Sinh viên";
          } else {
            this.role = "Giảng viên";
          }
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>

</style>