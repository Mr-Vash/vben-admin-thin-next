import type { MenuModule } from '/@/router/types';

const menu: MenuModule = {
  orderNo: 10,
  menu: {
    name: '人事管理',
    path: '/personnel',
    children: [
      {
        path: 'employee',
        name: '员工管理',
      },
      {
        path: 'employeeUpdate/:type/:id',
        name: '员工信息录入',
      },
      {
        path: 'department/index',
        name: '部门管理',
      },
    ],
  },
};
export default menu;
