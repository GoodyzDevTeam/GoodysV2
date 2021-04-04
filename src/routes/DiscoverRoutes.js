import { PATH_DISCOVER } from './paths';
import React, { lazy } from 'react';
import DashboardLayout from 'src/layouts/DashboardLayout';

const DiscoverRoutes = {
  path: PATH_DISCOVER.root,
  layout: DashboardLayout,
  routes: [
    // general
    {
      exact: true,
      path: PATH_DISCOVER.general1.discover,
      component: lazy(() => import('src/views/DiscoverPage/index'))
    }
  ]
};

export default DiscoverRoutes;
