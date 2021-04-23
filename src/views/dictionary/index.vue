<template>
  <div>
    <BasicTable @register="registerTable" :pagination="{ pageSize: 20 }">
      <template #form-custom></template>

      <template #title="{ record }">
        <a>{{ record.dictName }}</a>
      </template>

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
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'si-glyph:bullet-list',
              onClick: handleLink.bind(null, record),
            },
          ]"
        />
      </template>
      <!-- {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            }, -->
    </BasicTable>
    <Modal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableData';

  import { getDictionaryTypeList, delDictionaryType } from '/@/api/sys/dictionary';

  import { useGo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';

  import { useModal } from '/@/components/Modal';
  import Modal from './components/Modal.vue';

  import { Time } from '/@/components/Time';

  export default defineComponent({
    components: { BasicTable, Modal, Time, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const go = useGo();

      const [registerTable, { getForm, reload }] = useTable({
        title: '字典类型',
        api: getDictionaryTypeList,
        columns: getBasicColumns(),
        useSearchForm: true,
        formDisplay: true,
        formConfig: getFormConfig(),
        showTableSetting: true,
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function getFormValues() {
        console.log(getForm().getFieldsValue());
        console.log(getForm());
      }

      async function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
        console.log(record.id);
        await delDictionaryType({ id: record.id });
        reload();
      }
      function handleOpen(record: Recordable) {
        console.log('点击了启用', record);
      }

      function handleSuccess() {
        reload();
      }

      function handlePreview() {}

      function handleLink(record: Recordable) {
        go(PageEnum.DICTIONARY_DATA + '/' + record.dictType);
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleCreate(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: false,
        });
      }

      return {
        handleLink,
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
