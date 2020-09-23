import Vue from 'vue'
import VueRouter from 'vue-router'

// import transaction from '../views/pos_multiple_exposure_photography_services/transaction.vue'
// import navigation from '../components/pos_mutlple_exposure_photgraphy_services/navigation.vue'
// import reports from '../views/pos_multiple_exposure_photography_services/reports.vue'
// import expenses from '../views/pos_multiple_exposure_photography_services/expenses.vue'
// import supplies from '../views/pos_multiple_exposure_photography_services/supplies.vue'
// import products from '../views/pos_multiple_exposure_photography_services/products.vue'
// import settings from '../views/pos_multiple_exposure_photography_services/settings.vue'
// import login from '../views/pos_multiple_exposure_photography_services/login.vue'
// import Export from '../views/pos_multiple_exposure_photography_services/Export.vue'
// import myAccount from '../views/pos_multiple_exposure_photography_services/myAccount.vue'
// import about from '../views/pos_multiple_exposure_photography_services/about.vue'
// import pending from '../views/pos_multiple_exposure_photography_services/pending.vue'
// import dashboard from '../views/pos_multiple_exposure_photography_services/dashboard.vue'

import dashboard from '../views/EDUCACION/dashboard.vue'
import startervue from '../views/EDUCACION/startervue.vue'
import about from '../views/EDUCACION/about.vue'
import contact from '../views/EDUCACION/contact.vue'



Vue.use(VueRouter)

  const routes = [
    // ITO YUNG UNANG PATH BABY*******baby if na test mo na to tanggaling mo na******* 
    {
      path: '',
      name: 'startervue',
      component: startervue

    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    // {
    //   path: '',
    //   name: 'login',
    //   component: login
    // },
    // {
    //   path: '/transaction',
    //   name: 'navigation',
    //   component: navigation,
    //   children: [

    //     {
    //       path: '/dashboard',
    //       name: 'dashboard',
    //       component: dashboard
    //     },
      
    //       {
    //         path: '/myaccount',
    //         name: 'myaccount',
    //         component: myAccount
    //       },
    //       {
    //         path: '/pending',
    //         name: 'pending',
    //         component: pending
    //       },
    //       {
    //         path: '/',
    //         name: 'transaction',
    //         component: transaction
    //       },
    //       {
    //         path: '/export',
    //         name: 'Export',
    //         component: Export
    //       },
    //       {
    //         path: '/reports',
    //         name: 'reports',
    //         component: reports
    //       },
    //       {
    //         path: '/expenses',
    //         name: 'expenses',
    //         component: expenses
    //       },
    //        {
    //         path: '/supplies',
    //         name: 'supplies',
    //         component: supplies
    //       },
    //       {
    //         path: '/products',
    //         name: 'products',
    //         component: products
    //       },
    //       {
    //         path: '/settings',
    //         name: 'settings',
    //         component: settings
    //       },
    //       {
    //         path: '/about',
    //         name: 'about',
    //         component: about
    //       },
    //   ]
    // },
    

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
