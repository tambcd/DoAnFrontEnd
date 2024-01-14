<template>
  <Modal
    v-model:visible="toggerDialog"
    :title="'Bình Luận về bài viết của '+TitleComment"
    width="800px"
    @cancel="closeListComment"
    :footer="null"
  >
    <div class="comment-post-container">
      <div class="ListComment_item">
        <div class="item_comment">
            <ItemMessage :authoMessage="item.full_name" :timeMessage="item.comment_time" :contentMessage="item.content" v-for="item in dataComment" :key="item.comment_id" :isYou="item.account_id"/>
            <!-- <ItemMessage authoMessage="Nguyễn văn Huy" :timeMessage="new Date()" contentMessage="Dự kiến sẽ là 1 dữ án tốt"/>
            <ItemMessage authoMessage="Bạn" :timeMessage="new Date()" contentMessage="Tinh thần thật tuyệt vời !"/> -->

        </div>
      </div>
      <div class="create_comment">
        
          <InputSearch
            @click="HideEmoji"
            v-model:value="value"
            placeholder="Aa"
            size="large"
            @search="addMessage"
          >
            <template #enterButton>
              <ion-icon name="send-outline"></ion-icon>
            </template>
          </InputSearch>
      </div>
    </div>
  </Modal>
</template>

<script>
import { collection, onSnapshot } from "firebase/firestore";
import db from "@/common/firebase";
import { post,get } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import ItemMessage from "@/components/ItemMessage.vue";
import { Modal,InputSearch } from "ant-design-vue";

export default {
    props:{
        TitleComment:{default:"Nguyễn Hông Ngân"},
        postId:{default:null}
    },
    components: { Modal, InputSearch, ItemMessage },
    created(){
      this.getMessageDb(this.postId);
    },
  data() {
    return {
      toggerDialog: true,
      value:"",
      dataComment:[],
    };
  },
  methods: {
    addMessage() {
      if (this.value.trim() == "") {
        return;
      }
      console.log(1);
      post(
        `Comments`,
        {
          content: this.value,
          account_id: localStorage.getItem("userId"),
          post_id: this.postId,       
        },

        () => {
          this.getMessageDb(this.postId);
          this.value = "";
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getMessageDb(idPost) {
      get(
        `Comments/CommentBySchedule?id_schedule=${idPost}`,        
        (res) => {
          this.dataComment = res.data;
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
    getMessage() {
      onSnapshot(collection(db, "comment"), () => {
        // Respond to data
        // ...
        this.getMessageDb(this.postId);
      });
    },
    closeListComment(){
      this.toggerDialog = false;
      this.$emit("CloseListComment");
    }
  },
  watch: {
    postId(){
      this.getMessage();
    }
  },
}
</script>

<style>

</style>