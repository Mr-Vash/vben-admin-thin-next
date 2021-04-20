import { formatToDate } from '/@/utils/dateUtil';

export function getIdCardInfo(IdCard: any, type: number): string {
  if (type === 1) {
    //获取出生日期
    return (
      IdCard.substring(6, 10) + '-' + IdCard.substring(10, 12) + '-' + IdCard.substring(12, 14)
    );
  }
  if (type === 2) {
    //获取性别
    if (parseInt(IdCard.substr(16, 1)) % 2 == 1) {
      return '男';
    } else {
      return '女';
    }
  }
  if (type === 3) {
    //获取年龄
    var ageDate = new Date();
    var month = ageDate.getMonth() + 1;
    var day = ageDate.getDate();
    var age = ageDate.getFullYear() - IdCard.substring(6, 10) - 1;
    if (
      IdCard.substring(10, 12) < month ||
      (IdCard.substring(10, 12) == month && IdCard.substring(12, 14) <= day)
    ) {
      age++;
    }
    if (age <= 0) {
      age = 1;
    }
    return age + '';
  }
  return '获取身份证信息错误';
}

export function getDateYearSub(endDateStr): string {
  var sDate = new Date(Date.parse(endDateStr.replace(/-/g, '/')));
  var eDate = new Date(Date.parse(formatToDate().replace(/-/g, '/')));

  //获得各自的年、月、日
  var sY = sDate.getFullYear();
  var sM = sDate.getMonth() + 1;
  var sD = sDate.getDate();
  var eY = eDate.getFullYear();
  var eM = eDate.getMonth() + 1;
  var eD = eDate.getDate();

  if (eY > sY && sM <= eM && sD <= eD) {
    return eY - sY;
  } else {
    //alert("两个日期之间并非整年，请重新选择");
    return 0;
  }

  return '';
}
