
const mutations = {

    mutate_category(state, payload) {
      state.categoryList = payload
    },
    mutate_product(state, payload) {
      state.productList = payload
    },
    mutate_view_product(state, payload) {
      state.products_info = []
      
      state.products_info = payload
    },
    mutate_images(state, payload) {
      
      state.imagesList = payload
    },

    mutate_subtotal(state, ) {
      var count = 0
      state.customerOrder.forEach(
        (element) => {

          count = count + parseInt(element.totalAmmount)
        }
      )

      state.customer_subtotal_order = count
    },
    mutate_orders(state, payload) {
      state.orderList = []
      state.orderList = payload

    
    },
    mutate_set_start_end_date_reprint(state, payload) {

      var fro_and_to = state.customerList.filter((element) => (new Date(payload.date_start).toString().substring(4, 15) <= new Date(element.date_created).toString().substring(4, 15) && new Date(payload.date_end).toString().substring(4, 15) >= new Date(element.date_created).toString().substring(4, 15)))
      fro_and_to.forEach(element => {
        element.customerListOrder =  state.orderList.filter((el)=>(el.customerOrder == element.url))
        });
  
      state.orderList_filtered_start_end_date_reprint = fro_and_to
    },

    mutate_set_start_end_date(state, payload) {
      
     try {
      var fro_and_to = state.orderList.filter((element) => (new Date(payload.date_start).toString().substring(4, 15) <= new Date(element.date_created).toString().substring(4, 15) && new Date(payload.date_end).toString().substring(4, 15) >= new Date(element.date_created).toString().substring(4, 15)))
      state.orderList_filtered_start_end_date = fro_and_to
      if (payload.date_start.length <= 0 || payload.date_end.length <= 0 ) {
        state.orderList_filtered_start_end_date =  []
      }
     } catch (error) {
       console.log(error)
      state.orderList_filtered_start_end_date =  []
       
     }
    },
    mutate_empty_customer_order(state, ){
      state.customerOrder = []
    },
    mutate_expenses(state, payload){
      state.expensesList = payload
    },
    mutate_expenses_items(state, payload){
      state.expensesListItems = payload
    },
    mutate_reciept_information(state, payload){
      state.reciept_id = payload.reciept_id,
      state.global_preparedby = payload.global_preparedby
      state.customerOrder_for_reciept = payload.customerOrder
    },
    mutate_print_sales(state,payload){
      state.print_sales = payload
      state.state_date_print = payload.date_info
    },
    mutation_add_row_supplies(state, payload){
      state.supplies_instance.push(payload)
    },
    mutation_clear_supplies(state, ){
      state.supplies_instance = []
    },
    mutate_supplies(state, payload){
      state.suppliesList = payload
    },
    mutate_suppliesItems(state, payload){
      state.suppliesListItem = payload
    },
    mutate_supplies_to_print(state, payload){
      state.supplies_to_print = payload
    },
    mutate_print_supplies(state, payload){
      state.supplies_to_print = payload
    },
    mutate_customer(state, payload){
      state.customerList = []
      state.customerList = payload
    },
    mutate_print_order(state, payload){
      state.report_print_order = {}
      state.report_print_order = payload
    },
    mutate_clear_order(state, ){
      state.customerOrder =[]
      
    },
    mutate_supplier_information(state, payload){
      state.supplierInformationList = payload
    },
    mutate_supplier_products(state, payload){
      state.supplierProductList = payload 
    },
    mutate_expenses_keyword(state, payload){
      state.expenseKeywordList = payload 
    },
    mutate_companyInformation(state, payload){
     
      
     try {
       
      
      state.companyInformation = []
     
      payload[0].image = state.imagesList.filter(el =>(el.id == parseInt(payload[0].logo)))[0].image
      state.companyInformation = payload 
      console.log('mutaion')
      console.log(state.companyInformation)

     } catch (error) {
        console.log(error)
     }
      
    },
    mutate_users(state, payload){
      state.usersList = payload 
    },
    mutate_user_by_id(state, payload){

    //  alert('id' +payload  )
    // instance_id
    console.log('users--------------------------')
      
    console.log(payload)
    var data = payload.filter((el)=>(el.id == payload.instance_id))
    state.instance = data
    
      
    },
    mutate_access_level(state, payload){
      state.accessLevelList = payload 
    },
    mutate_access_level_instance(state, payload){
      state.instanceUserAccessLevel = payload 
    },
    mutate_token(state, payload){
      state.token = payload 
      state.config.headers = {Authorization : `Bearer ${payload.access}`}
    },
    mutate_refresh_token_get_token(state, payload){
      state.token.access  = payload.access
      state.config.headers = {Authorization : `Bearer ${payload.access}`}
    },
    mutate_logout(state, ){
      state.config.headers = {}
      state.token  = {}
    },
      mutate_earned_per_day(state, payload) {

      var fro_and_to = state.orderList.filter((element) => (new Date(payload.date_start).toString().substring(4, 15) <= new Date(element.date_created).toString().substring(4, 15) && new Date(payload.date_end).toString().substring(4, 15) >= new Date(element.date_created).toString().substring(4, 15)))
        var dates = []
        for (let index = 0; index < fro_and_to.length; index++) {
          const element = fro_and_to[index];
          
          const tempd = `${new Date(element.date_created).toString().substring(0,15)}`
        
        
          dates.push(tempd)
          if (index == fro_and_to.length - 1) {
          
            dates = [...new Set(dates)]
          
          }
          
        }

      var temp_object = {}
      var data_info  = []
        for (let index = 0; index < dates.length; index++) {
          const element = dates[index];
              temp_object = {
                'date' : element,
                'orders' : fro_and_to.filter((el)=>(new Date(el.date_created).toString().substring(0,15)  == element)),
                'totalearned' : 0,
              }
              var count = 0.00
              for (let index2 = 0; index2 < temp_object.orders.length; index2++) {
                  const element2 = temp_object.orders[index2];
                  count = count + parseFloat(element2.totalAmmount)
                  
              }
              temp_object.totalearned = count
              

              data_info.push(temp_object)


          
        }
        

      state.reportEarnedPerDay = data_info

    },
    mutate_user_log(state,payload){
      state.userLogList = payload
    },
    
    


    

    
    
    

    
    
    
    
    
    

}
export default mutations