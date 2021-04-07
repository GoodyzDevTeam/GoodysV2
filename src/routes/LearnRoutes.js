import { PATH_LEARN } from './paths';
import React, { lazy } from 'react';
import HomeLayout from 'src/layouts/HomeLayout';
import DashboardLayout from 'src/layouts/DashboardLayout';

const LearnRoutes = {
  path: PATH_LEARN.root,
  layout: HomeLayout,
  routes: [
    {
      exact: true,
      path: PATH_LEARN.general2.learn,
      component: lazy(() => import('src/views/Learn/index'))
    }
  ]
};

export default LearnRoutes;
