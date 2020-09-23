<template>
    <div class="row " >
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 shadow-1" style="margin:auto; border-radius:  10px; padding:10px">
            
            <q-expansion-item
              expand-separator
              icon="perm_identity"
              label="Company Information"
              style="text-align:left;"
              class="expansion_style"
               default-opened
            >
            
             <div class="row" >
                   <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" style="padding:20px">
                       <q-input :readonly="edit_field" v-model="companyInformation[0].companyName" type="text" label="Company Name" />
                        <q-input :readonly="edit_field"  v-model="companyInformation[0].address" type="text" label="Address" />
                       <q-input :readonly="edit_field" v-model="companyInformation[0].aboutCompany"  type="textarea" label="About Company" />
                      <div style="margin-top:10px">
                           <q-btn v-if="toggle_btn_companyInformation == true" @click="edit_info" color="secondary" outline icon="edit"   />
                        <q-btn v-if="toggle_btn_companyInformation == false" @click="update_info" color="primary" outline label="Update"    />
                      </div>
                   </div>
                   <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" style="padding:10px;  margin: auto;text-align:center;">
                      <img
                          :src="companyInformation[0].image"
                         style="max-height : 200px ;max-width : 200px ; margin: auto"
                      />
                    

                      <uploadComponent />
   
                      
                   </div>
             </div>
            </q-expansion-item>
        </div>
    </div>
</template>
<script>
import uploadComponent from '../myusefull_components/uploader_component.vue'
import { mapState } from 'vuex';

import { mapActions } from 'vuex';

import axios from "axios";

export default {
    name: "EmployeesAccount",
    components:{
    uploadComponent,
},
data() {
    return {
        toggle_btn_companyInformation : true,
        edit_field : true,
    }
},
computed: {
        ...mapState([
            'companyInformation',
            'global_hostname',
            'config'
        ]),
          
    },
    methods: {
         ...mapActions([
            'get_companyInformation', //also supports payload `this.nameOfAction(amount)` 
            'action_getImages'
        ]),
        update_info(){
            this.toggle_btn_companyInformation = true
            this.edit_field = true
             var payload = {
                 "companyName": this.companyInformation[0].companyName,
                    "aboutCompany": this.companyInformation[0].aboutCompany,
                    "logo": this.companyInformation[0].logo,
                    "address": this.companyInformation[0].address,
            }
            axios.put(`${this.global_hostname}/api/CompanyInformation/1/`,payload,this.config)
                .then(res => {
                    console.log(res)
                    this.action_getImages()
                  
                    this.$q.loading.show({ 'message' : 'Updating...'})
                   
                    
                    setTimeout(() => {
                        
                       
                        this.$q.loading.hide()
                    }, 2000);
                })
                .catch(err => {
                    console.error(err); 
                })



        },
        edit_info(){
            this.toggle_btn_companyInformation = false
            this.edit_field = false
            this.$q.notify({ //put dollor sign(q)
                 message: `You can now edit the Company Information!`,
                 timeout: 3000, // in milliseconds; 0 means no timeout
                color: 'primary',
                textColor: 'white', // if default 'white' doesn't fit
                icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                position: 'bottom', // 'top', 'left', 'bottom-left' etc.
            })
            
        },
         upload(files){
                 let data = new FormData();
                data.append('image',files[0]);
               
                this.$q.dialog({
                    title: 'Confirm',
                    message: 'Are you sure to change the current image?',
                    cancel: true,
                    persistent: true
                    }).onOk(() => {
                        alert('success')
                    }).onOk(() => {
                     }).onCancel(() => {
                     }).onDismiss(() => {
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