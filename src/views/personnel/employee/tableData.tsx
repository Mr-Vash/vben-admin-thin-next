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
  getNationList,
} from '/@/api/sys/dictionary';
import { getDateYearSub, getIdCardInfo } from '/@/utils/custom';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: '角色值',
    dataIndex: 'roleValue',
    width: 180,
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

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

export function getBasicData() {
  const data = (() => {
    const result: any[] = [];
    for (let index = 0; index < 4; index++) {
      result.push({
        id: `${index}`,
        orderNo: `${index + 1}`,
        roleName: ['超级管理员', '管理员', '文章管理员', '普通用户'][index],
        roleValue: '@first',
        createTime: '@datetime',
        remark: '@cword(10,20)',
        'status|1': ['0', '1'],
      });
    }
    return result;
  })();

  return data;
}

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '姓名',
    required: true,
  },
  {
    field: 'nation',
    component: 'ApiSelect',
    componentProps: {
      api: getNationList,
      labelField: 'name',
      valueField: 'name',
    },
    required: true,
    label: '民族',
    colProps: {
      offset: 2,
    },
    // renderComponentContent: () => {
    //   return {
    //     suffix: () => '族',
    //   };
    // },
  },
  {
    field: 'sex',
    component: 'RadioGroup',
    label: '性别',
    required: true,
    colProps: {
      offset: 2,
    },
    componentProps: {
      options: [
        {
          label: '男',
          value: '男',
        },
        {
          label: '女',
          value: '女',
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
      valueField: 'name',
    },
    label: '政治面貌',
    required: true,
  },
  {
    field: 'education',
    component: 'ApiSelect',
    componentProps: {
      api: getEducationList,
      labelField: 'name',
      valueField: 'name',
    },
    label: '学历',
    colProps: {
      offset: 2,
    },
    required: true,
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
    required: true,
  },
  {
    field: 'comeFrom',
    component: 'Input',
    label: '户口所在地',
    colProps: {
      offset: 2,
    },
    required: true,
  },
  {
    field: 'address',
    component: 'Input',
    label: '现居住地址',
    required: true,
  },
  {
    field: 'emergencyContact',
    component: 'Input',
    label: '紧急联系人',
    colProps: {
      offset: 2,
    },
    required: true,
  },
  {
    field: 'emergencyPhone',
    component: 'Input',
    label: '紧急联系人电话',
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!/^[0-9]*$/.test(value)) {
            /* eslint-disable-next-line */
            return Promise.reject('请填写数字');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
    colProps: {
      offset: 2,
    },
  },
];

export const studySchemas: FormSchema[] = [
  {
    field: 'graduateSchool',
    component: 'InputTextArea',
    label: '毕业院校',
    componentProps: {
      rows: 4,
    },
    required: true,
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
    required: true,
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
    required: true,
  },
  {
    field: 'cert',
    component: 'Input',
    label: '证书',
    required: true,
  },
  {
    field: 'title',
    component: 'ApiSelect',
    label: '职称',
    componentProps: {
      api: getTitleList,
      labelField: 'name',
      valueField: 'name',
    },
    colProps: {
      offset: 2,
    },
    required: true,
  },
];

export const taskSchemas: FormSchema[] = [
  {
    field: 'departmentSelect',
    component: 'Cascader',
    label: '部门/岗位/职级',
    componentProps: () => {
      return {
        options: [],
      };
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!(value && value['0'] && value['1'] && value['2'])) {
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
      valueField: 'name',
    },
    colProps: {
      offset: 2,
    },
    required: true,
  },
  {
    field: 'role',
    component: 'ApiSelect',
    label: '角色',
    componentProps: {
      api: getRoleList,
      labelField: 'name',
      valueField: 'name',
    },
    colProps: {
      offset: 2,
    },
    required: true,
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
      valueField: 'name',
    },
    required: true,
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
          console.log(e);
          formModel.workYear = getDateYearSub(e);
        },
      };
    },
    // rules: [{ type: 'array', required: true }],
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
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!/^[0-9]*$/.test(value)) {
            /* eslint-disable-next-line */
            return Promise.reject('请填写数字');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'deposit',
    component: 'ApiSelect',
    label: '押金',
    componentProps: {
      api: getDepositList,
      labelField: 'name',
      valueField: 'name',
    },
    required: true,
  },

  {
    field: 'depositTimes',
    component: 'Input',
    label: '扣取次数',
    colProps: {
      offset: 2,
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!/^[0-9]*$/.test(value)) {
            /* eslint-disable-next-line */
            return Promise.reject('请填写数字');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },

  {
    field: 'workNo',
    component: 'Input',
    label: '工号',
    colProps: {
      offset: 2,
    },
    required: true,
  },
  {
    field: 'locker',
    component: 'Input',
    label: '钥匙柜',
    required: true,
  },

  {
    field: 'transferIn',
    component: 'DatePicker',
    label: '调入时间',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      style: { width: '100%' },
    },
    // required: true,
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
    required: true,
  },
  {
    field: 'contractAt',
    component: 'DatePicker',
    label: '合同签订时间',
    // required: true,
    defaultValue: '',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      style: { width: '100%' },
    },
  },
  {
    field: 'healthAt',
    component: 'DatePicker',
    label: '健康证时间',
    // required: true,
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
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
    componentProps: ({ formModel }) => {
      return {
        options: [
          {
            label: '是',
            value: '是',
          },
          {
            label: '否',
            value: '否',
          },
        ],
        onChange() {
          formModel.socialAt = '';
        },
      };
    },
  },

  {
    field: 'socialAt',
    component: 'DatePicker',
    label: '社保缴纳时间',
    // required: true,
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },

    show: ({ model }) => {
      return model.social === '是';
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
