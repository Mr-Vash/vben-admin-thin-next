import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    {
      title: '部门名称',
      dataIndex: 'name',
      width: 100,
      slots: { customRender: 'title' },
    },
    // {
    //   title: '字典类型',
    //   dataIndex: 'dictType',
    //   width: 150,
    //   customRender: ({ record }) => {
    //     return h(Tag, { color: 'green' }, () => record.dictType);
    //   },
    // },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 150,
      sorter: true,
      slots: { customRender: 'updateTime' },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150,
      sorter: true,
      slots: { customRender: 'createTime' },
    },
  ];
}

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    // {
    //   title: '岗位名称',
    //   dataIndex: 'name',
    //   width: 100,
    //   slots: { customRender: 'title' },
    // },
    {
      title: '岗位名称',
      dataIndex: 'name',
      width: 100,
      customRender: ({ record }) => {
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
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150,
      sorter: true,
      slots: { customRender: 'createTime' },
    },
  ];
}

export function getData1Config(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showAdvancedButton: false,
    schemas: [
      {
        field: `levelName`,
        label: `岗位级别名称`,
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

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showAdvancedButton: false,
    schemas: [
      {
        field: `name`,
        label: `部门名称`,
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
        label: `岗位名称`,
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
