import { defHttp } from '/@/utils/http/axios';
import {
  getEmployeeListResultModel,
  getEmployeeListByNameParams,
  editEmployeeParams,
  delEmployeeByIdParams,
  getEmployeeResultModel,
  changeEmployeeStatusParams,
} from './model/employeeModel';

enum Api {
  PostEmployeeList = '/employee/getList',
  GetEmployeeInfo = '/employee/info',
  AddEmployee = '/employee/add',
  EditEmployee = '/employee/edit',
  DelEmployee = '/employee/delete',

  ChangeEmployeeStatus = '/employee/changeStatus',
}

/**
 * @description: 员工
 */

export const getEmployeeList = (params: getEmployeeListByNameParams) => {
  return defHttp.post<getEmployeeListResultModel>({ url: Api.PostEmployeeList, params });
};

export const addEmployee = (params: editEmployeeParams) => {
  return defHttp.get<getEmployeeListResultModel>({ url: Api.AddEmployee, params });
};

export const editEmployee = (params: editEmployeeParams) => {
  return defHttp.get<getEmployeeListResultModel>({ url: Api.EditEmployee, params });
};

export const delEmployee = (params: delEmployeeByIdParams) => {
  return defHttp.get<getEmployeeListResultModel>({ url: Api.DelEmployee, params });
};

export const getEmployeeInfo = (params: delEmployeeByIdParams) => {
  return defHttp.get<getEmployeeResultModel>({ url: Api.GetEmployeeInfo, params });
};

export const changeEmployeeStatus = (params: changeEmployeeStatusParams) => {
  return defHttp.get<getEmployeeResultModel>({ url: Api.ChangeEmployeeStatus, params });
};
