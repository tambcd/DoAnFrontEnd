const DataObject = {
  columnsScore: [
    { title: 'Mã sinh viên', dataIndex: 'member_code', key: 'member_code' },
    { title: 'Họ và tên', dataIndex: 'full_name', key: 'full_name' },
    { title: 'Tên học phần', dataIndex: 'subject_name', key: 'subject_name' },
    { title: 'Số TC', dataIndex: 'number_credits', key: 'number_credits' },
    { title: 'Lần học', dataIndex: 'study_times', key: 'study_times' },
    { title: 'Điểm(10)', dataIndex: 'sore_number', key: 'sore_number' },
    { title: 'Điểm(4)', dataIndex: 'score_number_4', key: 'score_number_4' },
    { title: 'Đánh giá', dataIndex: 'status', key: 'status' },
    { title: '', dataIndex: 'Action', key: 'Action', fixed: 'right' },
  ],
  columnsScoreUser: [
    { title: 'Số thứ tự', dataIndex: 'STT', key: 'STT' },
    { title: 'Tên học phần', dataIndex: 'subject_name', key: 'subject_name' },
    { title: 'Số TC', dataIndex: 'number_credits', key: 'number_credits' },
    { title: 'Lần học', dataIndex: 'study_times', key: 'study_times' },
    { title: 'Điểm(10)', dataIndex: 'sore_number', key: 'sore_number' },
    { title: 'Điểm(4)', dataIndex: 'score_number_4', key: 'score_number_4' },
    { title: 'Đánh giá', dataIndex: 'status', key: 'status' },
    { title: '', dataIndex: 'Action', key: 'Action', fixed: 'right' },
  ],
  columnsStudent: [
    { title: 'Mã sinh viên', dataIndex: 'member_code', key: 'member_code'},
    { title: 'Họ và tên', dataIndex: 'full_name', key: 'full_name'},
    { title: 'Ngày sinh', dataIndex: 'date_of_birth', key: 'date_of_birth'},
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender'},
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số điện thoại', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status'},
    { title: 'Hành động', dataIndex: 'Action', key: 'Action' },

  ],
  optionMenuAdmin: [

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
   
  ],
  optionMenuUser: [

    {
      ItemTxt: "Trang chủ",
      item_icon: "home-outline",
      path: "/home",
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

  
  ]

}

export default DataObject;