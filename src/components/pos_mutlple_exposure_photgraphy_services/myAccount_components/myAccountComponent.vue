<template>
    <div class="row" >
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 shadow-1" style="margin:auto; border-radius:  10px; padding:10px">
            <q-expansion-item
              expand-separator
              icon="perm_identity"
              label="My Account"
              style="text-align:left;"
              class="expansion_style"
               default-opened
            >
           
             <div class="row" v-for="(item,index) in instance" :key="index" style="padding:20px; margin-bottom : 10px">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 fields">
                        <q-input readonly v-model="item.first_name" type="text" label="First Name" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 fields">
                        <q-input readonly v-model="item.last_name" type="text" label="Last Name" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 fields">
                        <q-input readonly v-model="item.email" type="text" label="Email" />
                    </div>
        
                     <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 fields">
                        <q-input readonly v-model="item.username" type="text" label="Username" />
                    </div>
                  
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 fields">
                        <q-btn @click="event_edit_employee_information(item)" color="secondary" icon="edit" outline   />
                    </div>
             </div>
            </q-expansion-item>
        </div>
        <q-dialog v-model="dialog_instance_account" persistent>
            <q-card style="width: 100%;">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
                    Edit Employee Account
                </div>
                
                <q-card-section>
                   <q-input style="margin-bottom : 5px" v-model="instance_account.first_name" type="text" label="First Name" />
                   <q-input style="margin-bottom : 5px" v-model="instance_account.last_name" type="text" label="Last Name" />
                   <q-input style="margin-bottom : 5px" v-model="instance_account.email" type="text" label="Email" />
                    <q-input style="margin-bottom : 5px" v-model="instance_account.username" type="text" label="Username" />
                   <q-btn-group>
                    <q-btn  label="Update" outline color="secondary" @click="update_employee_account" />
                   
                    <q-btn color="primary"  outline  label="Change Password" @click="dialog_change_password = true" />
                     
                      <q-btn flat label="close"  color="grey" v-close-popup />
                   </q-btn-group>
                   
                   
                </q-card-section>
                <q-card-actions align="right">
                  
                  
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="dialog_change_password" persistent>
            <q-card>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
                Change Password
                </div>
                
                <q-card-section >
                   <q-input style="margin-bottom : 5px" v-model="model_new_password" type="text" label="New Password" />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Save Changes" @click="change_password" color="primary"  />
                </q-card-actions>
            </q-card>
        </q-dialog>


    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import axios from "axios";
import { mapState } from 'vuex';


export default {
    name: "AdminAccounts",
    data() {
        return {
            dialog_instance_account: false,
            instance_account :{},
            dialog_change_password : false,
            model_new_password : '',
            
        }
    },

     computed: {
            ...mapState([
            'global_hostname',
            'config',
            'instance'
        ]),
        ...mapGetters([
            'gettters_admin',
        ])
    },
    methods: {
  ...mapActions([
            'get_users', //also supports payload `this.nameOfAction(amount)` 
        ]),
        
         event_edit_employee_information(item){
                this.instance_account = item
                this.dialog_instance_account  = true
        },
        change_password(){
       
          if (this.model_new_password.length <= 0) {
                alert('Password must not be Empty')
                return
          }
            let data = new FormData()
            data.append('employee_id' , this.instance_account.id)
            data.append('new_password' , this.model_new_password)

             axios.post(`${this.global_hostname}/change_password/`, data,this.config)
            .then(res => {
                console.log(res)
                if (res.data.status == true) {
                          this.$q.notify({ //put dollor sign(q)
                     message: `Change Password Successfull!`,
                     timeout: 3000, // in milliseconds; 0 means no timeout
                    color: 'primary',
                    textColor: 'white', // if default 'white' doesn't fit
                    icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                    position: 'top', // 'top', 'left', 'bottom-left' etc.
                })
                this.get_users()
                this.dialog_change_password  = true
                }else{
                      this.$q.notify({ //put dollor sign(q)
                     message: `Error Please Try Again!`,
                     timeout: 3000, // in milliseconds; 0 means no timeout
                    color: 'red',
                    textColor: 'white', // if default 'white' doesn't fit
                    icon: 'error', //or  avatar: 'statics/boy-avatar.png',
                    position: 'bottom', // 'top', 'left', 'bottom-left' etc.
                })
               
                }
              
                
            })
            .catch(err => {
                console.error(err); 
            })
        },
         update_employee_account(){
            let data = new FormData()
            data.append('employee_id' , this.instance_account.id)
            data.append('firstname' , this.instance_account.first_name)
            data.append('lastname',this.instance_account.last_name)
            data.append('email',this.instance_account.email)
            data.append('username',this.instance_account.username)
             axios.post(`${this.global_hostname}/update_user_employee/`, data,this.config)
            .then(res => {
                console.log(res)
                if (res.data.status == true) {
                          this.$q.notify({ //put dollor sign(q)
                     message: `Account Information Update Successfull!`,
                     timeout: 3000, // in milliseconds; 0 means no timeout
                    color: 'primary',
                    textColor: 'white', // if default 'white' doesn't fit
                    icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                    position: 'top', // 'top', 'left', 'bottom-left' etc.
                })
                this.get_users()
                }else{
                      this.$q.notify({ //put dollor sign(q)
                     message: `Error Please Try Again!`,
                     timeout: 3000, // in milliseconds; 0 means no timeout
                    color: 'red',
                    textColor: 'white', // if default 'white' doesn't fit
                    icon: 'error', //or  avatar: 'statics/boy-avatar.png',
                    position: 'bottom', // 'top', 'left', 'bottom-left' etc.
                })
               
                }
              
                
            })
            .catch(err => {
                console.error(err); 
            })
        },
    },
}
</script>
<style lang="scss" >
@import "../../../styles/_variables.scss";
.fields{
    padding : 5px
}
.expansion_style{
    color : $secondary;
   
    
    
}
</style>