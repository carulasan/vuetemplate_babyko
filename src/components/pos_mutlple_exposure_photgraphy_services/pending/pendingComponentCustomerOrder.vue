<template>
  <div class="row" >
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 "  >
     
    <img

    class="logo_there_is_no_order animate__animated animate__fadeIn"
      :src="global_hostname + '/wilmarMediaFiles/MediaFiles/thereisnoitem.jpg'"
      :ratio="16/9"
      spinner-color="primary"
      spinner-size="82px"
       v-if="customerOrder.length <=0"
    />
      <q-item  v-if="customerOrder.length > 0" class="animate__animated animate__fadeLeft">
        <q-item-section top avatar>{{ new Date().toString().substring(0,15)}}</q-item-section>
        <q-item-section></q-item-section>
        <q-item-section side top>{{ new Date().toString().substring(16,21)}}</q-item-section>
      </q-item>

      <table v-if="customerOrder.length > 0" class="animate__animated animate__fadeInUp" >

        <tr>
          <th></th>
          <th>Qty</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Amount</th>
        </tr>
        <tr class="animate__animated animate__fadeInUp" v-for="(item,index) in customerOrder" :key="index">
          <td>
            <q-btn
              color="grey"
              flat
              size="sm"
              @click="remove_item(index)"
              rounded
              dense
              icon="delete"
            />
          </td>
          <td style="margin:auto;">
            
            
        
            <input disabled style="width : 80px ; margin: auto; font-size : 13px" min="1" :value="item.quantity"  type="number"  />  
            <br>
            <div style="margin:auto;">
            
               <q-btn
                      color="secondary"
                      size="sm"
                      @click="decrement(item)"
                      rounded
                      dense
                      icon="remove"
                      style="margin:auto;"
                    />
               <q-btn color="primary"  size="sm" style="margin-left:5px;" @click="increment(item)" rounded dense icon="add" />
               <q-btn color="black"  size="sm" style="margin-left:5px;" @click="event_modify_quantity(item)" rounded dense icon="edit" />
            </div>
               
          
            
            
          </td>
          <td>{{ item.productName }}</td>
          <td>
           
        
             {{ item.price }}
          </td>
          <td>{{ item.totalAmmount }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>SubTotal</td>
          <td class="animate__animated animate__fadeIn" style="font-weight: 700;font-size:18px">&#8369; {{ customer_subtotal_order }}</td>
          
        </tr>
       
      </table>
       <div class="animate__animated animate__fadeInUp" v-if="customerOrder.length > 0" style="padding:20px ;  width:100% ;">
         <!-- dito -->
          <q-btn color="secondary"  @click="dialog_pending = true" style="width : 100% ;" size="lg"   label="Save Pending"  />
          
        </div>

    </div>
  
    
    <printable id="print"/>

    <q-dialog v-model="dialog_preparedby" persistent>
      <q-card style="width : 1050px">
          <div class="prep">Prepared By </div>
          <div class="selec"><small>Please select atleast one</small></div>
          <div class="row" style="padding : 5px">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" :key="index" v-for="(item,index) in prepared_by">
            <q-btn color="secondary" icon="person"  style="width : 100%" :label="item" outline @click="event_save_order(item)" />
            </div>
          </div>
       
        <q-card-actions align="right">
          <q-btn flat label="close"   color="grey" v-close-popup />
         
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog_print_reciept" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="print" color="primary" text-color="white" />
          <span class="q-ml-sm">Do you want print reciept?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="later" color="grey" v-close-popup />
          <q-btn outline label="yes" @click="event_print" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="dialog_pending" persistent>
                 <q-card style="padding : 20px ; width : 500px">
                     <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
                     New Pending
                     </div>
                   
                     <q-card-section >
                        <q-input v-model="model_customer" style="margin-bottom : 5px" type="text" label="Enter Customer Name" />
                        <q-input v-model="model_address" style="margin-bottom : 5px" type="text" label="Address" />
                        <q-input hint="09XXXXXXXXX (11-digits)" mask="###########" v-model="model_contactnumber"  min="1" max="11" style="margin-bottom : 5px" type="text" label="Contact Number" />
                        <q-input readonly v-model="customer_subtotal_order" style="margin-bottom : 5px" type="number"  label="Total" />
                        <div class="row" style="padding : 10px ;margin:auto; " >
                          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin:auto;">
                            <q-radio  @input="event_choose_deposit" v-model="deposit_or_fullypaid" val="deposit" label="Deposit" />
                            <q-radio  @input="event_choose_paid" v-model="deposit_or_fullypaid" val="fullpaid" label="Full Paid" />
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
                         <q-btn  @click="event_save_order" label="Submit" color="primary"  />
                     </q-card-actions>
                 </q-card>
             </q-dialog>

   
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import axios from "axios";
import { mapActions } from 'vuex';



import printable from "../printable_customer_order.vue";
export default {
  name: "pendingComponentCustomerOrder",
   components: {
    printable,
   
  },
  data() {
    return {
      deposit_or_fullypaid : 'deposit',
      dialog_pending : false,
      model_due_date : '',
      model_customer : '',
      model_address : '',
      model_contactnumber : '',
      
      model_deposit : '',
      model_total : '',
      
      dialog_print_reciept : false,
      model_quantity : 0,
    
      dialog_preparedby : false,
      circular_loading : false,
      
    
      columns: [
        { name: "id", label: "Action", field: "id" },
        {
          name: "name",
          required: true,
          label: "Product Name",
          align: "left",
          field: (row) => row.product,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "quantity",
          align: "center",
          label: "Qty",
          field: "quantity",
          sortable: true,
        },
        { name: "price", label: "Price", field: "price", sortable: true },
        { name: "totalAmmount", label: "Total Amount", field: "totalAmmount" },
      ],
      temp_item_customer_order : {}
    };
  },
  methods: {
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
      'action_get_customer',
      'actions_save_user_log'

    ]),

     event_choose_paid() {
        this.circular_loading = true
         setTimeout(() => {
          this.model_deposit = this.customer_subtotal_order
           this.circular_loading = false
          
     }, 1000);

       
      
    },
     event_choose_deposit() {
        this.circular_loading = true
        this.model_deposit = 0
         setTimeout(() => {
          
           this.circular_loading = false
          
     }, 1000);

       
      
    },
   
   event_print(){
 popup()
      function popup() {
         var divToPrint = document.getElementById('print');
        var popupWin = window.open('', '_blank', 'width=400,height=600');
        popupWin.document.open();
        popupWin.document.write("<html><head><link rel='stylesheet'  href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css' /> <style> table{  font-family: 'Montserrat', sans-serif; }</style> </head><body onload='window.print()'>" + divToPrint.innerHTML + '</html>');
        popupWin.document.close();
  

    }

   },
    event_modify_quantity(item){
    
      this.model_quantity = item.quantity
      var temp_quantity = prompt('Please Input Quantity :' , this.model_quantity)
      if (temp_quantity.length < 0) {
          return
      }else{
        if (isNaN(parseInt(temp_quantity)) || parseInt(temp_quantity) <= 0) {
            alert('Enter a whole real number and not be less than zero!')
            return
        }else{

           item.quantity = temp_quantity
          item.totalAmmount = parseFloat(item.price) * parseInt(item.quantity);
          this.mutate_subtotal();


        }
      }
      
    },
    ...mapActions([
      'action_get_orders', //also supports payload `this.nameOfAction(amount)` 
    ]),

    save_orders_loops(payload){
        axios.post(`${this.global_hostname}/api/orders/`,payload,this.config)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err); 
        })
    },
    save_orders(instance_id){
          var order_object = this.customerOrder
          for (let index = 0; index < order_object.length; index++) {
            const element = order_object[index];
            console.log('loop object')
            console.log(element)
            var payload = {
                "customerOrder": `${this.global_hostname}/api/customer/${instance_id}/`,
              "product": element.productName,
              "quantity": parseInt(element.quantity),
              "price": parseFloat(element.price),
              "totalAmmount": parseFloat(element.totalAmmount),

            }
               
            this.save_orders_loops(payload)
            if (index == order_object.length - 1) {
                
                          this.action_get_customer()
    this.action_getCategory();
    this.action_getProduct();
    this.action_getImages();
    this.action_get_orders()
    this.action_get_expenses()
     this.action_get_expenses_items()
      this.action_get_supplies()
      this.action_get_suppliesItems()
    this.mutate_clear_order()
  this.dialog_pending = false
                this.$q.notify({ //put dollor sign(q)
                   message: `Pending Successfully Save!`,
                   timeout: 5000, // in milliseconds; 0 means no timeout
                  color: 'orange',
                  textColor: 'white', // if default 'white' doesn't fit
                  icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                  position: 'top', // 'top', 'left', 'bottom-left' etc.
                })
                this.dialog_preparedby = false

                this.customerOrder = []
           

                  this.dialog_print_reciept = true
     

                
            }

            
          }
    },
    event_save_order(){
          
          if (this.model_customer.length <= 0) {
              alert('Please Enter Customer Name!')
              return
          }
           if (this.model_contactnumber <= 0 || this.model_contactnumber < 11 ) {
              alert('Please Enter Customer Contact Number!')
              return
          }
          if (this.deposit_or_fullypaid == 'deposit') {
             if (this.model_deposit.length <= 0) {

                alert('Please Enter Customer Deposit!')
                return
             }
  

          }else{
            this.model_deposit = this.customer_subtotal_order
          }
          if (this.model_due_date.length <= 0 ) {
              alert('Please Enter Customer Due Date!')
              return
          }
         
          
          // dito
          this.$q.dialog({
            title: 'Confirm',
            message: `Customer Order Prepared by : ${this.instance[0].first_name}`,
            cancel: true,
            persistent: true
            }).onOk(() => {
             
              this.$q.loading.show({'message' : 'Please Wait...'})
           
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
                  "totalAmountOrder": this.customer_subtotal_order,


              }
           

           var create_logs = {
                 "userInstance": `${this.global_hostname}/api/user/${this.instance[0].id}/`,
              "description": `${this.instance[0].first_name} saved customer order as pending has total ammount of ${ this.customer_subtotal_order} Pesos.`,
               }
              this.actions_save_user_log(create_logs)
           
           
              
                axios.post(`${this.global_hostname}/api/customer/`,payload,this.config)
                .then(res => {
                  console.log(res)
                   
                   this.mutate_reciept_information({'reciept_id' :res.data.id,'global_preparedby' : this.instance[0].first_name, 'customerOrder' :  this.customerOrder})
                    this.$q.loading.hide()
                    this.save_orders(res.data.id)
                })
                .catch(err => {
                  console.error(err); 
                })
            
            }).onOk(() => {
             }).onCancel(() => {
             }).onDismiss(() => {
          })
          
    },
    increment(item) {
      item.quantity = parseInt(item.quantity) + 1;
      item.totalAmmount = parseFloat(item.price) * parseInt(item.quantity);
      this.mutate_subtotal();
    },
    decrement(item) {
      item.quantity = parseInt(item.quantity) - 1;
      if (parseInt(item.quantity) < 1) {
        item.quantity = 1;
        return;
      }
      item.totalAmmount = parseFloat(item.price) * parseInt(item.quantity);

      this.mutate_subtotal();
    },
    remove_item(index) {
      this.customerOrder.splice(index, 1);

      this.mutate_subtotal();
    },
  },

  computed: {
    ...mapState([
      "global_hostname",
      "categoryList",
      "productList",
      "products_info",
      "customerOrder",
      "user_clicked_category",
      "customer_subtotal_order",
      "reciept_id",
      "global_preparedby",
      "prepared_by",
      "config",
      'instance'
    ]),
    ...mapGetters(["getters_subtotal"]),
    computed_balance (){
      var total = 0
      if (this.model_deposit <= 0  || this.model_deposit <= 0.00 | this.model_deposit.length <= 0) {
         total = 0
      }else{
        total = this.customer_subtotal_order - this.model_deposit
      }
     return total
    },
  },
};
</script>
<style lang="scss" >
.logo {
  max-width: 50%;
  max-height: 50%;
  display: block;
  /* remove extra space below image */
}
.mytable {
  margin-top: 20px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-size: 11px;
}
td,
th {
  
  text-align: left;
  padding: 8px;
}
.logo_there_is_no_order{
  max-width : 80%;
  max-height : 80%;
 

}
.prep{
  text-align: center;
  padding: 10px;
  font-size: 20px;
}
.selec{
  font-size: 18px;
   text-align: center;
}

</style>