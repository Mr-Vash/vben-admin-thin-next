<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-custom>
        <div class="text-center">-</div>
      </template>
      <!-- <template #form-custom="{ model, field }">
        <a-input-group>
          <a-row :gutter="8">
            <a-col :span="5" :min="0">
              <a-input-number v-model:value="model[field][0]"  placeholder="开始年龄" />
            </a-col>
            <a-col :span="1">
              ~
            </a-col>
            <a-col :span="5" :max="100">
              <a-input-number v-model:value="model[field][1]" placeholder="结束年龄" />
            </a-col>
          </a-row>
        </a-input-group>

      </template> -->
      <template #dutyTime="{ record }">
        <Time :value="record.dutyTime" mode="date" />
      </template>
      <template #toolbar>
        <a-button type="primary" preIcon="carbon:filter-edit" @click="formDisplay = !formDisplay">
          {{ formDisplay ? '隐藏' : '查询' }}
        </a-button>
        <a-button type="primary" preIcon="akar-icons:plus" @click="handleAdd"> 新增 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'carbon:view',
              onClick: handlePreview.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          :dropDownActions="[
            {
              label: record.status == 1 ? '停用' : '启用',
              popConfirm: {
                title: '是否' + (record.status == 1 ? '停用' : '启用') + '？',
                confirm: handleOpen.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <EmployeeDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import EmployeeDrawer from './components/EmployeeDrawer.vue';
  import { Input, InputNumber } from 'ant-design-vue';
  import { getBasicData, columns, searchFormSchema } from './tableData';
  import { getEmployeeList, changeEmployeeStatus, delEmployee } from '/@/api/personnel/employee';

  import { useGo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';

  import { Time } from '/@/components/Time';

  export default defineComponent({
    name: 'EmployeeManagement',
    components: {
      Time,
      BasicTable,
      EmployeeDrawer,
      TableAction,
      [InputNumber.name]: InputNumber,
      [Input.Group.name]: Input.Group,
    },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      let formDisplay = ref(true);
      const go = useGo();
      const [registerTable, { reload }] = useTable({
        title: '员工列表',
        api: getEmployeeList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        formDisplay,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
        beforeFetch(s) {
          let startAge = s.startAge ? s.startAge : 1;
          let endAge = s.endAge ? s.endAge : 99;
          let params = Object.assign({}, s);
          delete params.startAge;
          delete params.endAge;
          return Object.assign({ ageRange: [startAge, endAge] }, params);
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        go(PageEnum.EMPLOYEE_UPDATE + '/edit/' + record.id);
      }

      function handleAdd() {
        go(PageEnum.EMPLOYEE_UPDATE + '/add');
      }

      async function handleDelete(record: Recordable) {
        console.log(record);
        await delEmployee({ id: record.id });
        reload();
      }

      function handleSuccess() {
        reload();
      }

      async function handleOpen(record: Recordable) {
        await changeEmployeeStatus({ id: record.id, status: record.status == 1 ? 3 : 1 });
        reload();
      }

      function handlePreview(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      return {
        handleAdd,
        handlePreview,
        formDisplay,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleOpen,
      };
    },
  });
</script>
