<template>
   <div class="row" >
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 shadow-1" style="margin:auto; border-radius:  10px; padding:10px">
           
         
             <div class="row">

                 <table class="table_access_level">
                     <thead>
                         <tr>
                                <th>Module Name</th>
                                <th>View</th>
                                <th>Edit</th>
                                <th>Add</th>
                                <th>Delete</th>
                                <th>Print</th>
                     </tr>
                     </thead>
                     <tbody>
                         <tr v-for="(item,index) in instanceUserAccessLevel.accessLevel" :key="index">
                             <td>{{item.moduleName}}</td>
                             <td>
                                 <q-checkbox left-label v-model="item.view"  />
                             </td>
                             <td>
                                  <q-checkbox left-label v-model="item.edit"  />
                             </td>
                             <td>

                                
                                 <q-checkbox left-label v-model="item.add"  />
                             </td>
                             <td>
                                 <q-checkbox left-label v-model="item.delete"  />
                             </td>
                             <td>
                                     <q-checkbox left-label v-model="item.printInformation"  />
                             </td>
                         </tr>
                     </tbody>
                 </table>
                 <q-btn color="secondary" @click="update_instance_employee_access_level(instanceUserAccessLevel.accessLevel)" outline  label="Save Change"  />
                    
             </div>
         
        </div>
        <q-dialog v-model="dialog_edit_module" persistent>
            <q-card>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
               Edit Module
                </div>
                
                <q-card-section class="row items-center">
                   
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
      

    </div>
</template>
<script>
import { mapState } from 'vuex';
import axios from "axios";
import { mapActions } from 'vuex';



export default {
    name: "access_level",
     computed: {
        ...mapState([
            'modules_properties',
            'instanceUserAccessLevel',
            'global_hostname',
            'config'
        ])
    },
    data() {
        return {
           dialog_edit_module : false
        }
    },
    methods: {
         ...mapActions([
            'actions_get_access_level', //also supports payload `this.nameOfAction(amount)` 
        ]),
        event_edit_module(item) {
                console.log(item)
                this.dialog_edit_module = true
        },
        send_post(payload){
            axios.put(`${payload.url}`,payload,this.config)
            .then(res => {
                console.log(res)
                this.$q.notify({ //put dollor sign(q)
                     message: `Access Level Successfully Updated!`,
                     timeout: 3000, // in milliseconds; 0 means no timeout
                    color: 'green',
                    textColor: 'white', // if default 'white' doesn't fit
                    icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                    position: 'top-right', // 'top', 'left', 'bottom-left' etc.
                })
                this.actions_get_access_level()
                
            })
            .catch(err => {
                console.error(err); 
            })
        },
        update_instance_employee_access_level(items){
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                this.send_post(element)

            }

        },
    },
}
</script>
<style lang="scss" >
.table_access_level{
    font-size: 15px;
}
</style>