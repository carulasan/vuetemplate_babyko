

const getters = {
  // getters_today_sales : state =>{
  //    var today =  state.customerList.filter((element)=>( new Date().toString().substring(0,15) == new Date(element.date_created).toString().substring(0,15) ))
  //    today.forEach(element => {
  //         element.customerListOrder =  state.orderList.filter((el)=>(el.customerOrder == element.url))
  //   });
    
  //    //  customerList
  //     return today
  // },
  getters_getOrderByYears : state =>{
     var temp = state.orderList
     var years = []
     temp.forEach(element => {
         years.push(new Date(element.date_created).getFullYear())
       
     });
     var distictYears = [...new Set(years)]
     state.years_collection = distictYears
     // for chart dashboard
     var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec']
     console.log('month')
     console.log(month)
     var temp_year_orders = []
     state.years_collection.forEach(element => {
      var init_object = {
        year : element,
        orders : temp.filter((el)=> (new Date(el.date_created).getFullYear() == element))
     }     
     temp_year_orders.push(init_object)
     });

     temp_year_orders.forEach(element => {
            var total = 0
            var monthEarned = []
            month.forEach(mo => {
                var order_month = element.orders.filter((el) =>(new Date(el.date_created).toString().substring(4,7) == mo ))
                
                order_month.forEach(element_amount => {
                
                  total = total + parseFloat(element_amount.totalAmmount)
                  
                });
                monthEarned.push(total)
                total = 0
            });
            element.monthEarned = monthEarned
 
     });
    
     return temp_year_orders

  },

  getters_user_logs :state => {
      var data = state.userLogList
      return data
      
  },

  getters_users_count_dashboard : state =>{
     return state.usersList.length
  },
  getters_today_expense_dashboard : state =>{
      var data = state.expensesListItems.filter((element) => (new Date(element.date_created).toString().substring(0, 15) == new Date().toString().substring(0, 15)))
      var total =  0
      data.forEach(element => {
         total =  total + parseFloat(element.ammount)
      });
    return total
  },
  getters_today_sales_dashboard : state =>{
   
    var total = 0
    var customerOrder = state.orderList.filter((element)=>( new Date().toString().substring(0,15) == new Date(element.date_created).toString().substring(0,15) ))
    customerOrder.forEach(element => {
          total = total + parseFloat(element.totalAmmount)
    });
    return total
  },
  getters_pending: state =>{
     var pending =  state.customerList.filter((element)=>( element.pending == true  ))
     pending.forEach(element => {
          element.customerListOrder =  state.orderList.filter((el)=>(el.customerOrder == element.url))
        
    });
    
  
      return pending
  },
  // ay
  getters_today_sales : state =>{
    
    var today =  state.orderList.filter((element)=>( new Date().toString().substring(0,15) == new Date(element.date_created).toString().substring(0,15) ))
     
    //  customerList
     return today
 },
    getters_products: (state) => {
        try {
          var data = []
          var temp = state.productList
          temp.forEach((element) => {
  
            element.productCategory_information = state.categoryList.filter((el) => (el.url == element.productCategory))[0].title
            data.push(element)
          })
          return data
  
        } catch (error) {
          return data
        }
      },
     
      getter_category_list: (state) => {
  
         
            var category_title = []
        state.categoryList.forEach((el) => {
          category_title.push(el.title)
  
        })
        return category_title
  
  
         
      },
      categoryAndProduct: (state) => {
        try {
  
              var data = []
              state.categoryList.forEach(element => {
                var temp_productList = state.productList.filter((el) => { return el.productCategory == element.url })
                // attached_object to category
  
                element.products = temp_productList
  
                element.products.categoryName = element.title
  
                for (let index = 0; index < element.products.length; index++) {
                  const temp = element.products[index];
  
                  element.products[index].actual_image = state.imagesList.filter((el) => (el.id == parseInt(temp.image)))[0].image
                }
  
  
                data.push(element)
              });
              return data;
        } catch (error) {
          data = []
          return data;
        }
  
      },
      getters_expenses: (state) => {
        try {
  
            var data = []
            var list  = state.expensesList
            var items = state.expensesListItems
            var sort = []
            for (let index = list.length -1 ; index >=0 ; index-- ) {
              const element = list[index];
              sort.push(element)
            }
            
            
           
           sort.forEach(element => {
                var temp_items =  items.filter((el)=>(element.url == el.preparedBy))
                   element.expensesListItems = temp_items
                  var info = element.expensesListItems
                     function check(info){
                         var count = 0
                        info.forEach(el => {
                          count = count + parseFloat(el.ammount)
                      
                        });
                       
                        return count

    
                   }
                   element.ammount_expense = check(info)
                  
                   data.push(element)
              })

          
              return data

        } catch (error) {
         
          return data;
        }
  
      },
      getters_supplies_and_items : state =>{
        try {
  
          var data = []
          state.suppliesList.forEach(element => {
            var temp_supplyItems = state.suppliesListItem.filter((el) => { return el.supplies == element.url })
            // attached_object to category

            element.suppliesListItem = temp_supplyItems

           
            element.totalAmount = 0
            var total = 0
            for (let index = 0; index < element.suppliesListItem.length; index++) {
              const temp = element.suppliesListItem[index];
              total = total + parseFloat(temp.totolPrice)
              if (index == element.suppliesListItem.length - 1) {
                element.totalAmount = total
              }
              
            }


            data.push(element)
          });
          return data;
        } catch (error) {
          data = []
          return data;
        }

      },
      getters_suppliers_information : state =>{
       try {
          var data = []
       
          state.supplierInformationList.forEach(element => {
                element.supplierProductList = state.supplierProductList.filter(
                  (el)=>(el.supplierInformation ==  element.url)
                )
                data.push(element)
          });
          return data
       } catch (error) {
         console.log(error)
       }
      },
      getters_option_supplier : state =>{
        try {
           var data = []
        
           state.supplierInformationList.forEach(element => { 
                 data.push(element.companyName)
           });
           return data
        } catch (error) {
          console.log(error)
        }
       },
       getters_expense_keyword : state =>{
         var data = []
         state.expenseKeywordList.forEach((element)=>{
           data.push(element.keyword)
         } )

         return data
       },
       gettters_admin : state =>{
        var data = state.usersList.filter((el)=>(el.is_superuser == true))
        return data
      },
      gettters_employee : state =>{
        var temp_info = []
        var data = state.usersList.filter((el)=>(el.is_superuser != true))
        data.forEach(element => {
          
         element.accessLevel = state.accessLevelList.filter((el)=>(element.url == el.users_instance))
         temp_info.push(element)
        
      });
        
        return temp_info
      },
        getters_instance_access_level : state => {
          try {
            
            var accessLevelList = state.accessLevelList
          console.log(accessLevelList)
          var instance = state.instance
          
          instance.forEach(element => {
            element.accessLevel = accessLevelList.filter((el) => ( el.users_instance == element.url ))
          });
          var accessLevelInstance = instance[0].accessLevel
          var navigation = state.navigation
          for (let index = 0; index < navigation.length; index++) {
            const nav = navigation[index];
              for (let index1 = 0; index1 < accessLevelInstance.length; index1++) {
                const instance_access_level = accessLevelInstance[index1];
                  if (nav.title == instance_access_level.moduleName) {
                       nav.accessLevel =  instance_access_level
                    
                  }
                
              }
            
          }
          console.log('carulasan -------------------')
          console.log(navigation)

          
          return navigation;




          } catch (error) {
            console.log('carulasan -------------------')
            console.log('roor')
         
            
              return [];
          }
        }
      
     
       
      

      
}
export default getters