<template>
  <div class="the_contact">
    <div class="left_menu">
      <menu-contact @LoadDataToTag="(data)=>loadData(data)"></menu-contact>
    </div>
    <div class="body-contact">
      <div class="all-contact">
        <h1 class="title-contact_header">Tất cả liên hệ</h1>
        <div class="search-contact">
          <Input
            type=""
            placeholder="Nhập tên, mã người dùng..."
            v-model:value="filterInfor.txtSearch"
          />
        </div>
      </div>
      <div class="list-contact">
        <contact-item
          @click="toggleShowInfor(item)"
          v-for="item in listInfor"
          :key="item.account_id"
          :itemInfor="item"
        >
        </contact-item>
        <Pagination
          class="pagingInfor"
          @showSizeChange="(a, b) => showsize(a, b)"
          @change="(a, b) => changeNumberPage(a, b)"
          v-model:current="filterInfor.PageNumber"
          :total="sumRecordScore"
          :show-total="(total) => `Tổng: ${total} người dùng`"
        >
          <template #buildOptionText="props">
            <span>{{ props.value }} Trang</span>
          </template>
        </Pagination>
      </div>
    </div>
  </div>
  <ContactDetail
    v-if="showInfor"
    :itemdetail="itemdetail"
    @closeDetailInfor="closeInfor()"
  />
</template>

<script>
import ContactDetail from "@/page/contact/ContactDetail.vue";
import { Pagination } from "ant-design-vue";
import { Input } from "ant-design-vue";
import { getByFilter } from "@/common/api/api";
import ContactItem from "./contactpage/ContactItem.vue";
import { toast } from "vue3-toastify";
import { Resource } from "@/common/resource/Resource";
import MenuContact from './contactmenu/MenuContact.vue';
export default {
  components: { ContactDetail, ContactItem, Input, Pagination, MenuContact },
  created() {
    this.loadData();
  },
  data() {
    return {
      showDropdown: false,
      showContact: false,
      showInfor: false,
      itemdetail: {},
      listInfor: [],
      sumRecordScore: 0,
      filterInfor: {
        PageNumber: 1,
        PageSize: 10,
        txtSearch: "",
      },
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleShowContact() {
      this.showContact = !this.showContact;
    },
    toggleShowInfor(itemInfor) {
      if (itemInfor == this.itemdetail) {
        this.showInfor = !this.showInfor;
      } else {
        this.itemdetail = itemInfor;
        this.showInfor = true;
      }
    },

    closeInfor() {
      this.showInfor = false;
    },

    changeNumberPage(a, b) {
      this.filterInfor.PageSize = b;
      this.filterInfor.PageNumber = a;
      this.loadData();
    },
    showsize(a, b) {
      this.filterInfor.PageSize = b;
      this.filterInfor.PageNumber = a;
      this.loadData();
    },
    loadData(data) {      
      getByFilter(
        "Users/getClass",
        {
          txtSearch: this.filterInfor.txtSearch,
          PageSize: this.filterInfor.PageSize,
          PageNumber: this.filterInfor.PageNumber - 1,
        },
        (res) => {
          if (res.data) {
            this.listInfor = res.data;
            if(data && data.list_member ){
              let arrMember = JSON.parse(data.list_member);
              this.listInfor = res.data.filter(obj => arrMember.includes(obj.account_id));
            }
            this.sumRecordScore = res.data[0].totalRecord;
          }
        },
        (error) => {
          // Trường hợp thất bại thì hiển thị toastMessage lỗi và ghi rõ lỗi xảy ra.
          toast.error(Resource.errologin, {
            autoClose: 2000,
            position: "top-center",
          });
          console.log(error);
        }
      );
    },
  },
   watch: {
    'filterInfor.txtSearch'() {
      this.loadData();
    },
   
  },
};
</script>

<style>
</style>