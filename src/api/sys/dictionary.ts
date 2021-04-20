import { defHttp } from '/@/utils/http/axios';
import {
  getDictionaryTypeListResultModel,
  getDictionaryListByNameParams,
  dictionaryTypeParams,
  delDictionaryTypeByIdParams,
  getDictionaryListByTypeParams,
  getDictionaryDataListResultModel,
  dictionaryDataParams,
  delDictionaryDataByIdParams,
} from './model/dictionaryModel';

enum Api {
  GetDictoryTypeList = '/dict/typeList',
  AddDictionaryType = '/dict/typeAdd',
  EditDictionaryType = '/dict/typeEdit',
  DelDictionaryType = '/dict/typeDelete',

  GetDictionaryDataList = '/dict/dataList',
  AddDictionaryData = '/dict/dataAdd',
  EditDictionaryData = '/dict/dataEdit',
  DelDictionaryData = '/dict/dataDelete',

  GetStationLevelList = '/dict/getDataByType',
}

/**
 * @description: 字典类型
 */

export const getDictionaryTypeList = (params: getDictionaryListByNameParams) => {
  return defHttp.get<getDictionaryTypeListResultModel>({ url: Api.GetDictoryTypeList, params });
};

export const addDictionaryType = (params: dictionaryTypeParams) => {
  return defHttp.get<getDictionaryTypeListResultModel>({ url: Api.AddDictionaryType, params });
};

export const editDictionaryType = (params: dictionaryTypeParams) => {
  return defHttp.get<getDictionaryTypeListResultModel>({ url: Api.EditDictionaryType, params });
};

export const delDictionaryType = (params: delDictionaryTypeByIdParams) => {
  return defHttp.get<getDictionaryTypeListResultModel>({ url: Api.DelDictionaryType, params });
};

/**
 * @description: 字典数据
 */

export const getDictionaryDataList = (params: getDictionaryListByTypeParams) => {
  return defHttp.get<getDictionaryDataListResultModel>({ url: Api.GetDictionaryDataList, params });
};

export const addDictionaryData = (params: dictionaryDataParams) => {
  return defHttp.get<getDictionaryDataListResultModel>({ url: Api.AddDictionaryData, params });
};

export const editDictionaryData = (params: dictionaryDataParams) => {
  return defHttp.get<getDictionaryDataListResultModel>({ url: Api.EditDictionaryData, params });
};

export const delDictionaryData = (params: delDictionaryDataByIdParams) => {
  return defHttp.get<getDictionaryDataListResultModel>({ url: Api.DelDictionaryData, params });
};

/**
 * @description: 获取字典职级数据
 */

export const getStationLevelList = () => {
  return defHttp.get<getDictionaryDataListResultModel>({
    url: Api.GetStationLevelList,
    params: { dictType: 'level_option' },
  });
};

/**
 * @description: 获取字典职务数据
 */

export const getDutyList = () => {
  return defHttp.get<getDictionaryDataListResultModel>({
    url: Api.GetStationLevelList,
    params: { dictType: 'duty_option' },
  });
};

/**
 * @description: 获取字典角色数据
 */

export const getRoleList = () => {
  return defHttp.get<getDictionaryDataListResultModel>({
    url: Api.GetStationLevelList,
    params: { dictType: 'role_option' },
  });
};

/**
 * @description: 获取字典押金数据
 */

export const getDepositList = () => {
  return defHttp.get<getDictionaryDataListResultModel>({
    url: Api.GetStationLevelList,
    params: { dictType: 'deposit_option' },
  });
};

/**
 * @description: 获取字典班次数据
 */

export const getBanCiList = () => {
  return defHttp.get<getDictionaryDataListResultModel>({
    url: Api.GetStationLevelList,
    params: { dictType: 'banCi_option' },
  });
};

/**
 * @description: 获取字典学历数据
 */

export const getEducationList = () => {
  return defHttp.get<getDictionaryDataListResultModel>({
    url: Api.GetStationLevelList,
    params: { dictType: 'education_option' },
  });
};

/**
 * @description: 获取字典政治面貌数据
 */

export const getPoliticalList = () => {
  return defHttp.get<getDictionaryDataListResultModel>({
    url: Api.GetStationLevelList,
    params: { dictType: 'political_option' },
  });
};

/**
 * @description: 获取字典职称数据
 */

export const getTitleList = () => {
  return defHttp.get<getDictionaryDataListResultModel>({
    url: Api.GetStationLevelList,
    params: { dictType: 'title_option' },
  });
};
