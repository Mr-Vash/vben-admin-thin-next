import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const personnel: AppRouteModule = {
  path: '/personnel',
  name: 'Personnel',
  component: LAYOUT,
  redirect: '/personnel/employee',
  meta: {
    icon: 'cil:people',
    title: '人事管理',
  },
  children: [
    {
      path: 'employee',
      name: 'Employee',
      component: () => import('/@/views/personnel/employee/index.vue'),
      meta: {
        title: '员工管理',
      },
    },
    {
      // path: 'employeeUpdate/:type+',  //传递数组： type：[]
      path: 'employeeUpdate/:type/:id',
      name: 'EmployeeUpdate',
      component: () => import('/@/views/personnel/employee/update.vue'),
      meta: {
        title: '员工信息录入',
        hideMenu: true,
        carryParam: true,
        currentActiveMenu: '/personnel/employee',
      },
    },
    {
      path: 'department',
      name: 'Department',
      redirect: '/personnel/department/index',

      meta: {
        title: '部门管理',
      },
      children: [
        {
          path: 'index',
          name: 'DepartmentIndex',
          component: () => import('/@/views/personnel/department/index.vue'),
          meta: {
            title: '部门管理',
          },
        },
        {
          path: 'departmentStation/:name/:id',
          name: 'DepartmentStation',
          component: () => import('/@/views/personnel/department/station.vue'),
          meta: {
            // title: t('routes.dashboard.workbench'),
            title: '岗位管理',
            carryParam: true,
            currentActiveMenu: '/personnel/department/index',
          },
        },
        {
          path: 'departmentStationLevel/:name/:id',
          name: 'DepartmentStationLevel',
          component: () => import('/@/views/personnel/department/level.vue'),
          meta: {
            // title: t('routes.dashboard.workbench'),
            title: '级别管理',
            carryParam: true,
            currentActiveMenu: '/personnel/department/index',
          },
        },
      ],
    },
  ],
};

export default personnel;
