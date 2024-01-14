<template>
  <div class="infor">
    <div class="infor_name">
      <div class="avatar">
        <img
          v-if="itemInfor.urlAvartar"
          :src="itemInfor.urlAvartar"
          alt="avatar"
        />
        <button v-else class="avatar-text">
          {{ getAvatarName(itemInfor.full_name) }}
        </button>
      </div>
      <div class="des-infor">
        <h class="name">{{ itemInfor.full_name }}</h
        ><span style="font-size: 16px">({{ itemInfor.member_code }})</span>
        <div>{{itemInfor.role == 1 ? "Sinh Viên" : "Giảng viên / Cán bộ nhà trường"}}</div>
        <div>Lớp Công Nghệ Thông Tin 1 - K60</div>
      </div>
    </div>
    <div class="contact">
      <div class="gr-inf">
        <div>
          Điện thoại di động <br />
          <a>{{ itemInfor.phone || "--" }}</a>
        </div>
        <div>
          Nơi sinh <br />
          <a>{{ itemInfor.countryside || "--" }}</a>
        </div>
      </div>
      <div class="gr-inf">
        <div>
          zalo <br />
          <a>{{ itemInfor.zalo || "--" }}</a>
        </div>
        <div>
          Email cá nhân <br />
          <a>{{ itemInfor.email || "--" }}</a>
        </div>
      </div>
      <div class="gr-inf">
        <div>
          Năm sinh <br />
          <a>{{ getYear(itemInfor.date_of_birth) || "--" }}</a>
        </div>
        <div>
          Facebook <br />
          <a :href="itemInfor.facebook" target="_blank">
            {{ itemInfor.facebook || "--" }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemInfor: {},
  },
  methods: {
    getYear(date) {
      let dateObj = new Date(date);
      var year = dateObj.getFullYear();
      return year;
    },
    getAvatarName(fullName) {
      return (
        fullName.match(/[A-Z]/g)[0] +
        fullName.match(/[A-Z]/g)[fullName.match(/[A-Z]/g).length - 1]
      );
    },
  },
};
</script>

<style>
</style>