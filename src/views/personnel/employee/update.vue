<template>
  <PageWrapper
    class="high-form"
    title="员工信息录入"
    contentBackground
    content="请尽可能完善员工信息，以便后续筛查"
    contentClass="p-4"
  >
    <a-card title="个人信息" :bordered="false">
      <BasicForm @register="register" />
    </a-card>
    <a-card title="学历信息" :bordered="false">
      <BasicForm @register="registerStudy" />
    </a-card>
    <a-card title="入职信息" :bordered="false" class="mt-5">
      <BasicForm @register="registerTask" />
    </a-card>

    <template #leftFooter>
      <div class="custom-mb-0">
        <BasicForm @register="registerState" />
      </div>
    </template>
    <template #rightFooter>
      <a-button type="primary" @click="submitAll"> 提交 </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { studySchemas, schemas, taskSchemas, stateSchemas } from './tableData';
  import { Card } from 'ant-design-vue';
  import { getDepartmentSelectList } from '/@/api/personnel/department';

  export default defineComponent({
    components: { BasicForm, PageWrapper, [Card.name]: Card },
    setup() {
      const tableRef = ref<{ getDataSource: () => any } | null>(null);

      const [register, { validate }] = useForm({
        baseColProps: {
          span: 6,
        },
        schemas: schemas,
        showActionButtonGroup: false,
      });

      const [registerStudy, { validate: validateStudyForm }] = useForm({
        baseColProps: {
          span: 6,
        },
        schemas: studySchemas,
        showActionButtonGroup: false,
      });

      const [registerTask, { validate: validateTaskForm, updateSchema }] = useForm({
        baseColProps: {
          span: 6,
        },
        schemas: taskSchemas,
        showActionButtonGroup: false,
      });

      setTimeout(async function () {
        const options = await getDepartmentSelectList();
        updateSchema([
          {
            field: 'departmentSelect',
            componentProps: {
              options,
              onChange: (e: any) => {
                console.log(e);
                // formModel.levelName = e.label;
                // formModel.levelId = e.value;
              },
            },
          },
        ]);
      }, 0);

      const [registerState, { validate: validateStateForm }] = useForm({
        labelCol: {
          span: 0,
        },
        wrapperCol: {
          span: 10,
        },
        schemas: stateSchemas,
        showActionButtonGroup: false,
      });

      async function submitAll() {
        try {
          if (tableRef.value) {
            console.log('table data:', tableRef.value.getDataSource());
          }

          const [values, taskValues] = await Promise.all([
            validate(),
            validateStudyForm(),
            validateTaskForm(),
            validateStateForm(),
          ]);
          console.log('form data:', values, taskValues);
        } catch (error) {}
      }

      return { register, registerStudy, registerTask, registerState, submitAll, tableRef };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 88px;
  }
</style>
