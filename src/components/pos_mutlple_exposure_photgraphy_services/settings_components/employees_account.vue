<template>
    <div class="row" >
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 shadow-1" style="margin:auto; border-radius:  10px; padding:10px">
           
            <q-expansion-item
              expand-separator
              icon="perm_identity"
              label="Employees Account"
              style="text-align:left;"
              class="expansion_style"
               default-opened
            >
          
             <div class="row">
                 <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8" style="padding : 10px">
                     <q-btn  color="secondary"  @click="dialog_new_user_employee = true" style="margin-left : 20px" outline icon="add"  />
                 </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-for="(item,index) in gettters_employee" :key="index">
                            
                            <q-item dense class="employees_account_item" style="margin:10px">
                                <q-item-section top avatar>
                                    <q-avatar @click="event_edit_employee_information(item)"  color="primary" size="md" class="shadow-1" text-color="white" icon="edit" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label class="employeename">{{ item.first_name }} {{item.last_name}}</q-item-label>
                                       <q-item-label caption >
                                       {{item.email }}
                                    </q-item-label>
                                   
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label caption>Joined</q-item-label>
                                    <q-item-label caption >{{ new Date(item.date_joined).toString().substr(0,15) }}</q-item-label>
                                </q-item-section>
                            </q-item>
                    </div>
             </div>
            </q-expansion-item>
        </div>
        <q-dialog v-model="dialog_new_user_employee" persistent>
            <q-card style="width: 100%;">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
                    Create Employee Account
                </div>
                
                <q-card-section>
                   <q-input style="margin-bottom : 5px" v-model="model_firstname" type="text" label="First Name" />
                   <q-input style="margin-bottom : 5px" v-model="model_lastname" type="text" label="Last Name" />
                   <q-input style="margin-bottom : 5px" v-model="model_email" type="text" label="Email" />
                    <q-input style="margin-bottom : 5px" v-model="model_username" type="text" label="Username" />
                     <q-input style="margin-bottom : 5px" v-model="model_password" type="text" label="Password" />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="close" color="grey" v-close-popup />
                    <q-btn  label="save" outline color="secondary" @click="create_employee_account" />
                </q-card-actions>
            </q-card>
        </q-dialog>

         <q-dialog v-model="dialog_edit_employee_information" persistent>
            <q-card style="width: 100%;">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
                    Edit Employee Account
                </div>
                
               
                <q-tabs
                    v-model="tab"
                    class="text-secondary"
                >
                    <q-tab name="accountInformation" icon="mail" label="Account Information" />
                    <q-tab name="AccessControl" icon="alarm" label="Access Level" />
                    
                </q-tabs>
                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="accountInformation">
                       
                       
                                    <q-card-section>
                                                    <q-input style="margin-bottom : 5px" v-model="edit_employee_information.first_name" type="text" label="First Name" />
                                                    <q-input style="margin-bottom : 5px" v-model="edit_employee_information.last_name" type="text" label="Last Name" />
                                                    <q-input style="margin-bottom : 5px" v-model="edit_employee_information.email" type="text" label="Email" />
                                                        <q-input style="margin-bottom : 5px" v-model="edit_employee_information.username" type="text" label="Username" />
                                                    <q-btn-group>
                                                        <q-btn  label="Save Changes" outline color="secondary" @click="update_employee_account" />
                                                    
                                                        <q-btn color="grey"  outline  label="Change Password" @click="dialog_change_password = true" />
                                                        <q-btn flat label="Delete Account" @click="delete_account(edit_employee_information.id)" color="grey"  />
                                                       
                                                    </q-btn-group>
                                                    
                            
                                    </q-card-section>


                    </q-tab-panel>
                    <q-tab-panel name="AccessControl">
                      
                       <accessLevel  />
                    </q-tab-panel>
                 
                </q-tab-panels>
                <q-card-actions align="right">
                  
                   <q-btn flat label="close" color="grey" v-close-popup />
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
                    <q-btn flat label="Cancel" color="grey" v-close-popup />
                    <q-btn flat label="Save Changes" @click="change_password" color="primary"  />
                </q-card-actions>
            </q-card>
        </q-dialog>


    </div>
</template>
<script>
import accessLevel from './access_level_control.vue'



import { mapState } from 'vuex';

import axios from "axios";
import { mapActions } from 'vuex';

import { mapGetters } from 'vuex';

import { mapMutations } from 'vuex';



