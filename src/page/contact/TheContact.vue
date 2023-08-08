<template>
<div class="the_contact">
  
  <div class="left_menu">
    <div class="items-contact">
      <div>
        <img src="https://png.pngtree.com/png-clipart/20191123/original/pngtree-outline-people-icon-png-image_5196471.jpg" alt="liên hệ" style="width: 30px; height: 30px;">
        Liên hệ 
      </div>
      <div>
        <img src="https://cdn-icons-png.flaticon.com/512/109/109613.png" alt="liên hệ" style="width: 30px; height: 30px;">
        Xem gần đây
      </div>
      <div>
        <img src="https://cdn.icon-icons.com/icons2/2768/PNG/512/star_icon_176624.png" alt="liên hệ" style="width: 30px; height: 30px;">
        Liên hệ yêu thích
      </div>
    </div>
    <div class="dropdown-items">
      <div>
        <div class="dropbtn" @click="toggleDropdown">
          <img src="data:image/png;base64,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" alt="">
          <p>Nhãn</p>
        </div>
        <div v-if="showDropdown" class="dropdown-content">
              <div>
                <img src="https://cdn-icons-png.flaticon.com/512/126/126167.png" alt="new post">
                New post
              </div>
              <div>
                <img src="data:image/png;base64,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" alt="other post">
                Other post
              </div>
        </div>
      </div>
      <div class="new-tag">
        <img src="https://banner2.cleanpng.com/20180315/qae/kisspng-computer-icons-plus-sign-clip-art-plus-sign-5aaad899307aa1.3479178215211460091986.jpg" alt="">
        Tạo nhãn mới
      </div>
    </div>
    <div class="setting">
      <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="thiết lập">
      Thiết lập
    </div>
  </div>
  <div class="body-contact">
    <div class="all-contact">
      <h1>Tất cả liên hệ</h1>
      <div>
              <button @click="toggleShowContact">Tất cả liên hệ
                <img src="data:image/png;base64,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" alt="">
              </button>
              <div v-if="showContact">
                <img src="" alt="">
                Name
              </div>
        </div>
    </div>
    <div class="infor">
      <div class="avatar" @click="toggleShowInfor">
        <img src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/357409054_1369314393927348_2710285907220226602_n.jpg?_nc_cat=103&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=sg04bTcP9GcAX-ytqmh&_nc_ht=scontent.fhan14-3.fna&oh=00_AfCho5hUjUkzYpP5xZ3_IhZLxYEXtsTnsf322_3wcyx08A&oe=64D688B4" alt="avatar">
        <div class="des-infor">
          <h2>Trần Văn Tám</h2>
          <p>NV Tư vấn bán hàng</p>
          <p>Văn phòng Tổng công ty - Trung tâm KD Online</p>
        </div>
      </div>
          <div class="contact">
            <div>
              Đt di động 
              <a>0366841290</a> 
            </div>
            <div>
              Email cơ quan
              <a>tam7@gmail.com</a> 
            </div>
            <div>
              Skype
              <a>https://www.facebook.com/profile.php?id=100025464006854</a> 
            </div>
            <div>
              Đt cơ quan
              <a>0366841290</a> 
            </div>
            <div>
              Email cá nhân
              <a>tam7@gmail.com</a> 
            </div>
            <div>
              Facebook
              <a>https://www.facebook.com/profile.php?id=100025464006854</a> 
            </div>
        </div>
    </div>
  </div>
</div>
<ContactDetail v-if="showInfor" fullname="Trần Văn Tám"/>
  
</template>

<script>
import ContactDetail from "@/page/contact/ContactDetail.vue";
export default {
  components:{ContactDetail},
  data() {
    return {
      showDropdown: false,
      showContact: false,
      showInfor: false
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleShowContact() {
      this.showContact = !this.showContact;
    },
    toggleShowInfor(){
      this.showInfor = !this.showInfor;
    }
  }

}
</script>

<style> 
</style>