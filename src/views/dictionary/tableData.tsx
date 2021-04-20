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
