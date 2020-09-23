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
          <q-btn color="primary"  @click="event_save_order" style="width : 100% ;" size="lg"   label="Save Order"  />
          
        </div>

    </div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 animate__animated animate__fadeIn">
              <iframe src='https://www.embed.com/app/calculator/gray-calculator.html' style='width: 100%; height : 300px ; margin:0px' scrolling='no' frameBorder='0'></iframe>
        
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

   
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import axios from "axios";
import { mapActions } from 'vuex';



import printable from "../../components/pos_mutlple_exposure_photgraphy_services/printable_customer_order.vue";
export default {
  name: "customerOrder",
   components: {
    printable,
   
  },
  data() {
    return {
      dialog_print_reciept : false,
      model_quantity : 0,
    
      dialog_preparedby : false,
      
    
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

                this.$q.notify({ //put dollor sign(q)
                   message: `Successfully Save!`,
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
          
          this.$q.dialog({
            title: 'Confirm',
            message: `Customer Order Prepared by : ${this.instance[0].first_name}`,
            cancel: true,
         
            persistent: true
            }).onOk(() => {
             
              this.$q.loading.show({'message' : 'Please Wait...'})
            
              
              var payload = {
               "customer": null,
               "pending" : false,
                "date_due": null,
                "balance": "0.00",
                "deposit": "0.00",
                "address": null,
                "contactNumber": null,
                "images": null,
                "preparedBy": this.instance[0].first_name,
                "totalAmountOrder": this.customer_subtotal_order,

              }
             
               var create_logs = {
                 "userInstance": `${this.global_hostname}/api/user/${this.instance[0].id}/`,
              "description": `${this.instance[0].first_name} saved customer order has total ammount of ${ this.customer_subtotal_order} Pesos.`,
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