// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

// ROOTS
const ROOTS = {
  auth: '/auth',
  app: '/app',
  discover: '/discover',
  learn: '/learn',
  pickup: '/pickup'
};

// PAGE PATHS
export const PATH_PAGE = {
  auth: {
    root: ROOTS.auth,
    login: path(ROOTS.auth, '/login'),
    loginUnprotected: path(ROOTS.auth, '/login-unprotected'),
    register: path(ROOTS.auth, '/register'),
    registerUnprotected: path(ROOTS.auth, '/register-unprotected'),
    resetPassword: path(ROOTS.auth, '/reset-password'),
    updatePassword: path(ROOTS.auth, '/update-password/:key'),
    verify: path(ROOTS.auth, '/verify/')
  },
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment'
};

// HOME PAGE PATHS
export const PATH_HOME = {
  components: '/components',
  // cloud: 'https://www.sketch.com/s/0fa4699d-a3ff-4cd5-a3a7-d851eb7e17f0',
  // purchase: 'https://material-ui.com/store/items/minimal-dashboard/',
  dashboard: ROOTS.app
};

// APP PATHS
//USERS WILL BE ABLE TO ACCESS THE PATHS BELOW AFTER THEY HAVE CREATED AN ACCOUNT OR SIGNED IN.
//THE PATHS BELOW LEAD TO THE USERS PERSONAL GOODY'S HUB (DASHBOARD)
export const PATH_APP = {
  root: ROOTS.app,
  general: {
    root: path(ROOTS.app, '/dashboard'), // GOODYS-HUB MAIN USER DASHBOARD PATH
    dashboard: path(ROOTS.app, '/dashboard/home'),
    discover: path(ROOTS.app, '/dashboard/discover'), // DISCOVER PATH FOR USERS GOODY'S HUB(DASHBOARD)
    productInCategory: path(ROOTS.app, '/dashboard/discover/:categoryId'),
    productDetail: path(ROOTS.app, '/dashboard/discover/productDetail/:productId'),
    productDetail1: path(ROOTS.app, '/productDetail/:productId'),
    dispensaryDetail: path(ROOTS.app, '/dashboard/discover/dispensaryDetail/:dispensaryId'),
    learn: path(ROOTS.app, '/dashboard/blog/learn'), // LEARN PATH FOR USERS GOODY'S HUB(DASHBOARD)
    learnTopics: path(ROOTS.app, '/management/learn/topics'),
    posts: path(ROOTS.app, '/management/blog'),
    pickup: path(ROOTS.app, '/dashboard/pickup'), // PICK UP PATH FOR USERS GOODY'S HUB(DASHBOARD)
    analytics: path(ROOTS.app, '/dashboard/analytics')
  },
  management: {
    root: path(ROOTS.app, '/management'),
    user: {
      root: path(ROOTS.app, '/management/user'),
      profile: path(ROOTS.app, '/management/user/profile'),
      cards: path(ROOTS.app, '/dashboard/card'),
      list: path(ROOTS.app, '/management/user/list'),
      account: path(ROOTS.app, '/management/user/account')
    },
    eCommerce: {
      root: path(ROOTS.app, '/management/e-commerce'),
      discover: path(ROOTS.app, '/management/discover'),
      products: path(ROOTS.app, '/management/e-commerce/products'),
      product: path(ROOTS.app, '/management/e-commerce/product/:name'),
      productById: path(
        ROOTS.app,
        '/management/e-commerce/product/nike-air-force-1-ndestrukt'
      ),
      list: path(ROOTS.app, '/management/e-commerce/list'),
      checkout: path(ROOTS.app, '/management/e-commerce/checkout'),
      invoice: path(ROOTS.app, '/management/e-commerce/invoice')
    },
    blog: {
      root: path(ROOTS.app, '/management/blog'),
      learn: path(ROOTS.app, '/dashboard/blog/learn'),
      learnTopics: path(ROOTS.app, '/management/learn/topics'),
      learnArticles: path(ROOTS.app, '/management/learn/articles'),
      post: path(ROOTS.app, '/management/blog/post/:title'),
      postById: path(
        ROOTS.app,
        '/management/blog/post/portfolio-review-is-this-portfolio-too-creative'
      ),
      newPost: path(ROOTS.app, '/management/blog/new-post')
    }
  }
};

//DISCOVER PATH FOR LANDING PAGE USER DOES NOT HAVE TO BE SIGNED IN TO SEE THIS PAGE
export const PATH_DISCOVER = {
  root: ROOTS.discover,
  general1: {
    discover: ROOTS.discover,
    productInCategory: path(ROOTS.discover, '/:categoryId'),
    productDetail: path(ROOTS.discover, '/productDetail/:productId'),
    dispensaryDetail: path(ROOTS.discover, '/dispensaryDetail/:dispensaryId'),
    products: path(ROOTS.app, '/discover/products'),
    product: path(ROOTS.app, '/e-commerce/product/:name')
  }
};

// LEARN PATH FOR LANDING PAGE USER DOES NOT HAVE TO BE SIGNED IN TO SEE THIS PAGE
export const PATH_LEARN = {
  root: ROOTS.learn,
  general2: {
    learn: path(ROOTS.learn, '/learn'),
    learnTopics: path(ROOTS.learn, '/learn/topics')
  }
};

//PICK UP PATH FOR LANDING PAGE USER DOES NOT HAVE TO BE SIGNED IN TO SEE THIS PAGE
export const PATH_PICKUP = {
  root: ROOTS.pickup,
  general3: {
    pickup: path(ROOTS.pickup, '/pickup')
  }
};
