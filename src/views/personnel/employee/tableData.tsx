import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import {
  getPoliticalList,
  getEducationList,
  getTitleList,
  getDutyList,
  getRoleList,
  getBanCiList,
  getDepositList,
} from '/@/api/sys/dictionary';
import { getDateYearSub, getIdCardInfo } from '/@/utils/custom';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    {
      title: '字典名称',
      dataIndex: 'dictName',
      width: 100,
      slots: { customRender: 'title' },
    },
    {
      title: '字典类型',
      dataIndex: 'dictType',
      width: 150,
      customRender: ({ record }) => {
        return h(Tag, { color: 'green' }, () => record.dictType);
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 150,
      sorter: true,
      slots: { customRender: 'updateTime' },
    },
    {
      title: '备注信息',
      width: 220,
      dataIndex: 'description',
    },
  ];
}

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      fixed: 'left',
    },
    {
      title: '字典键值',
      dataIndex: 'name',
      width: 100,
      customRender: ({ record }) => {
        // const status = record.status;
        // const enable = ~~status === 0;
        // const color = enable ? 'green' : 'red';
        // const text = enable ? '启用' : '停用';
        return h(Tag, { color: 'blue' }, () => record.name);
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 150,
      sorter: true,
      slots: { customRender: 'updateTime' },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: 80,
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showAdvancedButton: false,
    schemas: [
      {
        field: `dict_name`,
        label: `字典名称`,
        component: 'Input',
        defaultValue: '',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}

export function getDataConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showAdvancedButton: false,
    schemas: [
      {
        field: `name`,
        label: `字典键值`,
        component: 'Input',
        defaultValue: '',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}

const basicOptions: LabelValueOptions = [
  {
    label: '付晓晓',
    value: '1',
  },
  {
    label: '周毛毛',
    value: '2',
  },
];

const storeTypeOptions: LabelValueOptions = [
  {
    label: '私密',
    value: '1',
  },
  {
    label: '公开',
    value: '2',
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '姓名',
    required: true,
  },
  {
    field: 'nation',
    component: 'Input',
    label: '民族',
    colProps: {
      offset: 2,
    },
    renderComponentContent: () => {
      return {
        suffix: () => '族',
      };
    },
  },
  {
    field: 'sex',
    component: 'RadioGroup',
    label: '性别',
    colProps: {
      offset: 2,
    },
    componentProps: {
      options: [
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'political',
    component: 'ApiSelect',
    componentProps: {
      api: getPoliticalList,
      labelField: 'name',
      valueField: 'id',
    },
    label: '政治面貌',
  },
  {
    field: 'education',
    component: 'ApiSelect',
    componentProps: {
      api: getEducationList,
      labelField: 'name',
      valueField: 'id',
    },
    label: '学历',
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '电话',
    colProps: {
      offset: 2,
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('手机号不能为空');
          }
          if (value.length !== 11) {
            /* eslint-disable-next-line */
            return Promise.reject('请输入11位手机号');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'idnum',
    component: 'Input',
    label: '身份证号',
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('身份证号不能为空');
          }
          if (value.length !== 18) {
            /* eslint-disable-next-line */
            return Promise.reject('请输入18位身份证号');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],

    componentProps: ({ formModel }) => {
      return {
        style: { width: '100%' },
        onChange: (e: ChangeEvent) => {
          formModel.birthday = getIdCardInfo(e.target.value, 1);
          formModel.age = getIdCardInfo(e.target.value, 3);
        },
      };
    },
  },
  {
    field: 'birthday',
    component: 'Input',
    label: '生日',
    colProps: {
      offset: 2,
    },
    show: false,
  },
  {
    field: 'age',
    component: 'Input',
    label: '年龄',
    colProps: {
      offset: 2,
    },
    show: false,
  },
  {
    field: 'idaddress',
    component: 'Input',
    label: '身份证地址',
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'comeFrom',
    component: 'Input',
    label: '户口所在地',
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'address',
    component: 'Input',
    label: '现居住地址',
  },
  {
    field: 'emergencyContact',
    component: 'Input',
    label: '紧急联系人',
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'emergencyPhone',
    component: 'Input',
    label: '紧急联系人电话',
    colProps: {
      offset: 2,
    },
  },

  // {
  //   field: '民族',
  //   component: 'Input',
  //   label: '仓库域名',
  //   required: true,
  //   componentProps: {
  //     addonBefore: 'http://',
  //     addonAfter: 'com',
  //   },
  //   colProps: {
  //     offset: 2,
  //   },
  // },
  // {
  //   field: 'f3',
  //   component: 'Select',
  //   label: '仓库管理员',
  //   componentProps: {
  //     options: basicOptions,
  //   },
  //   required: true,
  //   colProps: {
  //     offset: 2,
  //   },
  // },
  // {
  //   field: 'f4',
  //   component: 'Select',
  //   label: '审批人',
  //   componentProps: {
  //     options: basicOptions,
  //   },
  //   required: true,
  // },
  // {
  //   field: 'f5',
  //   component: 'RangePicker',
  //   label: '生效日期',
  //   required: true,
  //   colProps: {
  //     offset: 2,
  //   },
  // },
  // {
  //   field: 'f6',
  //   component: 'Select',
  //   label: '仓库类型',
  //   componentProps: {
  //     options: storeTypeOptions,
  //   },
  //   required: true,
  //   colProps: {
  //     offset: 2,
  //   },
  // },
];

export const studySchemas: FormSchema[] = [
  {
    field: 'graduateSchool',
    component: 'InputTextArea',
    label: '毕业院校',
    componentProps: {
      rows: 4,
    },
  },
  {
    field: 'graduateTime',
    component: 'InputTextArea',
    label: '毕业时间',
    componentProps: {
      rows: 4,
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'major',
    component: 'InputTextArea',
    label: '专业',
    componentProps: {
      rows: 4,
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'cert',
    component: 'Input',
    label: '证书',
  },
  {
    field: 'title',
    component: 'ApiSelect',
    label: '职称',
    componentProps: {
      api: getTitleList,
      labelField: 'name',
      valueField: 'id',
    },
    colProps: {
      offset: 2,
    },
  },
  // {
  //   field: '民族',
  //   component: 'Input',
  //   label: '仓库域名',
  //   required: true,
  //   componentProps: {
  //     addonBefore: 'http://',
  //     addonAfter: 'com',
  //   },
  //   colProps: {
  //     offset: 2,
  //   },
  // },
  // {
  //   field: 'f3',
  //   component: 'Select',
  //   label: '仓库管理员',
  //   componentProps: {
  //     options: basicOptions,
  //   },
  //   required: true,
  //   colProps: {
  //     offset: 2,
  //   },
  // },
  // {
  //   field: 'f4',
  //   component: 'Select',
  //   label: '审批人',
  //   componentProps: {
  //     options: basicOptions,
  //   },
  //   required: true,
  // },
  // {
  //   field: 'f5',
  //   component: 'RangePicker',
  //   label: '生效日期',
  //   required: true,
  //   colProps: {
  //     offset: 2,
  //   },
  // },
  // {
  //   field: 'f6',
  //   component: 'Select',
  //   label: '仓库类型',
  //   componentProps: {
  //     options: storeTypeOptions,
  //   },
  //   required: true,
  //   colProps: {
  //     offset: 2,
  //   },
  // },
];

export const taskSchemas: FormSchema[] = [
  {
    field: 'departmentSelect',
    component: 'Cascader',
    label: '部门/岗位/职级',
    componentProps: {
      options: [],
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!(value['0'] && value['1'] && value['2'])) {
            /* eslint-disable-next-line */
            return Promise.reject('请完善岗位信息');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'duty',
    component: 'ApiSelect',
    label: '职务',
    componentProps: {
      api: getDutyList,
      labelField: 'name',
      valueField: 'id',
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'role',
    component: 'ApiSelect',
    label: '角色',
    componentProps: {
      api: getRoleList,
      labelField: 'name',
      valueField: 'id',
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'department',
    component: 'Input',
    label: '部门',
    show: false,
  },
  {
    field: 'station',
    component: 'Input',
    label: '岗位',
    show: false,
  },
  {
    field: 'stationLevel',
    component: 'Input',
    label: '职级',
    show: false,
  },

  {
    field: 'banCi',
    component: 'ApiSelect',
    label: '班次',
    componentProps: {
      api: getBanCiList,
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'dutyTime',
    component: 'DatePicker',
    label: '入职时间',

    componentProps: ({ formModel }) => {
      return {
        style: { width: '100%' },
        valueFormat: 'YYYY-MM-DD',
        onChange: (e) => {
          formModel.workYear = getDateYearSub(e);
        },
      };
    },

    colProps: {
      offset: 2,
    },
  },

  {
    field: 'workYear',
    component: 'Input',
    label: '工龄',

    colProps: {
      offset: 2,
    },
    show: false,
  },
  {
    field: 'bankCardNo',
    component: 'Input',
    label: '银行卡号',
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'deposit',
    component: 'ApiSelect',
    label: '押金',
    componentProps: {
      api: getDepositList,
      labelField: 'name',
      valueField: 'id',
    },
  },

  {
    field: 'depositTimes',
    component: 'Input',
    label: '扣取次数',
    required: true,
    colProps: {
      offset: 2,
    },
  },

  {
    field: 'workNo',
    component: 'Input',
    label: '工号',
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'locker',
    component: 'Input',
    label: '钥匙柜',
  },

  {
    field: 'transferIn',
    component: 'Select',
    label: '调入时间',
    componentProps: {
      options: storeTypeOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'transferCome',
    component: 'Input',
    label: '调入部门',
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'contractAt',
    component: 'DatePicker',
    label: '合同签订时间',
    required: true,
    componentProps: {
      style: { width: '100%' },
    },
  },
  {
    field: 'healthAt',
    component: 'DatePicker',
    label: '健康证时间',
    required: true,
    componentProps: {
      style: { width: '100%' },
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'social',
    component: 'RadioGroup',
    label: '是否交社保',
    required: true,
    colProps: {
      offset: 2,
    },
    componentProps: {
      options: [
        {
          label: '是',
          value: '1',
        },
        {
          label: '否',
          value: '2',
        },
      ],
    },
  },

  {
    field: 'socialAt',
    component: 'DatePicker',
    label: '社保缴纳时间',
    required: true,
    show: ({ model }) => {
      return model.social === '1';
    },
  },
];

export const stateSchemas: FormSchema[] = [
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '3' },
      ],
    },
  },
];
