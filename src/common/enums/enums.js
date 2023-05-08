 const MISAEnum = {
    typeDisplay:{
        row:1,
        column:2
    },
    /**kiểu của form nhập liệu 
     * @ add =  1 : thêm
     * @ update = 2 : sửa 
     * @ Replication = 3 : nhân bản 
     * */ 
    stateAction : {
        add :1, 
        update:2 ,
        delete:3
    },
    /**kiểu của form nhập liệu 
     * @ add =  1 : thêm
     * @ update = 2 : sửa 
     * @ Replication = 3 : nhân bản 
     * */ 
    stateDialog : {
        add :1, 
        update:2 ,
        replication:3
    },
    /**kiểu của form nhập liệu 
     * @ delete =  1 : xóa
     * @ erro = 2 : cảnh báo 
     * 
     * */ 
    typeMessage:{
        delete:2,
        erro:1

    },
    /** Key combobox 
     * @ deparment =  1 : phòng ban
     * @ category = 2 : loại tài sản 
     * 
     * */ 
    typeCombobox:{
        deparment:"department",
        category:"fixed_asset_category"

    },
     /** kiểu validate
     * @ empty =  1 : để trống
     * @ cost = 2 : nguyên giá lớn hơn giá trị hao mòn
     * 
     * */ 
     typeValidate:{
        empty:1,
        cost:2

    },
     /** kiểu validate
     * @ allDelete =  1 : xóa tất cả 
     * @ delete = 2 : xóa 1
     * 
     * */ 
     typeDelete:{
        allDelete:1,
        delete:2

    },
/** kiểu dữ liệu
     * @text =  1 : chữ
     * @date = 2 : ngày tháng 
     * @number = 3  : số 
     * 
     * */
    typeData:{
        text : 1,
        date : 2,
        number : 3,
    }

    
}
export default MISAEnum;