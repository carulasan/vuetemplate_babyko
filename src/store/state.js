const state  = {
        customer_subtotal_order : 0,
        global_hostname: 'http://192.168.100.106:4000',
        instance : [{url : '',is_superuser : false}],
        token : {
            "refresh": "",
            "access": ""
        },
         config  : {
            headers : {
                
            }
        },
        userLogList : [],
        years_collection : [],
        state_monthly_earned : [15000,15000,89000,20000,63000,40000,14000,56000,89000,78000,56000,45000],
        navigation : [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: "dashboard",
              },
            {
                title: "Transaction",
                path: "/transaction",
                icon: "receipt_long",
              },
              {
                title: "Pending",
                path: "/pending",
                icon: "pending_actions",
              },
              
               {
                title: "Products",
                path: "/products",
                icon: "loyalty",
              },
              {
                title: "Expenses",
                path: "/expenses",
                icon: "science",
              },
              {
                title: "Supplies",
                path: "/supplies",
                icon: "support_agent",
              },
              {
                title: "Reports",
                path: "/reports",
                icon: "timeline",
              },
               {
                title: "Export",
                path: "/export",
                icon: "double_arrow",
              },
              
              
              {
                title: "Settings",
                path: "/settings",
                icon: "settings",
              },
              {
                title: "My Account",
                path: "/myaccount",
                icon: "admin_panel_settings",
              },
              {
                title: "About",
                path: "/about",
                icon: "info",
              },
              
        ],
        orderList_filtered_start_end_date : [],
        orderList_filtered_start_end_date_reprint : [],
        print_sales : [],
        state_date_print : '',
        reportEarnedPerDay : [],
        total_earned_today : 0,
        accessLevelList : [
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/3/",
                "id": 3,
                "users_instance": "http://192.168.100.106:4000/api/user/17/",
                "moduleName": "Products",
                "view": true,
                "edit": false,
                "add": true,
                "delete": false,
                "printInformation": true,
                "date_created": "2020-09-06T00:50:53.779490Z",
                "date_updated": "2020-09-08T02:12:56.092248Z"
            },
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/4/",
                "id": 4,
                "users_instance": "http://192.168.100.106:4000/api/user/17/",
                "moduleName": "Expenses",
                "view": true,
                "edit": false,
                "add": true,
                "delete": false,
                "printInformation": true,
                "date_created": "2020-09-06T00:50:53.796488Z",
                "date_updated": "2020-09-08T02:12:56.224249Z"
            },
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/5/",
                "id": 5,
                "users_instance": "http://192.168.100.106:4000/api/user/17/",
                "moduleName": "Settings",
                "view": true,
                "edit": false,
                "add": true,
                "delete": false,
                "printInformation": true,
                "date_created": "2020-09-06T00:50:53.990490Z",
                "date_updated": "2020-09-08T02:12:56.218244Z"
            },
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/6/",
                "id": 6,
                "users_instance": "http://192.168.100.106:4000/api/user/17/",
                "moduleName": "Reports",
                "view": true,
                "edit": false,
                "add": true,
                "delete": false,
                "printInformation": true,
                "date_created": "2020-09-06T00:50:53.988487Z",
                "date_updated": "2020-09-08T02:12:56.536248Z"
            },
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/7/",
                "id": 7,
                "users_instance": "http://192.168.100.106:4000/api/user/17/",
                "moduleName": "Supplies",
                "view": true,
                "edit": false,
                "add": true,
                "delete": false,
                "printInformation": true,
                "date_created": "2020-09-06T00:50:54.148490Z",
                "date_updated": "2020-09-08T02:12:56.249246Z"
            },
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/8/",
                "id": 8,
                "users_instance": "http://192.168.100.106:4000/api/user/17/",
                "moduleName": "Transaction",
                "view": true,
                "edit": false,
                "add": true,
                "delete": false,
                "printInformation": true,
                "date_created": "2020-09-06T00:50:53.775489Z",
                "date_updated": "2020-09-08T02:12:56.388246Z"
            },
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/9/",
                "id": 9,
                "users_instance": "http://192.168.100.106:4000/api/user/18/",
                "moduleName": "Reports",
                "view": true,
                "edit": true,
                "add": true,
                "delete": true,
                "printInformation": true,
                "date_created": "2020-09-06T03:22:06.120868Z",
                "date_updated": "2020-09-06T03:22:38.832871Z"
            },
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/10/",
                "id": 10,
                "users_instance": "http://192.168.100.106:4000/api/user/18/",
                "moduleName": "Transaction",
                "view": true,
                "edit": true,
                "add": true,
                "delete": true,
                "printInformation": true,
                "date_created": "2020-09-06T03:22:06.141872Z",
                "date_updated": "2020-09-06T03:22:38.841867Z"
            },
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/11/",
                "id": 11,
                "users_instance": "http://192.168.100.106:4000/api/user/18/",
                "moduleName": "Products",
                "view": true,
                "edit": true,
                "add": true,
                "delete": true,
                "printInformation": true,
                "date_created": "2020-09-06T03:22:06.365873Z",
                "date_updated": "2020-09-06T03:22:38.847872Z"
            },
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/12/",
                "id": 12,
                "users_instance": "http://192.168.100.106:4000/api/user/18/",
                "moduleName": "Expenses",
                "view": true,
                "edit": true,
                "add": true,
                "delete": true,
                "printInformation": true,
                "date_created": "2020-09-06T03:22:06.130868Z",
                "date_updated": "2020-09-06T03:22:38.845869Z"
            },
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/13/",
                "id": 13,
                "users_instance": "http://192.168.100.106:4000/api/user/18/",
                "moduleName": "Supplies",
                "view": true,
                "edit": true,
                "add": true,
                "delete": true,
                "printInformation": true,
                "date_created": "2020-09-06T03:22:06.134866Z",
                "date_updated": "2020-09-06T03:22:39.350867Z"
            },
            {
                "url": "http://192.168.100.106:4000/api/AccessLevel/14/",
                "id": 14,
                "users_instance": "http://192.168.100.106:4000/api/user/18/",
                "moduleName": "Settings",
                "view": true,
                "edit": true,
                "add": true,
                "delete": true,
                "printInformation": true,
                "date_created": "2020-09-06T03:22:06.136865Z",
                "date_updated": "2020-09-06T03:22:39.347870Z"
            }
        ],
        
        instanceUserAccessLevel : [],
        user_instance : 0,
        modules_properties : [
            {
                'id' : 1,
                'name': 'Transaction',
                'view' : true,
                'edit' : true,
                'delete' : true,
                'add' : true,
                'print' : true,
            },
            {
                'id' : 2,
                'name': 'Products',
                'view' : false,
                'edit' : false,
                'delete' : false,
                'add' : false,
                'print' : false,
            },
            {
                'id' : 3,
                'name': 'Expenses',
                'view' : false,
                'edit' : false,
                'delete' : false,
                'add' : false,
                'print' : false,
            },
            {
                'id' : 4,
                'name': 'Supplies',
                'view' : false,
                'edit' : false,
                'delete' : false,
                'add' : false,
                'print' : false,
            },
            {
                'id' : 5,
                'name': 'Reports',
                'view' : false,
                'edit' : false,
                'delete' : false,
                'add' : false,
                'print' : false,
            },
             {
                'id' : 6,
                'name': 'Export',
                'view' : false,
                'edit' : false,
                'delete' : false,
                'add' : false,
                'print' : false,
            },
            {
                'id' : 7,
                'name': 'Settings',
                'view' : false,
                'edit' : false,
                'delete' : false,
                'add' : false,
                'print' : false,
            },
            {
                'id' : 8,
                'name': 'My Account',
                'view' : true,
                'edit' : false,
                'delete' : false,
                'add' : false,
                'print' : false,
            },
            {
                'id' : 8,
                'name': 'About',
                'view' : true,
                'edit' : false,
                'delete' : false,
                'add' : false,
                'print' : false,
            },
            {
                'id' : 9,
                'name': 'Pending',
                'view' : false,
                'edit' : false,
                'delete' : false,
                'add' : false,
                'print' : false,
            },
            {
                'id' : 10,
                'name': 'Dashboard',
                'view' : true,
                'edit' : false,
                'delete' : false,
                'add' : false,
                'print' : false,
            },
            
        ],
        orderList : [{
            "url": "http://192.168.100.106:8000/api/orders/76/",
            "id": 76,
            "customerOrder": "http://192.168.100.106:8000/api/customer/36/",
            "product": "A4 or 8.5 x 11 inches-Plastic Lamination",
            "quantity": "1",
            "price": "100.00",
            "totalAmmount": "100.00",
            "date_created": "2020-08-30T02:39:44.678152Z",
            "date_updated": "2020-08-30T02:39:44.678152Z"
        },],
        customerList : [ {
            "url": "http://192.168.100.106:8000/api/customer/36/",
            "id": 36,
            "customer": null,
            "images": null,
            "preparedBy": "Brylle",
            "totalAmountOrder": "100.00",
            "date_created": "2020-08-30T02:39:44.366126Z",
            "date_updated": "2020-08-30T02:39:44.366126Z"
        },],
        report_print_order : {},
        
            user_clicked_category: '',
            imagesList: [],
            categoryList: [],
            productList: [],
            products_info: [],
            customerOrder: [],
            expensesList : [],
            expensesListItems:[],
            suppliesList : [
                {
                    "url": "http://192.168.100.106:8000/api/Supplies/2/",
                    "id": 2,
                    "supplier": "MC Company",
                    "preparedBy": "Len",
                    "status": true,
                    "date_created": "2020-08-28T11:17:44.848740Z",
                    "date_updated": "2020-08-28T11:17:44.848740Z"
                }
            ],
            suppliesListItem: [
                {
                    "url": "http://192.168.100.106:8000/api/SupplyItems/1/",
                    "id": 1,
                    "supplies": "http://192.168.100.106:8000/api/Supplies/2/",
                    "quantity": "1",
                    "price": "150.00",
                    "totolPrice": "120.00",
                    "productName": "Short Bandpaper",
                    "date_created": "2020-08-29T09:27:58.843744Z",
                    "date_updated": "2020-08-29T09:27:58.843744Z"
                }
            ],
            reciept_id : 0,
            global_preparedby : '',
            customerOrder_for_reciept : [],
            prepared_by : ['Ann Ann', 'MC', 'Brylle','Len'],
            supplies_instance : [{
              
                "quantity": 1,
                "price": '',
                "totolPrice": '',
                "productName": '',
            }],
            supplies_to_print : { "url": "http://192.168.100.106:8000/api/Supplies/2/", "id": 2, "supplier": "MC Company", "preparedBy": "Len", "status": false, "date_created": "2020-08-28T11:17:44.848740Z", "date_updated": "2020-08-29T13:36:21.714662Z", "suppliesListItem": [ { "url": "http://192.168.100.106:8000/api/SupplyItems/1/", "id": 1, "supplies": "http://192.168.100.106:8000/api/Supplies/2/", "quantity": "1", "price": "150.00", "totolPrice": "120.00", "productName": "Short Bandpaper", "date_created": "2020-08-29T09:27:58.843744Z", "date_updated": "2020-08-29T09:27:58.843744Z" } ], "totalAmount": 120 },
            supplierInformationList : [
                {
                    "url": "http://192.168.100.106:4000/api/SupplierInformation/1/",
                    "id": 1,
                    "companyName": "Makubizz",
                    "address": "1418 NICODEMUS JUAN LUNA TONDO MANILA",
                    "date_created": "2020-09-01T08:36:33.680644Z",
                    "date_updated": "2020-09-01T08:36:33.680644Z"
                }
            ],
            supplierProductList : [
                {
                    "url": "http://192.168.100.106:4000/api/SupplierProducts/1/",
                    "id": 1,
                    "supplierInformation": "http://192.168.100.106:4000/api/SupplierInformation/1/",
                    "unitCost": "566.00",
                    "unit": "box",
                    "productName": "hard Copy",
                    "date_created": "2020-09-01T10:07:42.668204Z",
                    "date_updated": "2020-09-01T10:07:42.668204Z"
                }

            ],
            expenseKeywordList : [
                {
                    "url": "http://192.168.100.106:4000/api/ExpenseKeyword/1/",
                    "id": 1,
                    "keyword": "afdafdf",
                    "date_created": "2020-09-02T06:27:03.573611Z",
                    "date_updated": "2020-09-02T06:27:03.574609Z"
                }
            ],
            companyInformation : [
                
                    {
                        "url": "http://192.168.100.106:4000/api/CompanyInformation/1/",
                        "id": 1,
                        "companyName": "Multiple Exposure Photography Services",
                        "aboutCompany": "The company was a former Wilmar Studio Photography services that have been provide photo seriveces since 1950's. Mike Ampo was the one of a prominent photographer back then. From the past decades, the company previosly used a photographic film, It is a strip or sheet of transparent film base coated on one side with a gelatin emulsion containing microscopically small light-sensitive silver halide crystals. The sizes and other characteristics of the crystals determine the sensitivity, contrast, and resolution of the film.",
                        "logo": "108",
                        "image": "",
                        "address": "566-A LAKANDULA ST. TONDO MANILA",
                        "date_created": "2020-09-03T12:26:00.225535Z",
                        "date_updated": "2020-09-03T13:06:49.531572Z"
                    }
                
            ],
            usersList : [],
            
           
            
    
}
export default  state