<template>
  <div class="chat_room">
    <div class="left_menu_chat">
      <div class="search_member_chat">
        <AutoComplete
          v-model:value="valueSearch"
          placeholder="Tên người muốn tìm..."
          size="large"
          style="width: 100%"
          :options="options"
          :allow-clear="true"
          @select="onSelect"
          @search="onSearch"
        />
      </div>
      <chat-room
        v-for="item in chatRoom"
        :key="item.chat_room_id"
        :chatRoom="item"
        :class="{ active: item.chat_room_id == chatRoomActive }"
        @click="SelectChatRoom(item.chat_room_id)"
      />
    </div>
    <div class="home-chat">
      <div
        class="home-message"
        @click="HideEmoji"
        ref="homeMessage"
        id="container"
      >
        <ItemMessage
          v-for="(item, index) in data"
          :key="index"
          :isYou="item.account_id"
          :authoMessage="item.full_name"
          :timeMessage="item.message_time"
          :contentMessage="item.content"
        />
      </div>

      <div class="home-input-send">
        <div class="input-icon" @click="toggleEmoji">
          <ion-icon name="happy-outline"></ion-icon>
        </div>
        <div class="input-send">
          <InputSearch
            @click="HideEmoji"
            v-model:value="value"
            placeholder="Aa"
            size="large"
            @search="SendMeesage"
          >
            <template #enterButton>
              <ion-icon name="send-outline"></ion-icon>
            </template>
          </InputSearch>
        </div>
        <VuemojiPicker
          @emojiClick="handleEmojiClick"
          v-if="isemoji"
          class="emojiMessage"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { InputSearch, AutoComplete } from "ant-design-vue";
import ItemMessage from "@/components/ItemMessage.vue";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import db from "@/common/firebase";
import { get, post, getById } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import { VuemojiPicker } from "vuemoji-picker";
import ChatRoom from "./chat/ChatRoom.vue";

export default {
  name: "TheHome",
  components: {
    InputSearch,
    ItemMessage,
    VuemojiPicker,
    AutoComplete,
    ChatRoom,
  },
  created() {
    this.getMessage();
    this.loadData();
    this.loadChatRoom();
  },
  data() {
    return {
      options: [],
      value: "",
      data: [],
      isemoji: false,
      valueSearch: "",
      userChat: [],
      chatRoom: [],
      chatRoomActive: "",
    };
  },

  methods: {
    creadtChatRoom(text) {
      if (this.isChatRoom(text) != null) {
        post(
          `ChatRooms`,
          {
            chat_room_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            chat_room_name: "chat",
            chat_room_code: "chat",
            user_join: `${localStorage.getItem("userId")},${this.isChatRoom(text)}`,
          },

          () => {
            this.loadChatRoom();
            this.valueSearch = "";
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    isChatRoom(text){
      let userCheck =  this.userData.filter(item => item.member_code == text.replace(/[^0-9]/g, ""))
      for (let index = 0; index <this.chatRoom.length; index++) {
        if (this.chatRoom[index].user_join.includes(userCheck[0].account_id)) { 
          this.chatRoomActive = this.chatRoom[index].chat_room_id;
          this.getMessageDb(this.chatRoomActive);         
          return null;
        }
      }
      return userCheck[0].account_id;
    },
    SelectChatRoom(idRoom) {
      this.getMessageDb(idRoom);
      this.chatRoomActive = idRoom;
    },
    loadChatRoom() {
      getById(
        "ChatRooms/getAllChatRoomByAccount",
        localStorage.getItem("userId"),
        (res) => {
          if (res.data) {
            this.chatRoom = res.data;
            this.chatRoomActive = res.data[0].chat_room_id;
            this.getMessageDb(this.chatRoomActive);

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
    },
    loadData() {
      get(
        "Users",
        (res) => {
          this.userData = res.data;
          this.userChat = res.data.map((obj) => ({
            value: obj.full_name + ` (${obj.member_code})`,
          }));
          if (this.userChat) {
            this.options = this.userChat;
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
    },
    onSelect(text) {
     this.creadtChatRoom(text);
    },
    onSearch(searchValue) {
      this.options = [];
      for (let index = 0; index < this.userChat.length; index++) {
        if (this.userChat[index].value.includes(searchValue.trim())) {
          this.options.push(this.userChat[index]);
        }
      }
    },

    HideEmoji() {
      if (this.isemoji) {
        this.isemoji = !this.isemoji;
      }
    },
    toggleEmoji() {
      this.isemoji = !this.isemoji;
    },
    handleEmojiClick(EmojiClickEventDetail) {
      console.log(EmojiClickEventDetail);
      this.value += EmojiClickEventDetail.unicode;
    },
    addMessage() {
      post(
        `Messages`,
        {
          content: this.value,
          account_id: localStorage.getItem("userId"),
          class_room_id: this.chatRoomActive,
          attachments: null,
        },

        () => {
          addDoc(collection(db, "chat"), {
            message: this.value,
          });
          this.value = "";
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getMessageDb(idChatRoom) {
      getById(
        "Messages/GetAllMessageBychatRoom",
        idChatRoom,
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
    SendMeesage() {
      if (this.value.trim() !== "") {
        this.addMessage();
      }
      this.HideEmoji();
      this.$refs["homeMessage"].scrollIntoView({ behavior: "smooth" });
    },
    getMessage() {
      onSnapshot(collection(db, "chat"), () => {
        // Respond to data
        // ...
        this.getMessageDb(this.chatRoomActive);
      });
    },
  },
};
</script>

<style>
.input_search {
  width: 50%;
}
</style>