<template>
  <DialogEvent
    :isShowActionEvent="isShowModel"
    @hideDilog="hideDilog"
    :dataEvent="itemEvent"
    @ReloadData="getEvent"
  />
  <ModelDetaiEvent
    :adminQ="isAdmin"
    @ReloadEvent="getEvent"
    :dataDetail="itemDetail"
    :isTogglerDetail="isDetail"
    @hideDilogDetail="
      (value) => {
        this.isDetail = value;
      }
    "
  />
  <div class="main-event">
    <div class="event-header">
      <div class="search">
        <label>
          <input type="text" placeholder="Tìm kiếm theo tiêu đề sự kiện" />
          <ion-icon name="search-outline"></ion-icon>
        </label>
      </div>
      <div class="btn-add" v-show="isAdmin">
        <Button type="primary" :size="70" @click="addEvent()">
          <template #icon>
            <PlusOutlined />
          </template>
          Thêm sự kiện
        </Button>
      </div>
    </div>
    <div class="items">
      <div
        class="item"
        v-for="(item, index) in data"
        :key="index"
        @click="openDetai(item)"
      >
        <ion-icon
          name="document-text-outline"
          class="document icon icon24"
        ></ion-icon>
        <div class="content-item">
          <div class="header">{{ item.schedule_content }}</div>
          <div class="content">
            <div class="create-date">
              Ngày tạo : {{ showTime(item.created_day) }}
            </div>
            <div class="deadline">
              Thời gian nộp bài: {{ showTime(item.time_end) }}
            </div>
          </div>
        </div>
        <div class="progess">{{ item.complete }}/{{ item.all }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import DialogEvent from "@/layout/form/DialogEvent.vue";
import { get, getById } from "@/common/api/api";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import ModelDetaiEvent from "@/layout/form/ModelDetaiEvent.vue";

export default {
  name: "TheEvent",
  components: { Button, PlusOutlined, DialogEvent, ModelDetaiEvent },
  data() {
    return {
      isAdmin: false,
      isDetail: false,
      itemEvent: [],
      isShowModel: false,
      data: [],
      itemDetail: {},
    };
  },
  created() {
    this.getEvent();
    this.getDataUser()
  },
  methods: {
    getDataUser() {
      getById(
        "Accounts",
        localStorage.getItem("userId"),
        (res) => {
          if (res.data.role == 0) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
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
    openDetai(item) {
      this.itemDetail = item;
      this.isDetail = true;
    },
    getEvent() {
      get(
        "Schedules",
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
    addEvent() {
      this.itemEvent = [];
      this.isShowModel = true;
    },
    hideDilog(value) {
      this.isShowModel = value;
    },
    showTime(dateTime) {
      return new Date(dateTime)
        .toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" })
        .replace(",", "");
    },
  },
};
</script>

<style scoped>
</style>