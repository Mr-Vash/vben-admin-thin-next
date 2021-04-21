export enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login',
  // basic home path
  BASE_HOME = '/dashboard',

  // 员工列表
  EMPLOYEE = '/personnel/employee',

  // 员工录入信息
  EMPLOYEE_UPDATE = '/personnel/employeeUpdate',

  // 字典数据列表
  DICTIONARY_DATA = '/dictionary/dictionaryData',

  // 岗位列表
  DPARTMENT_STATION = '/personnel/department/departmentStation',

  // 岗位级别列表
  DPARTMENT_STATION_LEVEL = '/personnel/department/departmentStationLevel',

  // error page path
  ERROR_PAGE = '/exception',
  // error log page path
  ERROR_LOG_PAGE = '/error-log/list',
}
