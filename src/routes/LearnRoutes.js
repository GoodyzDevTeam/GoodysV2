import { PATH_LEARN } from './paths';
import React, { lazy } from 'react';
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