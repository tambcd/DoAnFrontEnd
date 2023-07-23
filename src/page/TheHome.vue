<template>
  <div class="home-chat">
    <div class="home-message"  @click="HideEmoji" ref="homeMessage" id="container" >
      <ItemMessage
        v-for="(item, index) in data"
        :key="index"
        :isYou="item.account_id"
        :authoMessage="item.full_name"
        :timeMessage="item.created_day"
        :contentMessage="item.content"
      />
    </div>
    
    <div class="home-input-send">       
      <div class="input-icon" @click="toggleEmoji"><ion-icon name="happy-outline"></ion-icon></div>
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
        <VuemojiPicker @emojiClick="handleEmojiClick" v-if="isemoji" class="emojiMessage" />
    </div>
  </div>
</template>
<script>
import { InputSearch } from "ant-design-vue";
import ItemMessage from "@/components/ItemMessage.vue";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import db from "@/common/firebase";
import { get, post } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import { VuemojiPicker } from 'vuemoji-picker'

export default {
  name: "TheHome",
  components: { InputSearch, ItemMessage,VuemojiPicker },
  created() {
    this.getMessage();
    this.getMessageDb();
  },
  mounted() {        
  },
  data() {
    return {
      value: "",
      data: [],
      isemoji:false
    };
  },
  methods: {
    HideEmoji(){
      if(this.isemoji){
         this.isemoji = !this.isemoji
      }
    },
    toggleEmoji(){
      this.isemoji = !this.isemoji
    },
    handleEmojiClick(EmojiClickEventDetail) {
      console.log(EmojiClickEventDetail);
      this.value +=EmojiClickEventDetail.unicode;
    },
    addMessage() {
      post(
        `Messages`,
        {
          content: this.value,
          account_id: localStorage.getItem("userId"),
          class_room_id: "0aee1c4c-3fd8-4182-8003-b10b27fc7262",
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
    getMessageDb() {
      get(
        "Messages",
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
      this.HideEmoji()
        this.$refs['homeMessage'].scrollIntoView({behavior: 'smooth'});
    },
    getMessage() {
      onSnapshot(collection(db, "chat"), () => {
        // Respond to data
        // ...
        this.getMessageDb();
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