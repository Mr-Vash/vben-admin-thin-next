<template>
  <div>
    <BasicTable @register="registerTable" :pagination="{ pageSize: 20 }">
      <template #form-custom></template>

      <template #updateTime="{ record }">
        <Time :value="record.updateTime" mode="datetime" />
      </template>

      <template #toolbar>
        <a-button type="primary" preIcon="akar-icons:plus" @click="handleCreate"> 新增 </a-button>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ic:outline-edit',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ic:outline-delete-outline',
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
    <Modal @register="registerModal" @success="handleSuccess()" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDataColumns, getDataConfig } from './tableData';

  import { getDictionaryDataList, delDictionaryData } from '/@/api/sys/dictionary';

  import { useModal } from '/@/components/Modal';
  import Modal from './components/DataModal.vue';

  import { Time } from '/@/components/Time';

  export default defineComponent({
    components: { BasicTable, Modal, Time, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();

      const route = useRoute();
      console.log(route.params);

      const [registerTable, { getForm, reload }] = useTable({
        title: '字典数据（' + route.params.type + '）',
        api: getDictionaryDataList,
        columns: getDataColumns(),
        useSearchForm: true,
        formDisplay: true,
        formConfig: getDataConfig(),
        showTableSetting: true,
        // rowSelection: { type: 'checkbox' },
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        beforeFetch(s) {
          return Object.assign({ dict_type: route.params.type }, s);
        },
      });

      function getFormValues() {
        console.log(getForm().getFieldsValue());
        console.log(getForm());
      }

      async function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
        console.log(record.id);
        await delDictionaryData({ id: record.id });
        reload();
      }
      function handleOpen(record: Recordable) {
        console.log('点击了启用', record);
      }

      function handleSuccess() {
        reload();
      }

      function handlePreview() {}

      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleCreate() {
        openModal(true, {
          dictType: route.params.type,
          isUpdate: false,
        });
      }

      return {
        registerTable,
        getFormValues,
        handleEdit,
        handleDelete,
        handleOpen,
        registerModal,
        handlePreview,
        handleSuccess,
        handleCreate,
      };
    },
  });
</script>
