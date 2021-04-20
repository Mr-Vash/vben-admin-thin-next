import { defHttp } from '/@/utils/http/axios';
import {
  getDepartmentListResultModel,
  getDepartmentListByNameParams,
  getDepartmentSelectResultModel,
  editDepartmentParams,
  delDepartmentByIdParams,
  getStationListByIdParams,
  getStationListResultModel,
  editStationParams,
  delStationByIdParams,
  getStationLevelListByIdParams,
  getStationLevelListResultModel,
  editStationLevelParams,
  delStationLevelByIdParams,
} from './model/departmentlModel';

enum Api {
  GetDepartmentList = '/department/getList',
  AddDepartment = '/department/addData',
  EditDepartment = '/department/editData',
  DelDepartment = '/department/deleteData',

  GetDepartmentSelectList = '/department/formData',

  GetStationList = '/station/getList',
  AddStation = '/station/addData',
  EditStation = '/station/editData',
  DelStation = '/station/deleteData',

  GetStationLevelList = '/stationLevel/getList',
  AddStationLevel = '/stationLevel/addData',
  EditStationLevel = '/stationLevel/editData',
  DelStationLevel = '/stationLevel/deleteData',
}

/**
 * @description: 部门类型
 */

export const getDepartmentList = (params: getDepartmentListByNameParams) => {
  return defHttp.get<getDepartmentListResultModel>({ url: Api.GetDepartmentList, params });
};

export const addDepartment = (params: editDepartmentParams) => {
  return defHttp.get<getDepartmentListResultModel>({ url: Api.AddDepartment, params });
};

export const editDepartment = (params: editDepartmentParams) => {
  return defHttp.get<getDepartmentListResultModel>({ url: Api.EditDepartment, params });
};

export const delDepartment = (params: delDepartmentByIdParams) => {
  return defHttp.get<getDepartmentListResultModel>({ url: Api.DelDepartment, params });
};

// 获取部门岗位职级，级联选择器数据
export const getDepartmentSelectList = () => {
  return defHttp.get<getDepartmentSelectResultModel>({ url: Api.GetDepartmentSelectList });
};

/**
 * @description: 岗位数据
 */

export const getStationList = (params: getStationListByIdParams) => {
  return defHttp.get<getStationListResultModel>({ url: Api.GetStationList, params });
};

export const addStation = (params: editStationParams) => {
  return defHttp.get<getStationListResultModel>({ url: Api.AddStation, params });
};

export const editStation = (params: editStationParams) => {
  return defHttp.get<getStationListResultModel>({ url: Api.EditStation, params });
};

export const delStation = (params: delStationByIdParams) => {
  return defHttp.get<getStationListResultModel>({ url: Api.DelStation, params });
};

/**
 * @description: 岗位级别
 */

export const getStationLevelList = (params: getStationLevelListByIdParams) => {
  return defHttp.get<getStationLevelListResultModel>({ url: Api.GetStationLevelList, params });
};

export const addStationLevel = (params: editStationParams) => {
  return defHttp.get<getStationListResultModel>({ url: Api.AddStationLevel, params });
};

export const editStationLevel = (params: editStationLevelParams) => {
  return defHttp.get<getStationLevelListResultModel>({ url: Api.EditStationLevel, params });
};

export const delStationLevel = (params: delStationLevelByIdParams) => {
  return defHttp.get<getStationLevelListResultModel>({ url: Api.DelStationLevel, params });
};
