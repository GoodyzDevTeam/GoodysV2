import React from 'react';
import { MLabel, MIcon } from 'src/theme';
import { PATH_APP, PATH_PAGE } from 'src/routes/paths';

// ----------------------------------------------------------------------

const path = (name) => `/static/icons/navbar/${name}.svg`;

const ICONS = {
  authenticator: <MIcon src={path('ic_authenticator')} />,
  blog: <MIcon src={path('ic_blog')} />,
  calendar: <MIcon src={path('ic_calendar')} />,
  cart: <MIcon src={path('ic_cart')} />,
  charts: <MIcon src={path('ic_charts')} />,
  chat: <MIcon src={path('ic_chat')} />,
  components: <MIcon src={path('ic_components')} />,
  dashboard: <MIcon src={path('ic_dashboard')} />,
  editor: <MIcon src={path('ic_editor')} />,
  elements: <MIcon src={path('ic_elements')} />,
  error: <MIcon src={path('ic_error')} />,
  mail: <MIcon src={path('ic_mail')} />,
  map: <MIcon src={path('ic_map')} />,
  page: <MIcon src={path('ic_page')} />,
  user: <MIcon src={path('ic_user')} />,
  upload: <MIcon src={path('ic_upload')} />,
  copy: <MIcon src={path('ic_copy')} />,
  carousel: <MIcon src={path('ic_carousel')} />,
  language: <MIcon src={path('ic_language')} />
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "your goody's hub",
    items: [
      {
        title: 'dashboard',
        icon: ICONS.dashboard,
        href: PATH_APP.general.root,
        items: [
          {
            title: 'Home',
            href: PATH_APP.general.root
          },
          {
            title: 'Discover',
            href: PATH_APP.management.eCommerce.discover
          },
          // {
          //   title: 'Shop',
          //   href: PATH_APP.management.eCommerce.products
          // },
          // {
          //   title: 'Pick Up',
          //   href: PATH_APP.general.analytics
          // },
          // {
          //   title: 'Orders',
          //   href: PATH_APP.general.analytics
          // },
          {
            title: 'Learn',
            href: PATH_APP.management.blog.learn
          },
          {
            title: 'Blog',
            href: PATH_APP.management.blog.root
          }
        ]
      }
    ]
  },
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'manage',
    items: [
      {
        title: 'user',
        icon: ICONS.user,
        href: PATH_APP.management.user.root,
        items: [
          {
            title: 'profile',
            href: PATH_APP.management.user.profile
          },
          {
            title: 'cards',
            href: PATH_APP.management.user.cards
          },
          {
            title: 'list',
            href: PATH_APP.management.user.list
          },
          {
            title: 'account',
            href: PATH_APP.management.user.account
          }
        ]
      }
    ]
  }
];

export default navConfig;
