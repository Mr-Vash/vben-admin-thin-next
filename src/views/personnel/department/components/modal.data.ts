import { FormSchema } from '/@/components/Table';
import { getStationLevelList } from '/@/api/sys/dictionary';

export const dataFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'departmentId',
    label: 'departmentId',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '岗位名称',
    component: 'Input',
    required: true,
  },
];

export const data1FormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'stationId',
    label: 'departmentId',
    component: 'Input',
    show: false,
  },
  {
    label: '职级',
    field: 'levelId',
    component: 'ApiSelect',
    componentProps: {
      api: getStationLevelList,
      labelField: 'name',
      valueField: 'id',
    },
    rules: [{ type: 'number', required: true }],
  },
  {
    field: 'wages',
    label: '工资',
    component: 'Input',
    required: true,
  },
];

export const indexFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
];
