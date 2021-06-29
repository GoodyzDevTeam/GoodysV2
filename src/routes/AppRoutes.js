/* eslint-disable */
import { PATH_APP } from './paths';
import React, { lazy } from 'react';
import { Redirect, useRoutes } from 'react-router-dom';
import AuthProtect from 'src/components/Auth/AuthProtect';
import DashboardLayout from 'src/layouts/DashboardLayout';

// ----------------------------------------------------------------------

const AppRoutes = {
  path: PATH_APP.root,
  guard: AuthProtect,
  layout: DashboardLayout,
  routes: [
    // GENERAL
    // ----------------------------------------------------------------------

    //GOODY'S HUB DASHBOARD ROUTE
    {
      exact: true,
      path: PATH_APP.general.dashboard,
      component: lazy(() => import('src/views/general/DashboardAppView'))
    },

    //GOODY'S HUB DISCOVER ROUTE
    {
      exact: true,
      path: PATH_APP.general.discover,
      component: lazy(() => import('src/views/DiscoverPage')),
    },

    {
      exact: true,
      path: PATH_APP.general.productInCategory,
      component: lazy(() => import('src/views/DiscoverPage/ProductsInCategory/index'))
    },

    {
      exact: true,
      path: PATH_APP.general.productDetail,
      component: lazy(() => import('src/views/DiscoverPage/ProductDetail/index'))
    },

    // LEARN ROUTES
    //GOODY'S HUB LEARN ROUTE
    {
      exact: true,
      path: PATH_APP.general.learn,
      component: lazy(() => import('src/views/Learn'))
    },
    {
      exact: true,
      path: PATH_APP.general.learnTopics,
      component: lazy(() => import('src/views/Learn/topics/index'))
    },
    {
      exact: true,
      path: PATH_APP.management.blog.learnArticles,
      component: lazy(() => import('src/views/Learn/learnArticles/index'))
    },

    //GOODY'S HUB PICK UP ROUTE
    {
      exact: true,
      path: PATH_APP.general.pickup,
      component: lazy(() => import('src/views/pick-up/index'))
    },

    //REDIRECT
    {
      exact: true,
      path: PATH_APP.root,
      component: () => <Redirect to={PATH_APP.general.root} />
    },

    // MANAGEMENT : E-COMMERCE
    // ----------------------------------------------------------------------

    //GOODY'S HUB DISCOVER PRODUCTS ROUTE
    {
      exact: true,
      path: PATH_APP.management.eCommerce.products,
      component: lazy(() => import('src/views/e-commerce/ShopView'))
    },

    //GOODY'S HUB DISCOVER INDIVIDUAL PRODUCT DETAIL ROUTE
    {
      exact: true,
      path: PATH_APP.management.eCommerce.product,
      component: lazy(() => import('src/views/e-commerce/ProductDetailsView'))
    },

    {
      exact: true,
      path: PATH_APP.management.eCommerce.list,
      component: lazy(() => import('src/views/e-commerce/ProductListView'))
    },

    //GOODY'S HUB CHECKOUT ROUTE
    {
      exact: true,
      path: PATH_APP.management.eCommerce.checkout,
      component: lazy(() => import('src/views/e-commerce/CheckoutView'))
    },

    // MANAGEMENT : BLOG
    // ----------------------------------------------------------------------

    //GOODY'S HUB BLOG ROUTE
    {
      exact: true,
      path: PATH_APP.management.blog.root,
      component: lazy(() => import('src/views/blog/BlogView'))
    },

    //GOODY'S HUB INDIVIDUAL POST ROUTE
    {
      exact: true,
      path: PATH_APP.management.blog.post,
      component: lazy(() => import('src/views/blog/PostDetailsView'))
    },
    // MANAGEMENT : USER
    // ----------------------------------------------------------------------

    //GOODY'S HUB USER PROFILE ROUTE
    {
      exact: true,
      path: PATH_APP.management.user.profile,
      component: lazy(() => import('src/views/user/ProfileView'))
    },

    //THIS ROUTE WILL EVENTUALLY TURN INTO PAST ORDERS
    {
      exact: true,
      path: PATH_APP.management.user.cards,
      component: lazy(() => import('src/views/user/UserCardsView'))
    },

    //GOODY'S HUB USER ACCOUNT ROUTE
    {
      exact: true,
      path: PATH_APP.management.user.account,
      component: lazy(() => import('src/views/user/AccountView'))
    },
    {
      exact: true,
      path: PATH_APP.management.user.root,
      component: () => <Redirect to={PATH_APP.management.user.profile} />
    },
    {
      exact: true,
      path: PATH_APP.management.root,
      component: () => <Redirect to={PATH_APP.management.user.profile} />
    },
    // ----------------------------------------------------------------------
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

const AppRoutes1 = {
  path: PATH_APP.root,
  guard: AuthProtect,
  layout: DashboardLayout,
  routes: [
    // GENERAL
    // ----------------------------------------------------------------------

    //GOODY'S HUB DASHBOARD ROUTE
    {
      exact: true,
      path: PATH_APP.general.dashboard,
      component: lazy(() => import('src/views/general/DashboardAppView'))
    },

    //GOODY'S HUB DISCOVER ROUTE
    {
      exact: true,
      path: PATH_APP.general.discover,
      component: lazy(() => import('src/views/DiscoverPage'))
    },

    {
      exact: true,
      path: PATH_APP.general.productInCategory,
      component: lazy(() => import('src/views/DiscoverPage/ProductsInCategory/index'))
    },

    {
      exact: true,
      path: PATH_APP.general.productDetail,
      component: lazy(() => import('src/views/DiscoverPage/ProductDetail/index'))
    },

    // LEARN ROUTES
    //GOODY'S HUB LEARN ROUTE
    {
      exact: true,
      path: PATH_APP.general.learn,
      component: lazy(() => import('src/views/Learn'))
    },
    {
      exact: true,
      path: PATH_APP.general.learnTopics,
      component: lazy(() => import('src/views/Learn/topics/index'))
    },
    {
      exact: true,
      path: PATH_APP.management.blog.learnArticles,
      component: lazy(() => import('src/views/Learn/learnArticles/index'))
    },

    //GOODY'S HUB PICK UP ROUTE
    {
      exact: true,
      path: PATH_APP.general.pickup,
      component: lazy(() => import('src/views/pick-up/index'))
    },

    //REDIRECT
    {
      exact: true,
      path: PATH_APP.root,
      component: () => <Redirect to={PATH_APP.general.root} />
    },

    // MANAGEMENT : E-COMMERCE
    // ----------------------------------------------------------------------

    //GOODY'S HUB DISCOVER PRODUCTS ROUTE
    {
      exact: true,
      path: PATH_APP.management.eCommerce.products,
      component: lazy(() => import('src/views/e-commerce/ShopView'))
    },

    //GOODY'S HUB DISCOVER INDIVIDUAL PRODUCT DETAIL ROUTE
    {
      exact: true,
      path: PATH_APP.management.eCommerce.product,
      component: lazy(() => import('src/views/e-commerce/ProductDetailsView'))
    },

    {
      exact: true,
      path: PATH_APP.management.eCommerce.list,
      component: lazy(() => import('src/views/e-commerce/ProductListView'))
    },

    //GOODY'S HUB CHECKOUT ROUTE
    {
      exact: true,
      path: PATH_APP.management.eCommerce.checkout,
      component: lazy(() => import('src/views/e-commerce/CheckoutView'))
    },

    // MANAGEMENT : BLOG
    // ----------------------------------------------------------------------

    //GOODY'S HUB BLOG ROUTE
    {
      exact: true,
      path: PATH_APP.management.blog.root,
      component: lazy(() => import('src/views/blog/BlogView'))
    },

    //GOODY'S HUB INDIVIDUAL POST ROUTE
    {
      exact: true,
      path: PATH_APP.management.blog.post,
      component: lazy(() => import('src/views/blog/PostDetailsView'))
    },
    // MANAGEMENT : USER
    // ----------------------------------------------------------------------

    //GOODY'S HUB USER PROFILE ROUTE
    {
      exact: true,
      path: PATH_APP.management.user.profile,
      component: lazy(() => import('src/views/user/ProfileView'))
    },

    //THIS ROUTE WILL EVENTUALLY TURN INTO PAST ORDERS
    {
      exact: true,
      path: PATH_APP.management.user.cards,
      component: lazy(() => import('src/views/user/UserCardsView'))
    },

    //GOODY'S HUB USER ACCOUNT ROUTE
    {
      exact: true,
      path: PATH_APP.management.user.account,
      component: lazy(() => import('src/views/user/AccountView'))
    },
    {
      exact: true,
      path: PATH_APP.management.user.root,
      component: () => <Redirect to={PATH_APP.management.user.profile} />
    },
    {
      exact: true,
      path: PATH_APP.management.root,
      component: () => <Redirect to={PATH_APP.management.user.profile} />
    },
    // ----------------------------------------------------------------------
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default AppRoutes;
