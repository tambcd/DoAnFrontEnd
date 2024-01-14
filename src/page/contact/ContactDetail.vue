<template>
  <div class="contact-detail">
    <div class="avatar-detail">
      <img
        v-if="itemdetail.urlAvartar"
        :src="itemdetail.urlAvartar"
        alt="avatar"
      />
      <button v-else class="avatar-text">
        {{ getAvatarName(itemdetail.full_name) }}
      </button>
      <div class="des-infor">
        <h2>{{ itemdetail.full_name || "NO name" }}</h2>
        <p>{{itemdetail.role == 1 ? "Sinh Viên" : "Giảng viên / Cán bộ nhà trường"}}</p>
        <p>Lớp Công Nghệ Thông Tin 1 - K60</p>
        <div class="tag">
          <img
            src="https://cdn-icons-png.flaticon.com/512/126/126167.png"
            alt="new post"
          />
          Gắn nhãn
        </div>
      </div>
      <div class="close" @click="closeDetail()">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png"
          style="width: 30px; height: 30px"
          alt="close"
        />
      </div>
    </div>
    <div class="infor-detail">
      <div class="detail-contact">
        <div>
          <h3>Điện thoại di động</h3>
          <a>{{ itemdetail.phone || "--" }}</a>
        </div>
        <div>
          <h3>Email cá nhân</h3>
          <a>{{ itemdetail.email || "--" }}</a>
        </div>
        <div>
          <h3>Zalo</h3>
          <a>{{ itemdetail.zalo || "--" }}</a>
        </div>
        <div>
          <h3>Ngày sinh</h3>
          <a>{{ getDate(itemdetail.date_of_birth) || "--" }}</a>
        </div>
        <div>
          <h3>Email cá nhân</h3>
          <a>tam7@gmail.com</a>
        </div>
        <div>
          <h3>Facebook</h3>
          <a>https://www.facebook.com/profile.php?id=100025464006854</a>
        </div>
      </div>
    </div>
    <div class="infor-detail2">
      <h1>Thông tin cá nhân</h1>
      <div class="detail-contact2">
        <div>
          <h3>Tình trạng hôn nhân</h3>
          <p>Độc thân</p>
        </div>
        <div>
          <h3>Giới tính</h3>
          <p>{{Gender(itemdetail.gender)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateToStringShow ,Gender } from "@/common/helper/format.js";
export default {
  props: {
    itemdetail: {},
  },
  data() {
    return {
      showInfor1: true,
    };
  },
  methods: {
    toggleShowInfor1() {
      this.showInfor1 = !this.showInfor1;
    },
    Gender,
    closeDetail() {
      this.$emit("closeDetailInfor");
    },

    getDate(date) {
      return dateToStringShow(date);
    },

    getAvatarName(fullName) {
        if(fullName)
      return (
        fullName.match(/[A-Z]/g)[0] +
        fullName.match(/[A-Z]/g)[fullName.match(/[A-Z]/g).length - 1]
      );
    },
  },
};
</script>

<style>
/* tim file contactDetail.css */
</style>