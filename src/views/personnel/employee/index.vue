<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" preIcon="carbon:filter-edit" @click="formDisplay = !formDisplay">
          {{ formDisplay ? '隐藏' : '查询' }}
        </a-button>
        <a-button type="primary" preIcon="akar-icons:plus" @click="handleCreate"> 新增 </a-button>
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

  import { getBasicData, columns, searchFormSchema } from './tableData';

  import { useGo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';

  export default defineComponent({
    name: 'EmployeeManagement',
    components: { BasicTable, EmployeeDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      let formDisplay = ref(true);
      const go = useGo();
      const [registerTable, { reload }] = useTable({
        title: '员工列表',
        dataSource: getBasicData(),
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
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        go(PageEnum.EMPLOYEE_UPDATE + '/edit/' + record.id);
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      function handlePreview(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      return {
        handlePreview,
        formDisplay,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
