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

    <a-card title="附件信息" :bordered="false" class="mt-5">
      <BasicForm @register="registerPic" />
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
  import { studySchemas, schemas, taskSchemas, stateSchemas, picSchemas } from './tableData';
  import { Card, Upload } from 'ant-design-vue';
  import { getDepartmentSelectList } from '/@/api/personnel/department';
  import { addEmployee, getEmployeeInfo, editEmployee } from '/@/api/personnel/employee';
  import { useGo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRoute, useRouter } from 'vue-router';
  import { formatToDate } from '/@/utils/dateUtil';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useMultipleTabStore } from '/@/store/modules/multipleTab';

  export default defineComponent({
    components: { BasicForm, PageWrapper, [Card.name]: Card, [Upload.name]: Upload },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const tabStore = useMultipleTabStore();
      const { createErrorModal, createMessage } = useMessage();
      const { success } = createMessage;
      const tableRef = ref<{ getDataSource: () => any } | null>(null);
      const go = useGo();
      const [register, { validate, setFieldsValue }] = useForm({
        baseColProps: {
          span: 6,
        },
        schemas: schemas,
        showActionButtonGroup: false,
      });

      const [
        registerStudy,
        { validate: validateStudyForm, setFieldsValue: setStudyValue },
      ] = useForm({
        baseColProps: {
          span: 6,
        },
        schemas: studySchemas,
        showActionButtonGroup: false,
      });

      const [
        registerTask,
        { validate: validateTaskForm, setFieldsValue: setTaskValue, updateSchema },
      ] = useForm({
        baseColProps: {
          span: 6,
        },
        schemas: taskSchemas,
        showActionButtonGroup: false,
      });

      async function getCaselect() {
        const options = await getDepartmentSelectList();
        updateSchema([
          {
            field: 'departmentSelect',
            componentProps: ({ formModel }) => {
              return {
                options,
                onChange: (e: any) => {
                  console.log(e);
                  formModel.department = e[0];
                  formModel.station = e[1];
                  formModel.stationLevel = e[2];
                },
              };
            },
          },
        ]);
      }
      getCaselect();

      const [
        registerState,
        { validate: validateStateForm, setFieldsValue: setStateValue },
      ] = useForm({
        labelCol: {
          span: 0,
        },
        wrapperCol: {
          span: 10,
        },
        schemas: stateSchemas,
        showActionButtonGroup: false,
      });

      const [registerPic, { validate: validatePicForm, setFieldsValue: setPicValue }] = useForm({
        baseColProps: {
          span: 6,
        },
        schemas: picSchemas,
        showActionButtonGroup: false,
      });

      if (route.params.type == 'edit' && route.params.id) {
        async function setFormFieldValue() {
          const res = await getEmployeeInfo({ id: route.params.id.toString() });
          console.log(res);

          if (res) {
            // res.socialAt = res.socialAt ? res.socialAt : '';
            setFieldsValue({
              ...res,
            });
            setStudyValue({
              ...res,
            });
            setTaskValue({
              ...res,
              departmentSelect: [res.department * 1, res.station * 1, res.stationLevel * 1],
            });
            setStateValue({
              ...res,
            });
            setPicValue({
              userImg: res.userImg ? [res.userImg] : [],
              frontImg: res.frontImg ? [res.frontImg] : [],
              backImg: res.backImg ? [res.backImg] : [],
              healthImg: res.healthImg ? [res.healthImg] : [],
              bankImg: res.bankImg ? [res.bankImg] : [],
            });
          } else {
            createErrorModal({
              title: '提示',
              content: '找不到当前id对应的员工,点击返回',
              onOk() {
                tabStore.closeTabByKey(route.path, router);
                go(PageEnum.EMPLOYEE, true);
              },
            });
          }
        }

        setFormFieldValue();
      }

      async function submitAll() {
        try {
          if (tableRef.value) {
            console.log('table data:', tableRef.value.getDataSource());
          }

          const [values, studyValues, taskValues, picValues, stateValues] = await Promise.all([
            validate(),
            validateStudyForm(),
            validateTaskForm(),

            validatePicForm(),
            validateStateForm(),
          ]);
          console.log('form data:', values, studyValues, taskValues, stateValues, picValues);
          let params = Object.assign({}, values, studyValues, taskValues, stateValues, picValues);

          delete params.departmentSelect;

          console.log(params);
          // params.contractAt = formatToDate(params.contractAt);
          // params.dutyTime = formatToDate(params.dutyTime);
          // params.healthAt = formatToDate(params.healthAt);
          // params.transferIn = formatToDate(params.transferIn);
          // params.socialAt = params.socialAt ? formatToDate(params.socialAt) : '1980-01-01';

          // 后端要求必须传的最小日期
          params.socialAt = params.socialAt ? params.socialAt : '1980-01-01';

          params.userImg = params.userImg ? params.userImg[0] : '';
          params.frontImg = params.frontImg ? params.frontImg[0] : '';
          params.backImg = params.backImg ? params.backImg[0] : '';
          params.healthImg = params.healthImg ? params.healthImg[0] : '';
          params.bankImg = params.bankImg ? params.bankImg[0] : '';

          let res;
          if (route.params.type == 'add') {
            res = await addEmployee(params);
          } else {
            params.id = route.params.id;
            res = await editEmployee(params);
          }
          console.log(res);
          if (res) {
            success('操作成功！');
          }
          tabStore.closeTabByKey(route.path, router);
          go(PageEnum.EMPLOYEE, true);
        } catch (error) {}
      }

      return {
        register,
        registerStudy,
        registerTask,
        registerState,
        registerPic,
        submitAll,
        tableRef,
      };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 88px;
  }
</style>
