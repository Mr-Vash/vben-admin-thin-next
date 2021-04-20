import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const dictionary: AppRouteModule = {
  path: '/dictionary',
  name: 'Dictionary',
  component: LAYOUT,
  redirect: '/dictionary/index',
  meta: {
    icon: 'codicon:book',
    title: '字典管理',
  },
  children: [
    {
      path: 'index',
      name: 'DictionaryIndex',
      component: () => import('/@/views/dictionary/index.vue'),
      meta: {
        // title: t('routes.dashboard.workbench'),
        title: '字典管理',
        icon: 'codicon:book',
      },
    },
    {
      path: 'dictionaryData/:type',
      name: 'DictionaryData',
      component: () => import('/@/views/dictionary/data.vue'),
      meta: {
        // title: t('routes.dashboard.workbench'),
        title: '字典数据',
        carryParam: true,
        currentActiveMenu: '/dictionary/index',
      },
    },
  ],
};

export default dictionary;
