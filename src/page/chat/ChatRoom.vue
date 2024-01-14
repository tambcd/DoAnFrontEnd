<template>
  <div class="item_member_chat">
    <div class="Chat_avatar">
      <img
        :src=this.inforChat.urlAvartar
        width="40"
        height="40"
        v-if=" this.inforChat.urlAvartar && this.inforChat.urlAvartar != null "
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        width="40"
        height="40"
        v-else      
      />
    </div>
    <div class="name_member_chat">{{ this.inforChat.full_name }}</div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import { getById } from "@/common/api/api";

export default {
  props: {
    chatRoom: {},
  },
  created() {
    this.getInforChat();
  },
  data() {
    return {
      inforChat: {},
      idChatMember: [],
    };
  },

  methods: {
    getInforChat() {
      if (this.chatRoom) {
        this.idChatMember = this.chatRoom.user_join.split(',').filter(
          (item) => item != localStorage.getItem("userId")
        );
        getById(
          "Accounts/getUserByAccount",
          this.idChatMember[0].trim(),
          (res) => {
            if (res.data) {
              this.inforChat = res.data;
            }
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
  },
};
</script>

<style>
</style>