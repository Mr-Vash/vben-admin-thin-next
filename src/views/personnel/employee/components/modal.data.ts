import { FormSchema } from '/@/components/Table';

export const dataFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '字典名称',
    component: 'Input',
    required: true,
  },

  {
    label: '字典类型',
    field: 'dictType',
    component: 'Input',
    show: false,
  },

  {
    label: '排序',
    field: 'sort',
    component: 'InputNumber',
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
    field: 'dictName',
    label: '字典名称',
    component: 'Input',
    required: true,
  },

  {
    label: '字典类型',
    field: 'dictType',
    component: 'Input',
    required: true,
  },

  {
    label: '备注信息',
    field: 'description',
    component: 'InputTextArea',
  },
];
