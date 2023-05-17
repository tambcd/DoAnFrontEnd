const DataObject = {  
  columnsStudent:[
    { title: 'Mã sinh viên', dataIndex: 'user_code', key: 'user_code', width: 150 },
    { title: 'Họ và tên', dataIndex: 'full_name', key: 'full_name', width: 200 },
    { title: 'Ngày sinh', dataIndex: 'date_of_birth', key: 'date_of_birth', width: 100 },
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender', width: 100},   
    { title: 'Email', dataIndex: 'email', key: 'email', width: 100 },
    { title: 'Số điện thoại', dataIndex: 'phone_number', key: 'phone_number', width: 150 },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 150 },
    { title: 'Hành động', dataIndex: 'action', key: 'action', width: 150 },
    
  ],
    optionMenu : [
        
        {
          ItemTxt: "Trang chủ",
          item_icon: "home-outline",
          path: "/home",
        },
        {
          ItemTxt: "Sinh viên",
          item_icon: "people-circle-outline",
          path: "/students",
        },
        {
          ItemTxt: "Điểm",
          item_icon: "book-outline",
          path: "/score",
        },
        {
          ItemTxt: "Sự kiện",
          item_icon: "calendar-number-outline",
          path: "/event",
        },
        {
            ItemTxt: "Báo cáo thống kê",
            item_icon: "bar-chart-outline",
            path: "/statistical",
          },
          {
            ItemTxt: "Đăng xuất",
            item_icon: "log-out-outline",
            path: "/setting",

          },
    ]
    
}

export default DataObject;