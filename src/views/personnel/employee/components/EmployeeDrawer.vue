<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <Description
      title="基础示例"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="3"
      :data="mockData"
      :schema="schema"
    />

    <Description
      class="mt-4"
      title="垂直示例"
      layout="vertical"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="2"
      :data="mockData"
      :schema="schema"
    />

    <Description @register="register" class="mt-4" />
    <Description @register="register" class="mt-4" />
    <Description @register="register" class="mt-4" />
    <Description @register="register" class="mt-4" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { Description, DescItem, useDescription } from '/@/components/Description/index';

  const mockData: Recordable = {
    username: 'test',
    nickName: 'VB',
    age: 25,
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema: DescItem[] = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'nickName',
      label: '昵称',
      render: (curVal, data) => {
        return `${data.username}-${curVal}`;
      },
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'email',
      label: '邮箱',
    },
    {
      field: 'addr',
      label: '地址',
    },
  ];
  export default defineComponent({
    name: 'EmployeeDrawer',
    components: { BasicDrawer, Description },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const [register] = useDescription({
        title: 'useDescription',
        data: mockData,
        schema: schema,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        // if (unref(isUpdate)) {

        // }
        console.log(data.record);
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
        schema,
        register,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
