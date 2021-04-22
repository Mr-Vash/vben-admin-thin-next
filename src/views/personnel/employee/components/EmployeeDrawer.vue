<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <!-- <Description
      title="基础示例"
      :collapseOptions="{ canExpand: true }" :column="3"
      :data="mockData"
      :schema="schema"
    />

    <Description
      class="mt-4"
      title="垂直示例"
      layout="vertical"
      :collapseOptions="{ canExpand: true }"
      :column="2"
      :data="mockData"
      :schema="schema"
    /> -->

    <Description
      :collapseOptions="{ canExpand: true }"
      :data="mockData.data"
      :column="3"
      @register="register1"
      class="mt-4"
    />
    <Description
      :collapseOptions="{ canExpand: true }"
      :data="mockData.data"
      :column="3"
      @register="register2"
      class="mt-4"
    />
    <Description
      :collapseOptions="{ canExpand: true }"
      :data="mockData.data"
      :column="3"
      @register="register3"
      class="mt-4"
    />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, computed, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { Description, DescItem, useDescription } from '/@/components/Description/index';

  import { getDepartmentSelectList } from '/@/api/personnel/department';
  // const mockData: Recordable = {
  //   username: 'test',
  //   nickName: 'VB',
  //   age: 25,
  //   phone: '15695909xxx',
  //   email: '190848757@qq.com',
  //   addr: '厦门市思明区',
  //   sex: '男',
  //   certy: '3504256199xxxxxxxxx',
  //   tag: 'orange',
  // };

  const schema1: DescItem[] = [
    {
      field: 'name',
      label: '用户名',
      labelMinWidth: 70,
      contentMinWidth: 100,
    },
    {
      field: 'nation',
      label: '民族',
    },
    {
      field: 'sex',
      label: '性别',
    },
    {
      field: 'age',
      label: '年龄',
    },
    {
      field: 'birthday',
      label: '生日',
    },
    {
      field: 'political',
      label: '政治面貌',
    },
    {
      field: 'education',
      label: '学历',
    },
    {
      field: 'phone',
      label: '电话',
    },
    {
      field: 'idnum',
      label: '身份证号',
    },

    {
      field: 'idaddress',
      label: '身份证地址',
    },
    {
      field: 'comeFrom',
      label: '户口所在地',
    },
    {
      field: 'address',
      label: '现居住地址',
    },
    {
      field: 'emergencyContact',
      label: '紧急联系人',
    },
    {
      field: 'emergencyPhone',
      label: '紧急联系人电话',
    },
  ];

  const schema2: DescItem[] = [
    {
      field: 'graduateSchool',
      label: '毕业院校',
      labelMinWidth: 70,
      contentMinWidth: 100,
    },
    {
      field: 'graduateTime',
      label: '毕业时间',
    },
    {
      field: 'major',
      label: '专业',
    },
    {
      field: 'cert',
      label: '证书',
    },
    {
      field: 'title',
      label: '职称',
    },
  ];

  const schema3: DescItem[] = [
    {
      field: 'department',
      label: '部门',
      labelMinWidth: 70,
      contentMinWidth: 100,
    },
    {
      field: 'station',
      label: '岗位',
    },
    {
      field: 'stationLevel',
      label: '职级',
    },
    {
      field: 'duty',
      label: '职务',
    },
    {
      field: 'role',
      label: '角色',
    },
    {
      field: 'banCi',
      label: '班次',
    },
    {
      field: 'dutyTime',
      label: '入职时间',
    },
    {
      field: 'workYear',
      label: '工龄',
    },
    {
      field: 'bankCardNo',
      label: '银行卡号',
    },
    {
      field: 'deposit',
      label: '押金',
      render: (curVal) => {
        return `￥${curVal}`;
      },
    },
    {
      field: 'depositTimes',
      label: '扣取次数',
    },
    {
      field: 'workNo',
      label: '工号',
    },
    {
      field: 'locker',
      label: '钥匙柜',
    },
    {
      field: 'transferIn',
      label: '调入时间',
    },
    {
      field: 'transferCome',
      label: '调入部门',
    },
    {
      field: 'contractAt',
      label: '合同签订时间',
    },
    {
      field: 'healthAt',
      label: '健康证时间',
    },
    {
      field: 'social',
      label: '是否交社保',
    },
    {
      field: 'socialAt',
      label: '社保缴纳时间',
      render: (curVal, data) => {
        return data.social == '否' ? '无' : curVal;
      },
    },
  ];

  export default defineComponent({
    name: 'EmployeeDrawer',
    components: { BasicDrawer, Description },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const mockData = reactive({ data: null });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        let newData = data.record;
        const res = await getDepartmentSelectList();
        console.log(res);
        for (const x of res) {
          console.log(x);
          if (x.value == newData.department) {
            newData.department = x.label;
          }
          if (x.children.length != 0) {
            for (const y of x.children) {
              if (y.value == newData.station) {
                newData.station = y.label;
              }

              if (y.children.length != 0) {
                for (const z of y.children) {
                  if (z.value == newData.stationLevel) {
                    newData.stationLevel = z.label;
                  }
                }
              }
            }
          }
        }

        mockData.data = newData;
        // if (unref(isUpdate)) {

        // }
        console.log(data.record);
      });

      const [register1] = useDescription({
        title: '个人信息',
        schema: schema1,
      });

      const [register2] = useDescription({
        title: '学历信息',
        schema: schema2,
      });

      const [register3] = useDescription({
        title: '入职信息',
        schema: schema3,
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '员工信息' : '员工信息'));

      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });
          // TODO custom api

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        mockData,
        schema1,
        schema2,
        schema3,
        register1,
        register2,
        register3,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
