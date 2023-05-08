 /** Validate ngày không được lớn hơn ngày hiện tại 
* @param : giá trị date
* Last Edited: 5/3/2023           
*/
export function validateDay(dateData) {
   if ((dateData - new Date()) > 0) {
       return true;
   }
   return false;
}


 /** Validate để trống
* @param : texy input
* Last Edited: 5/3/2023           
*/
export function isEmpty(data) {
    if ( typeof data == "string" && data.trim() == "") {        
        return true;
      }
      if (data == null) {       
        return true;
      }
      return false;
 }


 