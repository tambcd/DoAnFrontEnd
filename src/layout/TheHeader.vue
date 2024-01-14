<template>
  <div class="topbar">
    <div class="toggle" @click="toggleApp">
      <ion-icon name="menu-outline"></ion-icon>
    </div>
    <div class="menu-app" v-if="showForm">
      <router-link to="/contact" @click="showHide('Danh bạ')">
        <div class="app_icon">
          <div class="icon-app">
            <img
              src="https://i.pinimg.com/originals/84/4e/8c/844e8cd4ab26c82286238471f0e5a901.png"
            />
          </div>
          <div class="name_app">Danh bạ</div>
        </div>
      </router-link>
      <router-link to="/social_network" @click="showHide('Mạng xã hội')">
        <div class="app_icon">
          <div class="icon-app">
            <img
              src="https://amismisa.misacdn.net/images/iconapps/newsfeed.svg?_=20230221"
            />
          </div>
          <div class="name_app">Mạng xã hội</div>
        </div>
      </router-link>
      <router-link to="/chat" @click="showHide('Trò chuyện')">
        <div class="app_icon">
          <div class="icon-app">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/1024px-Circle-icons-chat.svg.png"
            />
          </div>
          <div class="name_app">Trò chuyện</div>
        </div>
      </router-link>
      <router-link to="/report" @click="showHide('Báo cáo')">
        <div class="app_icon">
          <div class="icon-app">
            <img
              src="https://amismisa.misacdn.net/images/iconapps/Dispatch.svg?_=20230221"
            />
          </div>
          <div class="name_app">Báo cáo</div>
        </div>
      </router-link>

      <router-link to="/score" @click="showHide('Điểm sinh viên')">
        <div class="app_icon">
          <div class="icon-app">
            <img
              src="https://blog.vnresource.vn/LMS_MISA/LogoLMS.png"
            />
          </div>
          <div class="name_app">Quản lý điểm</div>
        </div>
      </router-link>
    </div>
    <div class="name-class">{{ headerText }}</div>
    <div class="header_right">
      <Popover
        placement="bottomRight"
        v-model:open="visibleNotify"
        title="Thông báo ứng dụng"
        trigger="click"
      >
        <template #content>
          <Select
            ref="select"
            v-model:value="valueReadNotify"
            style="width: 200px; height: 35px"
            @focus="focus"
            placeholder="Chọn học kỳ"
            @change="changestatusNotify()"
          >
            <SelectOption value="all">Tất cả</SelectOption>
            <SelectOption value="0">Chưa xem</SelectOption>
            <SelectOption value="1">Đã xem</SelectOption>
          </Select>

          <div v-for="item in filterNotify" :key="item.notification_id">
            <div v-if="item.typelink == 1" :class="{'noread':item.notification_status==0}" style="width: 300px; height: 35px">
              <router-link to="/report" @click="showHide('Báo cáo')">
                {{ item.full_name }} đã ban hành một biểu mẫu
              </router-link>
            </div>
            <div v-else :class="{'noread':item.notification_status==0}" style="width: 200px; height: 35px">
              <router-link
                to="/social_network"
                @click="showHide('Mạng xã hội')"
              >
                {{ item.full_name }} đã thêm một bài viết mới
              </router-link>
            </div>
          </div>
        </template>
        <template #title>
          <span>Title</span>
        </template>
        <Badge dot>
        <div class="icon_notify icon24"></div>
        </Badge>
      </Popover>

      <Popover>
        <template #content>
          <div class="user-detail">
            <button class="user_icon icon36">{{ TitliAvatar }}</button>
          </div>
          <div class="name-user">
            {{ user.full_name }}
          </div>
          <router-link to="/contact" @click="LogOut()">
          <Button style="width: 100%" type="primary" ghost >Đăng xuất</Button>
        </router-link>
        </template>
        <button class="user_icon icon36">{{ TitliAvatar }}</button>
      </Popover>
    </div>
  </div>
</template>

<script>
import { getById } from "@/common/api/api";
import { Popover, Button, SelectOption, Select,Badge  } from "ant-design-vue";

export default {
  name: "TheHeader",
  components: { Popover, Button, SelectOption, Select,Badge },
  props: {
    idAccount: { default: "" },
  },
  created() {
    this.getDataUser();
    this.loadDataNotiofy();
  },
  data() {
    return {
      miniMenu: true,
      showForm: false,
      user: {},
      TitliAvatar: "TT",
      headerText: "Mạng xã hội",
      visibleNotify: true,
      valueReadNotify: "Tất cả",
      dataNotify: [],
      filterNotify: [],
    };
  },
  methods: {
    LogOut(){
      localStorage.clear();
      location.reload();
    },
    loadDataNotiofy() {
      getById(
        "Notifications/GetNotìyUser",
        localStorage.getItem("userId"),
        (res) => {
          this.dataNotify = res.data;
          this.filterNotify = res.data;
          console.log(res.data);
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          console.log(error);
        }
      );
    },
    changestatusNotify() {
      if (this.valueReadNotify == "all") {
        this.filterNotify = this.dataNotify;
      } else {
        this.filterNotify = this.dataNotify.filter(
          (obj) => obj.notification_status == this.valueReadNotify
        );
      }
    },
    showHide(text) {
      this.headerText = text;
      this.showForm = false;
    },
    toggleApp() {
      this.showForm = !this.showForm;
    },
    toggleMenu() {
      this.miniMenu = !this.miniMenu;
      this.$emit("toggleMenu", this.miniMenu);
    },
    getDataUser() {
      getById(
        "Users/getByIdAccount",
        localStorage.getItem("userId"),
        (res) => {
          this.user = res.data;
          console.log(this.user);
          this.TitliAvatar = this.getAvatar(
            this.user.first_name,
            this.user.last_name
          );
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          console.log(error);
        }
      );
    },
    getAvatar(fisrtName, lastName) {
      if (fisrtName[0] && lastName[0]) return fisrtName[0] + lastName[0];
      else return "TT";
    },
  },
  watch: {},
};
</script>

<style>
.user-detail {
  width: 130px;
  display: flex;
  align-content: center;
  justify-content: center;
}
.noread{
  background: whitesmoke;
}
</style>