import axios from 'axios'
import router from '../router'

import { Loading,Notify } from 'quasar' 



const actions = {
  action_refresh_token({commit}){
    axios.post(`${this.state.global_hostname}/api/refresh/`,{
      refresh : `${this.state.token.refresh}`
    })
    .then(res => {
     
      commit('mutate_refresh_token_get_token',res.data,  this.state.config )
    })
    .catch(err => {
      console.error(err); 
    
        this.$router.push('/')
        setTimeout(() => {
          alert('Session expired')
        }, 2000);
      
    })

  }, 
  get_users({commit},){
         
          
    
    axios.get(`${this.state.global_hostname}/api/user/`, this.state.config )
    .then(res => {
        console.log(res)
      
        commit('mutate_users',res.data)
       
       
       
        
    })
    .catch(err => {
        console.error(err); 
           
    })

  
}, 
  get_user_id({commit},payload){
         
          
          
    axios.get(`${this.state.global_hostname}/api/user/`, this.state.config )
    .then(res => {
        console.log(res)
        var data =res.data
        data.instance_id = payload
        console.log('users')
        console.log(data)
        commit('mutate_user_by_id',data)
       
        
    })
    .catch(err => {
        console.error(err); 
           
    })

  
}, 
  action_login_get_id({dispatch},payload){
        var formdata = new FormData()
        formdata.append('username',payload.username)
        formdata.append('password', payload.password)
        axios.post(`${this.state.global_hostname}/user_login/`,formdata)
        .then(res => {
          console.log(res)
        
          dispatch('get_user_id',res.data.id)
          
        })
        .catch(err => {
          console.error(err); 
        })

  },
  actions_login({commit,dispatch},payload){

    axios.post(`${this.state.global_hostname}/api/token/`,payload, this.state.config )
    .then(res => {
     
        if (res.status == 200) {
          commit('mutate_token',res.data)
          dispatch('action_login_get_id',payload)
          
          Loading.show({  'message': 'Logging In...........................'})
  
          
            router.push('/dashboard')
           
         
          setInterval(() => {
            dispatch('action_refresh_token')
          //  The back end sever token expired in 1 minute
          }, 30000);
        }else{
            alert('Contact Programmer')
        }
     
    })
    .catch(err => {
      console.error(err); 

   Notify.create({ //put dollor sign(q)
      message: `Username or Password may NOT correct! \n Please try again.`,
      timeout: 3000, // in milliseconds; 0 means no timeout
     color: 'red',
     textColor: 'white', // if default 'white' doesn't fit
     icon: 'error', //or  avatar: 'statics/boy-avatar.png',
     position: 'top', // 'top', 'left', 'bottom-left' etc.
   })
   
      
       setTimeout(() => {
         
        location.reload()
       }, 3000);
    })


    
  },
  
    action_view_products({ commit }, payload) {
        commit('mutate_view_product', payload)
      },
      action_getProduct({ commit },) {
    
        axios.get(`${this.state.global_hostname}/api/Product/`,  this.state.config )
          .then(res => {
    
            commit('mutate_product', res.data)
          })
          .catch(err => {
            console.error(err);
          })
    
      },
    
      action_getCategory({ commit }, ) {
    
    
        axios.get(`${this.state.global_hostname}/api/ProductCategory/`,  this.state.config )
          .then(res => {
    
            commit('mutate_category', res.data)
          })
          .catch(err => {
            console.error(err);
          })
    
      },
  
      action_getImages({ commit ,dispatch }, ) {
        
    
        axios.get(`${this.state.global_hostname}/api/FilesImages/`,  this.state.config )
          .then(res => {
            
            console.log('images')
            commit('mutate_images', res.data)
            dispatch('get_companyInformation')
            
          })
          .catch(err => {
            console.error(err);
          })
    
      },
      action_get_orders({commit},){
        axios.get(`${this.state.global_hostname}/api/orders/`,  this.state.config )
        .then(res => {
          commit('mutate_orders',res.data)
        })
        .catch(err => {
          console.error(err); 
        })
        
      },
      action_get_expenses({commit},){
        axios.get(`${this.state.global_hostname}/api/ExpensesInstance/`,  this.state.config  )
        .then(res => {
          commit('mutate_expenses',res.data)
        })
        .catch(err => {
          console.error(err); 
        })
        
      },
      action_get_expenses_items({commit},){
        axios.get(`${this.state.global_hostname}/api/ExpensesItems/`, this.state.config  )
        .then(res => {
          commit('mutate_expenses_items',res.data)
        })
        .catch(err => {
          console.error(err); 
        })
        
      },
      action_get_supplies({commit},){
        axios.get(`${this.state.global_hostname}/api/Supplies/`,  this.state.config )
        .then(res => {
          commit('mutate_supplies',res.data)
        })
        .catch(err => {
          console.error(err); 
        })
        
      },
      action_get_suppliesItems({commit},){
        axios.get(`${this.state.global_hostname}/api/SupplyItems/`,  this.state.config )
        .then(res => {
          commit('mutate_suppliesItems',res.data)
        })
        .catch(err => {
          console.error(err); 
        })
        
      },
      action_get_customer({commit,dispatch},){
        axios.get(`${this.state.global_hostname}/api/customer/`, this.state.config)
        .then(res => {
          commit('mutate_customer',res.data)
          dispatch('action_get_orders')
          
        })
        .catch(err => {
          console.error(err); 
        })
        
      },
     
      get_supplier_information({commit},){
        axios.get(`${this.state.global_hostname}/api/SupplierInformation/`,  this.state.config )
        .then(res => {
          commit('mutate_supplier_information',res.data)
        })
        .catch(err => {
          console.error(err); 
        })
        
      },
      get_supplier_products({commit},){
        axios.get(`${this.state.global_hostname}/api/SupplierProducts/`,   this.state.config )
        .then(res => {
          commit('mutate_supplier_products',res.data)
        })
        .catch(err => {
          console.error(err); 
        })
        
      },
      get_expense_keyword({commit},){
        axios.get(`${this.state.global_hostname}/api/ExpenseKeyword/`,  this.state.config )
        .then(res => {
            console.log(res)
            commit('mutate_expenses_keyword',res.data)
            
        })
        .catch(err => {
            console.error(err); 
               
        })
        
      },
      get_companyInformation({commit},){
        axios.get(`${this.state.global_hostname}/api/CompanyInformation/1/`,  this.state.config  ) 
        .then(res => {
            console.log(res)
      
            commit('mutate_companyInformation',[res.data])
            
        })
        .catch(err => {
            console.error(err); 
               
        })
      },
      
         
    
      actions_get_access_level({commit},){
        axios.get(`${this.state.global_hostname}/api/AccessLevel/`, this.state.config)
        .then(res => {
            console.log(res)
           
            commit('mutate_access_level',res.data)
            
        })
        .catch(err => {
            console.error(err); 
               
        })

      
      },
     
      actions_get_user_logs({commit},){
        axios.get(`${this.state.global_hostname}/api/userLogs/`, this.state.config)
        .then(res => {
            console.log(res)
           
            commit('mutate_user_log',res.data)
            
        })
        .catch(err => {
            console.error(err); 
               
        })

      
      },
      actions_save_user_log({dispatch},payload){
        axios.post(`${this.state.global_hostname}/api/userLogs/`,payload , this.state.config)
        .then(() => {
           
           
            dispatch('actions_get_user_logs')
            
        })
        .catch(err => {
            console.error(err); 
               
        })

      
      },


      
     




      
// http post http://127.0.0.1:8000/api/token/ username=vitor password=123
// http post http://127.0.0.1:8000/api/token/refresh/ refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU0NTMwODIyMiwianRpIjoiNzAyOGFlNjc0ZTdjNDZlMDlmMzUwYjg3MjU1NGUxODQiLCJ1c2VyX2lkIjoxfQ.Md8AO3dDrQBvWYWeZsd_A1J39z6b6HEwWIUZ7ilOiPE
     
      

    

      
    
}
export default actions