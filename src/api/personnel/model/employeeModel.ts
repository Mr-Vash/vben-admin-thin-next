export interface EmployeeItem {
  name: any;
  nation: any;
  sex: any;
  political: any;
  education: any;
  phone: any;
  idnum: any;
  birthday: any;
  age: any;
  idaddress: any;
  comeFrom: any;
  address: any;
  emergencyContact: any;
  emergencyPhone: any;
  graduateSchool: any;
  graduateTime: any;
  major: any;
  cert: any;
  title: any;

  duty: any;
  role: any;
  department: any;
  station: any;
  stationLevel: any;
  banCi: any;
  dutyTime: any;
  workYear: any;
  bankCardNo: any;
  deposit: any;
  depositTimes: any;
  workNo: any;
  locker: any;
  transferIn: any;
  transferCome: any;
  contractAt: any;
  healthAt: any;
  social: any;
  socialAt: any;
  status: any;
  userImg: any;
  frontImg: any;
  backImg: any;
  healthImg: any;
  bankImg: any;
}

/**
 * @description: 部门
 */
export interface getEmployeeListByNameParams {
  name: number | string;
}

export interface delEmployeeByIdParams {
  id: number | string;
}

export interface changeEmployeeStatusParams {
  id: number | string;
  status: number | string;
}

export interface editEmployeeParams {
  name: any;
  nation: any;
  sex: any;
  political: any;
  education: any;
  phone: any;
  idnum: any;
  birthday: any;
  age: any;
  idaddress: any;
  comeFrom: any;
  address: any;
  emergencyContact: any;
  emergencyPhone: any;
  graduateSchool: any;
  graduateTime: any;
  major: any;
  cert: any;
  title: any;

  duty: any;
  role: any;
  department: any;
  station: any;
  stationLevel: any;
  banCi: any;
  dutyTime: any;
  workYear: any;
  bankCardNo: any;
  deposit: any;
  depositTimes: any;
  workNo: any;
  locker: any;
  transferIn: any;
  transferCome: any;
  contractAt: any;
  healthAt: any;
  social: any;
  socialAt: any;
  status: any;
  userImg: any;
  frontImg: any;
  backImg: any;
  healthImg: any;
  bankImg: any;
  id?: number | string;
}

export type getEmployeeListResultModel = EmployeeItem[];

export type getEmployeeResultModel = editEmployeeParams;
