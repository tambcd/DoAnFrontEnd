import Axios from 'axios';

const API = 'https://localhost:7155/api/v1/';

/**
 * Description: Hàm để get dữ liệu không tham số. 
 * created : tvTam (22/02/2023)
 */
 export const get = (route = '' ,success, errorHandler) => {
    return Axios.get(API + route).then(
        (response) => success(response)

    ).catch(error => {
        errorHandler(error);
    })
} 
/** 
 * Description: Hàm để get dữ liệu có tham số.
 * created : tvTam (22/02/2023)
 */
export const getByFilter = (route = '',param ,success, errorHandler) => {
        return  Axios.get(API + route, {params: param}).then(
            (response) => success(response)

        ).catch(error => {
            errorHandler(error);
            
        })
}
/** 
 * Description: Hàm để đẩy dữ liệu có tham số.
 * created : tvTam (22/02/2023)
 */
export const postByFilter = (route = '',param ,success, errorHandler) => {
        return  Axios.post(API + route, {params: param}).then(
            (response) => success(response)

        ).catch(error => {
            errorHandler(error);
            
        })
}
/**
 * Description: Hàm để get dữ liệu có tham số nhưng được gán vào link. * 
 * created : tvTam (22/02/2023)
 */
export const getById = (route = '',param ,success, errorHandler) => {
    return  Axios.get(API + route + `/${param}`).then(
        (response) => success(response)
    ).catch(error => {
        errorHandler(error);
    })
}
/** 
 * Description: Hàm để post dữ liệu lên. 
 * created : tvTam (22/02/2023)
 */
export const post= (route = '', data, success, errorHandler) =>{
    return  Axios.post(API + route, data).then((response) =>success(response)).catch((error) => errorHandler(error));
}

/**
 * Description: Hàm để put để thay đổi dữ liệu của một bản ghi nhất định.
 * created : tvTam (22/02/2023)
 */
export const put  = (route = '',param, data, success, errorHandler) =>{
    return  Axios.put(API + route +`/${param}`, data).then((response) =>success(response)).catch((error) => errorHandler(error));
}

/**
 * Description: Hàm xóa dữ liệu dựa trên tham số đàu vào.
 * created : tvTam (22/02/2023)
 */
export const deleteOne = (route = '', param, success, errorHandler) =>{
    return  Axios.delete(API + route +`/${param}`).then((response) =>success(response)).catch((error) => errorHandler(error));
}

/** 
 * Description: Hàm xóa hàng loạt dữ liệu dựa trên tham số đàu vào.
 * created : tvTam (22/02/2023)
 */
 
export const deleteMany = (route = '', data, success, errorHandler) =>{
    return  Axios.delete(API + route ,data).then((response) =>success(response)).catch((error) => errorHandler(error));
}
/**
 * Description: Hàm để lấy về mã số nhân viên mới.
 * created : tvTam (22/02/2023)
 */
export const getNewCode = (route ='', success, errorHandler) =>{
    return  Axios.get(API + route).then(
        (response) => success(response)
    ).catch(error => {
        errorHandler(error);
    })
}