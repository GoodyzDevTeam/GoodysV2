import { PATH_LEARN } from './paths';
import React, { lazy } from 'react';
<<<<<<< HEAD
import { Redirect } from 'react-router-dom';
import AuthProtect from 'src/components/Auth/AuthProtect';
import DashboardLayout from 'src/layouts/DashboardLayout';
import HomeLayout from 'src/layouts/HomeLayout';

// ----------------------------------------------------------------------
const LearnRoutes = {
    path: PATH_LEARN.root,
    layout:HomeLayout,
    routes: [
        {
            exact: true,
            path: PATH_LEARN.learn,
            component: lazy(() => import('src/views/blog/Learn'))
        }
    ]
}

export default LearnRoutes;
=======
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
>>>>>>> 054e0ff3bc42f80b9c10ee9a044b472ce7f57700
