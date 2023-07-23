/**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : Đảo ngược chuỗi
     */
export function reverse(string) {
  var strRev = "";

  for (var i = string.length - 1; i >= 0; i--) {
    strRev += string[i];
  }

  return strRev;
}

/**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : định dạng số thập phân
     */
export function formatDouble(string) {

  return string.replaceAll(".", ",");
}
/**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : định dạng số thập phân
     */
export function Doubletonumber(string) {

  return Number(string.replaceAll(",", ""));
}


/**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : định dạng tiền
     */
export function formatMoney(dataFormat) {
  dataFormat = Number(dataFormat).toString()
  var result = "";
  let a = Math.floor(dataFormat.length / 3);
  let b = dataFormat.length % 3;
  let index = 1;
  while (a) {
    result +=
      dataFormat[dataFormat.length - index] +
      dataFormat[dataFormat.length - index - 1] +
      dataFormat[dataFormat.length - index - 2] +
      ".";
    index += 3;
    a--;
  }

  if (b == 0) {
    result = reverse(result.substr(0, result.length - 1));
  } else {
    while (b) {
      result += dataFormat[b - 1];
      b--;
    }
    result = reverse(result);
  }
  return result;

}
/**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : lấy ra ngày hiện tại và format DD/MM/YYYY
     */
export function getNowday() {
  // mặc đinh là ngày hiện tại
  if (new Date().getMonth() + 1 < 10) {
    if (new Date().getDate() < 10) {
      return new Date().getFullYear().toString() + "-0" + (new Date().getMonth() + 1).toString() + "-0" + new Date().getDate().toString();
    }
    return new Date().getFullYear().toString() + "-0" + (new Date().getMonth() + 1).toString() + "-" + new Date().getDate().toString();
  } else {
    if (new Date().getDate() < 10) {
      return new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString() + "-0" + new Date().getDate().toString();
    }
    return new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString() + "-" + new Date().getDate().toString();
  }
}

/**     
     * @create by : MF1270
     * @@create day : 1/03/2023
     * ham : chuyển ngày sang chuỗi và format DD/MM/YYYY
     */
export function dateToString(dateNew) {
  if (new Date(dateNew).getMonth() + 1 < 10) {
    if (new Date(dateNew).getDate() < 10) {
      return (
        new Date(dateNew).getFullYear().toString() +
        "-0" +
        (new Date(dateNew).getMonth() + 1).toString() +
        "-0" +
        new Date(dateNew).getDate().toString()
      );
    }
    return (
      new Date(dateNew).getFullYear().toString() +
      "-0" +
      (new Date(dateNew).getMonth() + 1).toString() +
      "-" +
      new Date(dateNew).getDate().toString()
    );
  } else {
    if (new Date(dateNew).getDate() < 10) {
      return (
        new Date(dateNew).getFullYear().toString() +
        "-" +
        (new Date(dateNew).getMonth() + 1).toString() +
        "-0" +
        new Date(dateNew).getDate().toString()
      );
    }
    return (
      new Date(dateNew).getFullYear().toString() +
      "-" +
      (new Date(dateNew).getMonth() + 1).toString() +
      "-" +
      new Date(dateNew).getDate().toString()
    );
  }
}


/**
    * @create by : MF1270
    * @create day : 03/03/2023
    * ham : tiền thành số
    */
export function moneyToNumber(money) {
  if (money.length > 3) {
    money.replaceAll(".", "");
    return Number(money.replaceAll(".", ""));
  }
  return Number(money);
}
/**
 * @create by : MF1270
 * @create day : 18/04/2023
 * ham : định dạng ngày tháng hiện thị
 */
export function dateToStringShow(dateNew) {
  if (new Date(dateNew).getMonth() + 1 < 10) {
    if (new Date(dateNew).getDate() < 10) {
      return (
        "0" + new Date(dateNew).getDate().toString() + "/0" +
        (new Date(dateNew).getMonth() + 1).toString() + "/" +
        new Date(dateNew).getFullYear().toString()
      );
    }
    return (
      new Date(dateNew).getDate().toString() + "/0" +
      (new Date(dateNew).getMonth() + 1).toString() + "/" +
      new Date(dateNew).getFullYear().toString()
    );
  } else {
    if (new Date(dateNew).getDate() < 10) {
      return (
        "0" + new Date(dateNew).getDate().toString() + "/" +
        (new Date(dateNew).getMonth() + 1).toString() + "/" +
        new Date(dateNew).getFullYear().toString()
      );
    }
    return (
      new Date(dateNew).getDate().toString() + "/" +
      (new Date(dateNew).getMonth() + 1).toString() + "/" +
      new Date(dateNew).getFullYear().toString()
    );
  }
}

export function score4(score) {
  if (score < 2) {
    return 0;
  }
  else if (score < 4) {
    return 0.5;
  }
  if (score < 4.5) {
    return 1;
  }
  else if (score < 5.5) {
    return 1.5;
  }
  else if (score < 6) {
    return 2;
  }
  else if (score < 7)
    return 2.5;
  else if (score < 8)
    return 3;
  if (score < 8.5)
    return 3.5;
  if (score < 9.5)
    return 3.8

  if(score >= 9.5)
  return 4;
}

export function statusScore(score) {

  if(score < 4){
      return "Không đạt"
  }
  return "Đạt"

}