export default {
    name: "EmployeesAccount",
    components:{
    accessLevel,
},
    data() {
        return {
            tab : 'accountInformation',
            dialog_change_password : false,
            model_firstname : '',
            model_lastname : '',
            model_email : '',
            model_username : '',
            model_password : '',
            dialog_new_user_employee: false,
            dialog_edit_employee_information : false,
            edit_employee_information : {},
            model_new_password : '',
        }
    },
    computed: {
        ...mapState([
            'usersList',
            'global_hostname',
            'modules_properties',
            'config'

        ]),
        ...mapGetters([
            'gettters_employee',
        ])
 
    },
    methods: {
          ...mapActions([
            'get_users', //also supports payload `this.nameOfAction(amount)` 
            'actions_get_access_level'
        ]),
         ...mapMutations([
            'mutate_access_level_instance', //also supports payload `this.nameOfMutation(amount)` 
        ]),

        delete_account(id){
                
            this.$q.dialog({
                title: 'Confirm',
                message: 'Would you like to delete this account?',
                cancel: true,
                persistent: true
                }).onOk(() => {
                    axios.delete(`${this.global_hostname}/api/user/${id}/`,this.config)
                    .then(res => {
                        console.log(res)
                                 this.$q.notify({ //put dollor sign(q)
                     message: `Delete Account Successfull`,
                     timeout: 3000, // in milliseconds; 0 means no timeout
                    color: 'primary',
                    textColor: 'white', // if default 'white' doesn't fit
                    icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                    position: 'top', // 'top', 'left', 'bottom-left' etc.
                })
                this.get_users()
                this.dialog_edit_employee_information = false,
                 this.dialog_change_password = false
                    })
                    .catch(err => {
                        console.error(err); 
                                 this.$q.notify({ //put dollor sign(q)
                     message: `Error!`,
                     timeout: 3000, // in milliseconds; 0 means no timeout
                    color: 'red',
                    textColor: 'white', // if default 'white' doesn't fit
                    icon: 'error', //or  avatar: 'statics/boy-avatar.png',
                    position: 'bottom', // 'top', 'left', 'bottom-left' etc.
                })
                
                    })
                }).onOk(() => {
                 }).onCancel(() => {
                 }).onDismiss(() => {
            })
            
        },
        change_password(){
          
          if (this.model_new_password.length <= 0) {
                alert('Password must not be Empty')
                return
          }
            let data = new FormData()
            data.append('employee_id' , this.edit_employee_information.id)
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
            data.append('employee_id' , this.edit_employee_information.id)
            data.append('firstname' , this.edit_employee_information.first_name)
            data.append('lastname',this.edit_employee_information.last_name)
            data.append('email',this.edit_employee_information.email)
            data.append('username',this.edit_employee_information.username)
             axios.post(`${this.global_hostname}/update_user_employee/`, data,this.config)
            .then(res => {
                console.log(res)
                if (res.data.status == true) {
                          this.$q.notify({ //put dollor sign(q)
                     message: `Employee Account Successfully Updated!`,
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
        event_edit_employee_information(item){
                this.edit_employee_information = item
                this.mutate_access_level_instance(item)
                this.dialog_edit_employee_information  = true
        },
        post_function(payload){
            
            axios.post(`${this.global_hostname}/api/AccessLevel/`,payload,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
        },
        event_access_level_instance(id){
           
            for (let index = 0; index < this.modules_properties.length; index++) {
                const element = this.modules_properties[index];
                 var payload = 
                            {
                           
                            "users_instance": `${this.global_hostname}/api/user/${id}/`,
                            "moduleName": element.name,
                            "view": element.view,
                            "edit": element.edit,
                            "add": element.add,
                            "delete": element.delete,
                            "printInformation": element.print,
                           
                        }
                        console.log('access')
                        console.log(payload)
                         this.post_function(payload)
                        if (index == this.modules_properties.length - 1) {
                            
                                this.$q.notify({ //put dollor sign(q)
                                     message: `Employee Access Level Successfully Save!`,
                                     timeout: 3000, // in milliseconds; 0 means no timeout
                                    color: 'primary',
                                    textColor: 'white', // if default 'white' doesn't fit
                                    icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                                    position: 'top-right', // 'top', 'left', 'bottom-left' etc.
                                })
                                setTimeout(() => {
                                    this.get_users()
                                    this.actions_get_access_level()
                                }, 1000);
                                
                        }

                
            }
            
        },
        create_employee_account(){
            let data = new FormData()
            data.append('firstname' , this.model_firstname)
            data.append('lastname',this.model_lastname)
            data.append('email',this.model_email)
            data.append('username',this.model_username)
            data.append('password',this.model_password)
            axios.post(`${this.global_hostname}/create_user_employee/`, data,this.config)
            .then(res => {
                
                console.log(res)
                if (res.data.status == true) {
                    this.event_access_level_instance(res.data.id)
                          this.$q.notify({ //put dollor sign(q)
                     message: `New Employee Account Successfully Save!`,
                     timeout: 3000, // in milliseconds; 0 means no timeout
                    color: 'primary',
                    textColor: 'white', // if default 'white' doesn't fit
                    icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                    position: 'top', // 'top', 'left', 'bottom-left' etc.
                })
               
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
    color : $secondary
}
.employees_account_item{cursor: pointer;}
.employeename{
    color: $text_primary;
    font-weight: 800;
}
</style>