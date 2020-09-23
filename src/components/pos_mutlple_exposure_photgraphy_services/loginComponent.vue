<template>
     <div class="row" style="padding:20px">
         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
             
             <img style="max-height : 200px ;max-width : 200px ; margin: auto" alt="logo" :src="global_hostname+'/wilmarMediaFiles/MediaFiles/logo_vAhqTMK_ytMrfkE.JPG'">
         </div>
         
             
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px ; font-weight : 800">
             Login
              </div>
           
        
         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
             <q-input v-model="model_username"  type="text" style="margin-bottom : 5px" label="Username" />
             
            <q-input v-model="model_password" @keyup.enter="event_login" style="margin-bottom : 10px" :type="isPwd ? 'password' : 'text'"  label="Password" >
                <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>

             <q-btn  style="width : 100%" color="secondary" outline  label="login" @click="event_login" />
         </div>

        
     </div>
</template>
<script>

import { mapActions } from 'vuex';
import { mapState } from 'vuex';



export default {
    name: "loginComponent",
    
    data() {
        return {
            model_username: '',
            model_password : '',
            isPwd : true,
        }
    },
    
     computed: {
        ...mapState([
            'global_hostname',
        ])
    },
    methods : {
          ...mapActions([
            'actions_login', //also supports payload `this.nameOfAction(amount)` 
            'action_login_get_id'
        ]),
            event_login(){
                       
                      
                        
                       this.actions_login({username : this.model_username , password : this.model_password})
                       
                        
            }
    }

}
</script>
<style lang="scss" >
</style>