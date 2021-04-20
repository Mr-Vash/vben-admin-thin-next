export interface DictionaryItem {
  id: string | number;
  createTime: any;
  updateTime: any;
  dictName: string;
  dictType: string;
  description?: string;
}

/**
 * @description: 字典类型
 */
export interface getDictionaryListByNameParams {
  dict_name: number | string;
}

export interface dictionaryTypeParams {
  dictName: string;
  dictType: string;
  description?: string;
  id?: number | string;
}

export interface delDictionaryTypeByIdParams {
  id: number | string;
}

export type getDictionaryTypeListResultModel = DictionaryItem[];

/**
 * @description: 字典数据
 */

export interface DictionaryDataItem {
  id: string | number;
  createTime: any;
  updateTime: any;
  name: string;
  dictType: string;
  sort: number;
}

export interface getDictionaryListByTypeParams {
  dict_type: string;
}

export interface dictionaryDataParams {
  name: string;
  dictType: string;
  sort: number;
  id?: number | string;
}

export interface delDictionaryDataByIdParams {
  id: number | string;
}

export type getDictionaryDataListResultModel = DictionaryDataItem[];
