<template>
     <div>
     
        <div class="row">
            
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 animate__animated animate__fadeIn " style="margin:auto">
                
            <q-table title="Pending List" :rows-per-page-options="[0]" style="border-radius: 10px" :filter="filter"  class="animate__animated animate__fadeIn shadow-1"    :data="getters_pending" :columns="pending_column" row-key="id">
             <template v-slot:top-right>
                 <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                       <template v-slot:append>
                             <q-icon name="search" />
                      </template>
                  </q-input>
              </template>
             <template v-slot:body="props">
                 <q-tr  :props="props" style="cursor :pointer ;">
                   
                      <q-td auto-width>
                        <span>
                                <q-tooltip >
                                    Expand Row
                                </q-tooltip>
                             <q-btn size="sm" color="primary" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'visibility_off' : 'visibility'" />
                        </span>
                            <span>
                               <q-tooltip>
                                  Set Status to Cancel Order
                               </q-tooltip>
                                 <q-btn color="red" size="sm" @click="event_cancel_order(props.row.id)" style="margin-left:10px" dense icon="delete"  rounded  />
                            </span>
                           <span>
                               <q-tooltip>
                                  Set Status to Claimed
                               </q-tooltip>
                                <q-btn color="green" size="sm" @click="event_set_to_claimed(props.row)" style="margin-left:10px" dense  icon="check"  />
                           </span>
                           <span>
                               <q-tooltip>
                                  Edit Information
                               </q-tooltip>
                                <q-btn color="secondary" size="sm" @click="event_edit_information(props.row)" style="margin-left:10px" dense  icon="edit"  />
                           </span>
                    </q-td>
                     <q-td key="customer" :props="props">
                             {{ props.row.customer }}
                     </q-td> 
                     <q-td key="address" :props="props">
                             {{ props.row.address }}
                     </q-td> 
                     <q-td key="contactNumber" :props="props">
                             {{ props.row.contactNumber }}
                     </q-td> 
                      <q-td key="totalAmountOrder" :props="props">
                            <q-badge color="secondary" text-color="white" :label="props.row.totalAmountOrder" />
                     </q-td> 
                      <q-td key="deposit" :props="props">
                           
                               <q-badge color="primary" text-color="white" :label="props.row.deposit" />
                     </q-td> 
                      <q-td key="balance" :props="props">
                            <q-badge color="green" v-if="props.row.balance == 0" text-color="white" label="paid" />
                            <q-badge v-else color="red" text-color="white" :label="props.row.balance" />
                     </q-td>
                       <q-td key="date_due" :props="props">
                             {{ props.row.date_due }}
                     </q-td>
                       <q-td key="preparedBy" :props="props">
                             {{ props.row.preparedBy }}
                     </q-td>
                        <q-td key="date_created" :props="props">
                             {{ props.row.date_created }}
                     </q-td>
                 </q-tr>
                 <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                        <div class="row">
                            <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8 shadow-1"  style="margin:auto ;border-radius:  10px;">
                                   
                                   <table>
                                        <thead>
                                            <tr>
                                                <td>Action</td>
                                                <td>Product Name | Item</td>
                                                 <td>Price</td>
                                                  <td>Quantity</td>
                                                   <td>Total Price</td>
                                                   
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item,index) in props.row.customerListOrder" :key="index">
                                                <td>
                                                    <q-tooltip>
                                                        Remove Item
                                                    </q-tooltip>
                                                    <q-btn color="secondary" size="sm" dense rounded icon="close"  />
                                                </td>
                                                 <td> <q-badge color="primary" text-color="white" :label="item.product" /> </td>
                                                  <td> {{item.price}} </td>
                                                   <td> {{item.quantity}} </td>
                                                    <td>  <q-badge color="secondary" text-color="white" :label="item.totalAmmount" /></td>
                                            </tr>
                                        </tbody>

                                   </table>
                                        
                                   
                            </div>
                        </div>
                      
                    </q-td>
                 </q-tr>
              </template>
         </q-table>
        
            </div>
        </div>

        <q-dialog v-model="dialog_pending" persistent>
                 <q-card style="padding : 20px ; width : 500px">
                     <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
                     New Pending
                     </div>
                   
                     <q-card-section >
                        <q-input v-model="model_customer" style="margin-bottom : 5px" type="text" label="Enter Customer Name" />
                        <q-input v-model="model_address" style="margin-bottom : 5px" type="text" label="Address" />
                        <q-input hint="09XXXXXXXXX (11-digits)" mask="###########" v-model="model_contactnumber"  min="1" max="11" style="margin-bottom : 5px" type="text" label="Contact Number" />
                        <q-input readonly v-model="model_total" style="margin-bottom : 5px" type="number"  label="Total" />
                        <div class="row" style="padding : 10px ;margin:auto; " >
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin:auto;">
                            <q-radio @input="event_choose_deposit" v-model="deposit_or_fullypaid" val="deposit" label="Deposit" />
                            <q-radio   @input="event_choose_paid"   v-model="deposit_or_fullypaid" val="fullpaid" label="Full Paid" />
                          
                           
                            
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" v-if="deposit_or_fullypaid == 'deposit'">
                              <q-input v-model="model_deposit" hint="" style="margin-bottom : 5px" type="number" mask="********" min="1" max="9999" label="Enter Ammount Deposit" />
                          </div>
                        </div>
                        
                       
                        <q-input  readonly v-model="computed_balance" style="margin-bottom : 5px" type="number"  label="Balance">
                           <template v-slot:append>
                                <q-circular-progress
                                style="margin-left:10px"
                                indeterminate
                                v-if="circular_loading == true"
                               
                            />
                           </template>
                        </q-input>

                        
                            
                        
                        <q-input  label="Start Date" v-model="model_due_date" mask="date" :rules="['date']">
                            <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                              <q-date v-model="model_due_date">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                              </q-date>
                              </q-popup-proxy>
                              </q-icon>
                            </template>
                        </q-input>
                      
                     </q-card-section>
                     <q-card-actions align="right">
                         <q-btn flat label="Cancel" color="grey" v-close-popup />
                         <!-- dito -->
                         <q-btn  @click="update_information_customer_order(update_id)" label="Submit" color="primary"  />
                     </q-card-actions>
                 </q-card>
             </q-dialog>

         
        
     </div>

