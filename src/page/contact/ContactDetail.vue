<template v-if="showInfor1">
<div class="contact-detail">
    <div class="avatar-detail">
        <img urc = 'https://vapa.vn/wp-content/uploads/2022/12/anh-avatar-cute-054.jpg'/>
        <div class="des-infor">
            <h2>{{fullname}}</h2>
            <p>NV Tư vấn bán hàng</p>
            <p>Văn phòng Tổng công ty - Trung tâm KD Online</p>
            <div class="tag"> 
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126167.png" alt="new post">
                    Gắn nhãn
            </div>
        </div>
        <div class="close"> 
            <img @click="toggleShowInfor1" src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png" style="width: 30px;height: 30px;" alt="close">
        </div>
    </div>
    <div class="infor-detail">
        <div class="detail-contact">
            <div>
                <h3>Đt di động </h3>
                <a>0366841290</a> 
            </div>
            <div>
                <h3>Email cơ quan</h3>
                <a>tam7@gmail.com</a> 
            </div>
            <div>
                <h3>Skype</h3>
                <a>https://www.facebook.com/profile.php?id=100025464006854</a> 
            </div>
            <div>
                <h3>Đt cơ quan</h3>
                <a>0366841290</a> 
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
                <h3>Tình trạng hôn nhân </h3>
                <p>Độc thân</p> 
            </div>
            <div>
                <h3>Giới tính</h3>
                <p>Nũ</p> 
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        fullname:String
    },
    data() {
        return {
            showInfor1: true,
        };
    },
    methods: {
    toggleShowInfor1(){
        this.showInfor1 = !this.showInfor1;
    }
}
}
</script>

<style>
 /* tim file contactDetail.css */
</style>