export interface DepartmentItem {
  id: string | number;
  createTime: any;
  updateTime: any;
  name: string;
}

/**
 * @description: 部门
 */
export interface getDepartmentListByNameParams {
  name: number | string;
}

export interface delDepartmentByIdParams {
  id: number | string;
}

export interface editDepartmentParams {
  name: string;
  id?: number | string;
}

export type getDepartmentListResultModel = DepartmentItem[];

/**
 * @description: 岗位
 */

export interface StationItem {
  id: string | number;
  createTime: any;
  updateTime: any;
  name: string;
  departmentId: string | number;
}

export interface getStationListByIdParams {
  departmentId: string;
  name: string;
}

export interface editStationParams {
  name: string;
  departmentId: number | string;
  id?: number | string;
}

export interface delStationByIdParams {
  id: number | string;
}

export type getStationListResultModel = StationItem[];

/**
 * @description: 岗位级别
 */

export interface StationLevelItem {
  id: string | number;
  createTime: any;
  updateTime: any;
  levelName: string;
  levelId: string | number;
  stationId: string | number;
  wages: number;
}

export interface getStationLevelListByIdParams {
  stationID: string | number;
  levelName: string;
}

export interface editStationLevelParams {
  levelName: string;
  levelId: string | number;
  stationId: string | number;
  wages: number;
  id?: number | string;
}

export interface delStationLevelByIdParams {
  id: number | string;
}

export type getStationLevelListResultModel = StationLevelItem[];

export interface DepartmentSelectItem {
  label: string;
  value: string | number;
  children: any;
}

export type getDepartmentSelectResultModel = DepartmentSelectItem[];