</template>
<script>


import { mapGetters } from 'vuex';
import axios from "axios";

import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';



export default {
    name: "pendingTable",
    computed: {
        ...mapGetters([
            'getters_pending',
        ]),
          ...mapState([
            'global_hostname',
            'instance'
        ]),
         computed_balance (){
            var total = 0
            if (this.model_deposit <= 0  || this.model_deposit <= 0.00 | this.model_deposit.length <= 0) {
                total = 0
            }else{
                total = this.model_total - this.model_deposit
            }
            return total
         }
    },
    data() {
        return {
                circular_loading : false,
              deposit_or_fullypaid : 'deposit',
              update_id : 0,
                dialog_pending : false,
                payload_to_update : {},
                model_due_date : '',
                model_customer : '',
                model_address : '',
                model_contactnumber : '',
                temp_deposit : 0,
                
                model_deposit : '',
                model_total : '',
           pending_add_not : false,
           selected : [],
    filter : '',
    pending_column: [
        { name: "id", label: "Actions | Updated Status", field: "id" ,sortable: true,  align: "right"},
        { name: "customer", label: "Customer", field: "customer" ,sortable: true,  },
      
        { name: "address", label: "Address", field: "address" ,sortable: true,  },
         { name: "contactNumber", label: "ContactNumber", field: "contactNumber" ,sortable: true,  },
          { name: "totalAmountOrder", label: "Total Ammount", field: "totalAmountOrder" ,sortable: true, align: "right" },
            { name: "deposit", label: "Deposit", field: "deposit" ,sortable: true, align: "right" },
             { name: "balance", label: "Balance", field: "balance" ,sortable: true, align: "right" },     
           { name: "date_due", label: "Due Date", field: "date_due" ,sortable: true, align: "right" },       
          { name: "preparedBy", label: "Prepared By", field: "preparedBy" ,sortable: true,  },
           { name: "date_created", label: "Date Created", field: "date_created" ,sortable: true,  },
        
        ],
    pengindata : [
        {
        "url": "http://192.168.100.106:4000/api/customer/36/",
        "id": 36,
        "customer": null,
        "date_due": null,
        "pending" : false,
        "balance": "0.00",
        "deposit": "0.00",
        "address": null,
        "contactNumber": null,
        "images": null,
        "preparedBy": "Brylle",
        "totalAmountOrder": "100.00",
        "date_created": "2020-08-30T02:39:44.366126Z",
        "date_updated": "2020-08-30T02:39:44.366126Z"
    },
     {
        "url": "http://192.168.100.106:4000/api/customer/36/",
        "id": 3,
        "customer": null,
        "date_due": null,
        "pending" : false,
        "balance": "0.00",
        "deposit": "0.00",
        "address": null,
        "contactNumber": null,
        "images": null,
        "preparedBy": "Brylle",
        "totalAmountOrder": "100.00",
        "date_created": "2020-08-30T02:39:44.366126Z",
        "date_updated": "2020-08-30T02:39:44.366126Z"
    },
    ],
    

        }
    },
    methods : {
          ...mapMutations([
      "mutate_subtotal", //also supports payload `this.nameOfMutation(amount)`
      "mutate_empty_customer_order",
      'mutate_reciept_information',
      'mutate_clear_order'
    ]),
     ...mapActions([
      "action_getCategory", //also supports payload `this.nameOfAction(amount)`
      "action_getProduct",
      "action_view_products",
      "action_getImages",
      "action_get_orders",
      "action_get_expenses",
      "action_get_expenses_items",
       'action_get_supplies',
      'action_get_suppliesItems',
      'action_get_customer'

    ]),
    event_choose_paid() {
        this.circular_loading = true
         setTimeout(() => {
           this.model_deposit = this.model_total 
           this.circular_loading = false
          
     }, 1000);

       
      
    },
     event_choose_deposit() {
    this.circular_loading = true
        setTimeout(() => {
            this.model_deposit =  this.temp_deposit
            this.circular_loading = false
        }, 1000);

    },
     update_information_customer_order(update_id){


        
    
                  var payload = {
                            "pending": true,
                  "customer": this.model_customer,
                  "date_due": this.model_due_date,
                  "balance": this.computed_balance,
                  "deposit": this.model_deposit,
                  "address": this.model_address,
                  "contactNumber":this.model_contactnumber,
                  "images": null,
                  "preparedBy": this.instance[0].first_name,
                  "totalAmountOrder": this.model_total,


              }

           

               
                axios.put(`${this.global_hostname}/api/customer/${update_id}/`,payload)
                .then(res => {
                    console.log(res)
                     this.$q.notify({ //put dollor sign(q)
                                     message: `Pending Information Successfully Updated!`,
                                     timeout: 3000, // in milliseconds; 0 means no timeout
                                    color: 'primary',
                                    textColor: 'white', // if default 'white' doesn't fit
                                    icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                                    position: 'top', // 'top', 'left', 'bottom-left' etc.
                                })
                                this.dialog_pending = false
                                
                this.action_get_customer()
                    this.action_getCategory();
                    this.action_getProduct();
                    this.action_getImages();
                
                    this.action_get_expenses()
                    this.action_get_expenses_items()
                    this.action_get_supplies()
                    this.action_get_suppliesItems()
                    this.mutate_clear_order()

                })
                .catch(err => {
                    console.error(err); 
                })
           
        
        

    },
           
    event_edit_information(item){

               
                this.payload_to_update = item
                this.model_due_date = item.date_due
                this.model_customer =item.customer
                this.model_address = item.address
                this.model_contactnumber = item.contactNumber
                this.model_deposit = item.deposit
                this.temp_deposit = item.deposit
                this.model_total = item.totalAmountOrder
                this.update_id = item.id
                 this.dialog_pending = true

    },
    event_set_to_claimed(item){
    
        this.$q.dialog({
            title: 'Confirm - Customer order will set to claimed. Click OK Button to removed the pending list',
            message: 'Would you like to continue?',
            cancel: true,
            persistent: true
            }).onOk(() => {
                var payload = item
                payload.pending = false
                axios.put(`${this.global_hostname}/api/customer/${payload.id}/`,payload)
                .then(res => {
                    console.log(res)
                     this.$q.notify({ //put dollor sign(q)
                                     message: `Set to claimed Successfull!`,
                                     timeout: 3000, // in milliseconds; 0 means no timeout
                                    color: 'primary',
                                    textColor: 'white', // if default 'white' doesn't fit
                                    icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                                    position: 'top', // 'top', 'left', 'bottom-left' etc.
                                })
                                
                this.action_get_customer()
                    this.action_getCategory();
                    this.action_getProduct();
                    this.action_getImages();
                
                    this.action_get_expenses()
                    this.action_get_expenses_items()
                    this.action_get_supplies()
                    this.action_get_suppliesItems()
                    this.mutate_clear_order()

                })
                .catch(err => {
                    console.error(err); 
                })
            }).onOk(() => {
             }).onCancel(() => {
             }).onDismiss(() => {
        })
        

    },
            event_cancel_order(id){
                    
                  
                    this.$q.dialog({
                        title: 'Confirm-Customer Cancel the Order. Click ok button to removed the pending list',
                        message: 'Are you sure would you like to remove this file?',
                        cancel: true,
                        persistent: true
                        }).onOk(() => {
                            axios.delete(`${this.global_hostname}/api/customer/${id}/`,)
                            .then(res => {
                                console.log(res)
                                this.$q.notify({ //put dollor sign(q)
                                     message: `Successfully Delete!`,
                                     timeout: 3000, // in milliseconds; 0 means no timeout
                                    color: 'primary',
                                    textColor: 'white', // if default 'white' doesn't fit
                                    icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                                    position: 'top', // 'top', 'left', 'bottom-left' etc.
                                })
                                
                                    this.action_get_customer()
    this.action_getCategory();
    this.action_getProduct();
    this.action_getImages();
    this.action_get_expenses()
     this.action_get_expenses_items()
      this.action_get_supplies()
      this.action_get_suppliesItems()
    this.mutate_clear_order()
                            })
                            .catch(err => {
                                console.error(err); 
                                this.$q.notify({ //put dollor sign(q)
                                     message: `error!`,
                                     timeout: 3000, // in milliseconds; 0 means no timeout
                                    color: 'red',
                                    textColor: 'white', // if default 'white' doesn't fit
                                    icon: 'error', //or  avatar: 'statics/boy-avatar.png',
                                    position: 'top-right', // 'top', 'left', 'bottom-left' etc.
                                })
                            })

                        }).onOk(() => {
                         }).onCancel(() => {
                         }).onDismiss(() => {
                    })
                    
            }
    }
    
}
</script>
<style lang="scss" >

</style>