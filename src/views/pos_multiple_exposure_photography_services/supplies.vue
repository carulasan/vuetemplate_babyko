<template>
    <div class="row">
        
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin:auto; ">
                <q-breadcrumbs>
                    <q-breadcrumbs-el label="Supplies" icon="support_agent" />
                    <q-breadcrumbs-el label="" />
                    
                </q-breadcrumbs>
              
                
        </div>
        <printableSupplies id="print_supplies"/>
        
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin:auto; text-align:center; padding : 20px;">
               <q-btn color="secondary" icon="add" style="margin-right:10px" @click="dialog_new_supplies = true"  outline label="Create report"  />
               <q-btn color="primary" icon="person" style="margin-right:10px" @click="dialog_supplier = true"  outline label="Supplier"  />
        </div>
          <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10" style="margin:auto; text-align:center; padding : 20px;">
            
                <q-table style="border-radius:  10px;" class="animate__animated animate__fadeIn shadow-1" :data="getters_supplies_and_items"  :columns="supplies_table" row-key="name">
                <template v-slot:body="props">
                  <q-tr :props="props" style="cursor :pointer ;">
                    <q-td key="action" :props="props">
                       <q-btn
                        color="secondary"
                        flat
                        icon="print"
                        size="sm"
                        @click="print_supplies_report(props.row) "
                      />

                      <q-btn
                        color="primary"
                        flat
                        icon="visibility"
                        size="sm"
                        @click="view_info(props.row) "
                      />
                    </q-td>
 <q-td key="id" :props="props" class="title">{{ props.row.id }}</q-td>
                    <q-td key="supplier" :props="props" class="title">{{ props.row.supplier }}</q-td>
                   
                 <q-td key="preparedBy" :props="props">
                      <q-badge color="primary">{{ props.row.preparedBy}}</q-badge>
                    </q-td>
                    <q-td key="status" :props="props">
                      <q-badge color="secondary">
                       
                        <span v-if="props.row.status == true"> Paid</span>
                         <span v-else> Unpaid</span>

                      </q-badge>
                    </q-td>
                    <q-td key="totalAmount" :props="props">
                      <q-badge color="secondary">&#8369; {{ props.row.totalAmount }}</q-badge>
                    </q-td>
                    
                     <q-td key="date_created" :props="props">
                      <q-badge color="secondary"> {{ new Date(props.row.date_created ).toString().substr(0,15) }}</q-badge>
                    </q-td>
                     <q-td key="date_updated" :props="props">
                      <q-badge color="secondary"> {{ new Date(props.row.date_updated ).toString().substr(0,15) }}</q-badge>
                    </q-td>
                  </q-tr>
                </template>
                 </q-table>
                
        </div>
        
       

        <q-dialog style="width : 900px" v-model="dialog_new_supplies" persistent>
          <q-card style="width : 900px; padding:20px ">
           <div class="row">
           
               <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
                Create Supplies Report
               </div>
               <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
                <q-btn size="sm" outline color="secondary" @click="reset_information"   label="reset"  />
               </div>
             

                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding : 2px;">
                    
                 
                    <q-select :readonly="selection"  @input="event_change_supplier_name(model_supplier)" v-model="model_supplier" :options="getters_option_supplier"   label="Supplier" />
                  </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding : 2px;">
                    
                    <q-select v-model="model_preparedBy" :options="prepared_by" label="Prepared By"  />
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding : 2px;">
                    <div><span style="margin-top:20px;color:grey">Paid?</span>  <q-radio v-model="model_paid" val="true" label="Yes" />
                    <q-radio v-model="model_paid" val="false" label="No" /></div>
                    
                  </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding : 2px;">
                    <q-input v-model="model_date_today"  type="text" label="Order Date" />
                  </div>
                  
           </div>
           <div class="row">
             <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              
                <table style="width: 100%;">
            <tbody>

            <tr>
              <td style="width: 10%;">&nbsp; Qty</td>
              <td style="width: 40%;">&nbsp;Product Description</td>
              <td style="width: 10%;">&nbsp; Unit</td>
              <td style="width: 20%;">&nbsp;Price</td>
              <td style="width: 20% ;">&nbsp;Amount</td>
            </tr>
            <tr v-for="(item,index) in supplies_instance" :key="index">
              <td style="width: 15%;">
                <q-input @change="get_price(item.productName,item)" v-model="item.quantity" min="1" max="999" type="number"  />
              </td>
              <td style="width: 40%;">
                
                  <q-select @input="get_price(item.productName,item)" v-model="item.productName" :options="option_product_description"  />
              </td>
              <td style="width: 10%;">
                <q-input readonly v-model="item.unit" type="text"  />
              </td>
              <td style="width: 15%;">
               
                <q-input  readonly v-model="item.price" type="number" />
              </td>
              
              <td style="width: 20% ;">
                <q-input readonly v-model="item.totolPrice" type="number" />
              </td>
            </tr>
            </tbody>
            </table>
            <q-btn color="secondary" outline icon="add" @click="add_row" label="add row"  />


             </div>
           </div>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="grey" v-close-popup />
              <q-btn outline label="Save" color="primary" @click="save_supplies" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
  

   <q-dialog style="width : 900px" v-model="dialog_view_supplies" persistent>
          <q-card style="width : 900px; padding:20px ">
           <div class="row">
           
               <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
                 Supplies Report
               </div>
             
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding : 2px;">
                    <q-input readonly v-model="supplies_view.supplier" hint="Ex. Makubizz88" type="text" label="Supplier" />
                  </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding : 2px;">
                    
                    <q-select readonly v-model="supplies_view.preparedBy" :options="prepared_by" label="Prepared By"  />
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding : 2px;">
                    <div><span style="margin-top:20px;color:grey">Status : Paid?</span> 
                    <br>
                     <q-radio  @input="event_change_status(supplies_view.status,supplies_view)"   v-model="supplies_view.status" :val="true" label="Yes" />
                    <q-radio   @input="event_change_status(supplies_view.status,supplies_view)"  v-model="supplies_view.status" :val="false" label="No" />
                    <span>
                      <q-btn color="primary" flat icon="edit" size="sm"   />
                      <q-tooltip v-model="tooltip_show">
                        You can change status by toggling the radio button. 
                      </q-tooltip>
                    </span>
                    
                    </div>
                    
                  </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding : 2px;">
                      <div><small>Date Created</small></div>
                    <span> {{ new Date(supplies_view.date_created).toString().substr(0,15)}}</span>
                  </div>
                  
           </div>
           <div class="row">
             <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              
                <table style="width: 100%;">
            <tbody>

            <tr>
              <td style="width: 10%;">&nbsp; Qty</td>
              <td style="width: 40%;">&nbsp;Product Description</td>
              <td style="width: 10%;">&nbsp; Unit</td>
              <td style="width: 20%;">&nbsp;Price</td>
              <td style="width: 20% ;">&nbsp;Amount</td>
            </tr>
            <tr v-for="(item,index) in supplies_view.suppliesListItem" :key="index">
              <td style="width: 15%;">
                <q-input readonly v-model="item.quantity" min="1" max="10" type="number"  />
              </td>
              <td style="width: 40%;">
                <q-input readonly v-model="item.productName" type="text"  />
              </td>
              <td style="width: 10%;">
                <q-input readonly v-model="item.unit" type="text"  />
              </td>
              <td style="width: 15%;">
                <q-input readonly v-model="item.price" type="number" />
              </td>
              <td style="width: 20% ;">
                <q-input readonly v-model="item.totolPrice" type="number" />
              </td>
            </tr>
            </tbody>
            </table>
           

             </div>
           </div>
            <q-card-actions align="right">
              
               <q-btn outline label="PRINT" color="secondary" @click="print_supplies_report(supplies_view)" v-close-popup />
              <q-btn outline label="close" color="grey" v-close-popup />
              
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog  style="width : 900px; padding:20px " v-model="dialog_supplier" persistent>
          <q-card style="width : 900px; padding:20px ">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
              Supplier Informtion
              </div>
              
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <q-input v-model="model_company_name" type="text" label="Company Name" />
                <q-input v-model="model_company_address" type="text" label="Address" />
                <q-btn color="primary" outline  label="Submit" style="margin-top: 5px; margin-bottom: 5px;" @click="submit_new_supplier" />
                <div class="title">Suppliers</div>
                <q-expansion-item
                v-for ="(item,index) in getters_suppliers_information"
                :key="index"
                  
                  icon="perm_identity"
                  :label="item.companyName"
                  :caption="item.address"
                  group="somegroup"
                  :default-opened="index == 0 ? true : false"
                >
            
                
                <table style="width: 100%;">
                  <tbody>
                      <tr>
                        <th style="width: 20%;">&nbsp; Action</th>
                          <th style="width: 40%;">&nbsp; Product Name</th>
                          <th style="width: 20%;">&nbsp; Unit</th>
                          <th style="width: 20%;">&nbsp; UnitCost/Price</th>  
                      </tr>
                      <tr :key="index" v-for="(info,index) in item.supplierProductList">
                        <td style="width: 20%;">&nbsp; 
                          <q-btn  flat color="grey" rounded size="sm" icon="delete" @click="event_delete_supplier_product(info.id)" dense  />
                          <q-btn  flat color="secondary" rounded size="sm"  @click="edit_supplier_product(info)" icon="edit" dense  />
                        </td>
                        <td style="width: 40%;">&nbsp; {{info.productName}}</td>
                        <td style="width: 20%;">&nbsp; {{info.unit }}</td>
                        <td style="width: 20%;">&nbsp; {{ info.unitCost}}</td>  
                    </tr>
                    
                  </tbody>
                  </table>
              <div class="row " style=" margin-bottom : 30px">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style=" padding: 10px; text-align: center;">
      
                      <q-btn @click="item.date_updated = !item.date_updated"  outline color="secondary" size="sm" label="add Item"  />
                  </div>
                  
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 shadow-2 animate__animated animate__fadeInLeft" style="padding : 20px; border-radius: 5px;">
                    <q-input dense  v-model="item.productName" type="text" label="Product Name" />
                    <q-input dense  v-model="item.unit" type="text" label="Unit" />
                    <q-input dense  v-model="item.unitCost" type="number" min="1" max="999999999" label="Unit Cost / Price" />
                    <q-btn style="margin-top:10px"  outline color="secondary" size="sm" @click="event_save_products_supplier(item.productName,item.unit,item.unitCost,item.id)" label="Save"  />
                  </div>

                 
                  
              </div>
                </q-expansion-item>
              
              </div>
            </div>
            <q-card-actions align="right">
              
              <q-btn outline label="close" color="secondary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="dlalog_edit_supplier_product" persistent>
          <q-card>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
                Supplies Report
              </div>
            </div>
            <q-card-section >
              
              <q-input v-model="object_edit_supplier.productName" type="text" label="Product Name" />
              <q-input v-model="object_edit_supplier.unit" type="text" label="Unit" />
              <q-input v-model="object_edit_supplier.unitCost" type="number" label="Unit Cost" />
            
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="grey" v-close-popup />
              <q-btn  label="Update" @click="event_update_supplier_product(object_edit_supplier)" color="primary" outline  />
            </q-card-actions>
          </q-card>
        </q-dialog>

    </div>
</template>
<script>

import printableSupplies  from "../../components/pos_mutlple_exposure_photgraphy_services/printableSupplies.vue";



console.log('');

import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';


import { mapActions } from 'vuex';
import axios from 'axios'



export default {
    name: "supplies",
    components: {
      printableSupplies,
     
    },
    computed: {
        ...mapState([
            'suppliesList',
            'prepared_by',
            'supplies_instance',
            'global_hostname',
            'supplierProductList',
            'supplierInformationList',
            'config'
        ]),
         ...mapGetters([
            'getters_supplies_and_items',
            'getters_suppliers_information',
            "getters_option_supplier"
          ]),
        

    },
    data() {
        return {
          object_edit_supplier : {},
          selection : false,
          dlalog_edit_supplier_product : false,
          toggle_add_item : false,
          model_company_name : '',
                model_company_address : '',
          dialog_supplier : false,
        
          option_product_description : [       
              'Hard Copy-short',
             'Laminating Film-A4',       
          ],
          supplies_product_description : [
          {
            "url": "http://192.168.100.106:4000/api/SupplierProducts/1/",
                    "id": 1,
                    "supplierInformation": "http://192.168.100.106:4000/api/SupplierInformation/1/",
                    "unitCost": "566.00",
                    "unit": "box",
                    "productName": "hard Copy",
                    "date_created": "2020-09-01T10:07:42.668204Z",
                    "date_updated": "2020-09-01T10:07:42.668204Z"
          }
           
          ],
          tooltip_show : true,
          dialog_view_supplies : false,
          supplies_view : {},
          model_supplier : '',
          model_date_today : new Date().toString().substring(0,15),
          model_paid : '',
          model_preparedBy : '',
            dialog_new_supplies : false,
             supplies_table: [
            { name: "action", label: "Action", field: "id" },
             { name: "id", label: "ID", field: "id" },
                {
                name: "supplier",
                required: true,
                label: "Supplier",
                align: "left",
                field: (row) => row.supplier,
                format: (val) => `${val}`,
                sortable: true,
                },
                 {
                name: "preparedBy",
                align: "left",
                label: "Prepare By",
                field: "preparedBy",
                sortable: true,
                },
                {
                name: "status",
                align: "left",
                label: "Status",
                field: "status",
                sortable: true,
                },
                 {
                name: "totalAmount",
                align: "left",
                label: "Total Amount",
                field: "totalAmount",
                sortable: true,
                },
                {

                     name: "date_created", label: "Date Created", field: "date_created", sortable: true 
                
                
                },
                 {

                     name: "date_updated", label: "Date Updated", field: "date_updated", sortable: true 
                
                
                },
      ],
        }
    },
    methods : {
       ...mapMutations([
      'mutation_add_row_supplies', //also supports payload `this.nameOfMutation(amount)` 
      'mutation_clear_supplies',
      'mutate_print_supplies'
    ]),
     ...mapActions([
  
      "action_get_supplies",
      "action_get_suppliesItems",
      "get_supplier_information",
      "get_supplier_products",
    ]),
    reset_information(){
      this.selection = false
      this.mutation_clear_supplies()
    },
      event_change_supplier_name(supplierName){
        this.selection = true
        var company_name = this.supplierInformationList
        var product = this.supplierProductList
        var company_url= {}
         company_name.forEach(element => {
            if (element.companyName  == supplierName) {
              company_url = element
            }
        });
        var product_info = product.filter((el)=>(el.supplierInformation == company_url.url))
        var data = []
        product_info.forEach(element => {
          data.push(element.productName)
        });
        this.option_product_description = data
           
          
      },
    event_update_supplier_product(info){
      var payload = {
        "supplierInformation": info.supplierInformation,
        "unitCost":  info.unitPrice ,
        "unit":  info.unit,
        "productName": info.productName,
      }
      axios.put(`${this.global_hostname}/api/SupplierProducts/${info.id}/`,payload,this.config)
      .then(res => {
        console.log(res)
        this.$q.notify({ //put dollor sign(q)
               message: `Successfully Updated!`,
               timeout: 3000, // in milliseconds; 0 means no timeout
              color: 'primary',
              textColor: 'white', // if default 'white' doesn't fit
              icon: 'check', //or  avatar: 'statics/boy-avatar.png',
              position: 'bottom', // 'top', 'left', 'bottom-left' etc.
            })
            this.action_get_supplies()
      this.action_get_suppliesItems()
        this.get_supplier_information()
      this.get_supplier_products()

      })
      .catch(err => {
        console.error(err); 
        
        this.$q.notify({ //put dollor sign(q)
           message: `Error! `,
           timeout: 3000, // in milliseconds; 0 means no timeout
          color: 'red',
          textColor: 'white', // if default 'white' doesn't fit
          icon: 'error', //or  avatar: 'statics/boy-avatar.png',
          position: 'bottom', // 'top', 'left', 'bottom-left' etc.
        })
      })
    },
    edit_supplier_product(item){
      this.object_edit_supplier = item
      this.dlalog_edit_supplier_product = true
    },
    event_delete_supplier_product(id){
    
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like delete this information?',
        cancel: true,
        persistent: true
        }).onOk(() => {
          // alert('You cant delete information by this time')
 
          // /* eslint-disable */  return 
     
          axios.delete(`${this.global_hostname}/api/SupplierProducts/${id}/`,this.config)
          .then(res => {
            console.log(res)
            this.$q.notify({ //put dollor sign(q)
               message: `Successfully Delete!`,
               timeout: 3000, // in milliseconds; 0 means no timeout
              color: 'primary',
              textColor: 'white', // if default 'white' doesn't fit
              icon: 'check', //or  avatar: 'statics/boy-avatar.png',
              position: 'bottom', // 'top', 'left', 'bottom-left' etc.
            })

              this.action_get_supplies()
      this.action_get_suppliesItems()
        this.get_supplier_information()
      this.get_supplier_products()


          })
          .catch(err => {
            
            console.error(err); 
        this.$q.notify({ //put dollor sign(q)
           message: `Error! All Feilds must not be empty`,
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
    event_save_products_supplier(productName,unit,unitPrice,id){

   
      var payload = {
        "supplierInformation": `${this.global_hostname}/api/SupplierInformation/${id}/`,
        "unitCost":  unitPrice ,
        "unit":  unit,
        "productName": productName,
      }
      axios.post(`${this.global_hostname}/api/SupplierProducts/`,payload,this.config)
      .then(res => {
        console.log(res)
        this.$q.notify({ //put dollor sign(q)
           message: `New Product Supplier Successfully Save! `,
           timeout: 3000, // in milliseconds; 0 means no timeout
          color: 'orange',
          textColor: 'white', // if default 'white' doesn't fit
          icon: 'check', //or  avatar: 'statics/boy-avatar.png',
          position: 'bottom', // 'top', 'left', 'bottom-left' etc.
        })

        this.action_get_supplies()
      this.action_get_suppliesItems()
        this.get_supplier_information()
      this.get_supplier_products()
      
      })
      .catch(err => {
        console.error(err); 
        this.$q.notify({ //put dollor sign(q)
           message: `Error! All Feilds must not be empty `,
           timeout: 3000, // in milliseconds; 0 means no timeout
          color: 'red',
          textColor: 'white', // if default 'white' doesn't fit
          icon: 'error', //or  avatar: 'statics/boy-avatar.png',
          position: 'bottom', // 'top', 'left', 'bottom-left' etc.
        })
      })
    },
    submit_new_supplier(){
      if (this.model_company_name.length <= 0) {
          alert('Company Name must be filled!')

          /* eslint-disable */  return 
         
      }
      var payload ={
        "companyName": this.model_company_name,
        "address": this.model_company_address
      }
      axios.post(`${this.global_hostname}/api/SupplierInformation/`,payload,this.config)
      .then(res => {
        console.log(res)
       
        this.$q.notify({ //put dollor sign(q)
           message: `Successfully Save!`,
           timeout: 3000, // in milliseconds; 0 means no timeout
          color: 'orange',
          textColor: 'white', // if default 'white' doesn't fit
          icon: 'check', //or  avatar: 'statics/boy-avatar.png',
          position: 'bottom', // 'top', 'left', 'bottom-left' etc.
        })
    
        this.get_supplier_information()
      this.get_supplier_products()

      })
      .catch(err => {
        console.error(err); 
      })

    },
     get_price(info,item){
                   var info_temp = info
                   item.price = 0.00
                var data = this.supplierProductList
                item.price =  data.filter((el)=>(el.productName == info_temp))[0].unitCost 
                item.totolPrice = parseFloat(item.quantity) * parseFloat(item.price)
                item.unit =  data.filter((el)=>(el.productName == info_temp))[0].unit 
        },
    event_change_status(status,temp){
      var payload = {
        
        "supplier": temp.supplier,
        "preparedBy": temp.preparedBy,
        "status": status,
      }
      axios.put(`${this.global_hostname}/api/Supplies/${temp.id}/`,payload,this.config)
      .then(res => {
        console.log(res)
         this.action_get_supplies()
      this.action_get_suppliesItems()
      this.$q.notify({ //put dollor sign(q)
         message: `Supply Status is Successfully Updated!`,
         timeout: 3000, // in milliseconds; 0 means no timeout
        color: 'primary',
        textColor: 'white', // if default 'white' doesn't fit
        icon: 'check', //or  avatar: 'statics/boy-avatar.png',
        position: 'top', // 'top', 'left', 'bottom-left' etc.
      })
      
      })
      .catch(err => {
        console.error(err); 
        this.$q.notify({ //put dollor sign(q)
         message: `Error! All Feilds must not be empty!`,
         timeout: 3000, // in milliseconds; 0 means no timeout
        color: 'red',
        textColor: 'white', // if default 'white' doesn't fit
        icon: 'check', //or  avatar: 'statics/boy-avatar.png',
        position: 'top', // 'top', 'left', 'bottom-left' etc.
      })
      })
    },
    print_supplies_report(row){
      
      this.mutate_print_supplies(row)
      this.$q.loading.show({ 'message' : 'Please wait............'})
     setTimeout(() => {
       this.$q.loading.hide()
       popup()
          function popup() {
          var divToPrint = document.getElementById('print_supplies');
          var popupWin = window.open('', '_blank', 'width=400,height=600');
          popupWin.document.open();
          popupWin.document.write("<html><head><link rel='stylesheet'  href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css' /> <style> table{  font-family: 'Montserrat', sans-serif; }</style> </head><body onload='window.print()'>" + divToPrint.innerHTML + '</html>');
          popupWin.document.close();
      }
     }, 1000);
      
      
      
    },
    view_info(row){
      this.supplies_view = row
      this.dialog_view_supplies = true

    },
    postInfo(payload){

      axios.post(`${this.global_hostname}/api/SupplyItems/`,payload,this.config)
        .then(res => {
          console.log(res)



        })
        .catch(err => {
          console.error(err); 
        })
        

    },
    post_items(id){
      var data = this.supplies_instance
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.productName.length <= 0) {
           this.$q.notify({ //put dollor sign(q)
                             message: ` ${(index+1)} Items Successfully Save!`,
                             timeout: 3000, // in milliseconds; 0 means no timeout
                            color: 'orange',
                            textColor: 'white', // if default 'white' doesn't fit
                            icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                            position: 'bottom', // 'top', 'left', 'bottom-left' etc.
                        })
          return
        }
        var payload = {
            "supplies": `${this.global_hostname}/api/Supplies/${id}/`,
            "quantity": element.quantity,
            "unit": element.unit,
            "price": element.price,
            "totolPrice": element.totolPrice,
            "productName": element.productName,
        }
        this.postInfo(payload)
        if (index == data.length - 1) {
           this.$q.notify({ //put dollor sign(q)
                             message: ` ${(index+1)} Items Successfully Save!`,
                             timeout: 3000, // in milliseconds; 0 means no timeout
                            color: 'orange',
                            textColor: 'white', // if default 'white' doesn't fit
                            icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                            position: 'bottom', // 'top', 'left', 'bottom-left' etc.
                        })

    this.mutation_clear_supplies()

    this.action_get_supplies()
      this.action_get_suppliesItems()
        this.get_supplier_information()
      this.get_supplier_products()



        }


        
      }

    },
    save_supplies(){
      
                  if (this.model_supplier.length <= 0) {
                      alert('Please Enter Supplier!')
                      return
                  }
                  if (this.model_preparedBy.length <= 0) {
                      alert('Please Select Prepared By!')
                      return
                  }
                  if (this.model_preparedBy.length <= 0) {
                      alert('Have been paid or not, Please select Yes or Not!')
                      return
                  }
                
      var payload = {
         "supplier": this.model_supplier,
        "preparedBy": this.model_preparedBy,
        "status": this.model_paid,
      }
      axios.post(`${this.global_hostname}/api/Supplies/`,payload,this.config)
      .then(res => {
        console.log(res)
        this.post_items(res.data.id)
      })
      .catch(err => {
        console.error(err); 
      })
    },
        add_row(){
            var payload = {   
                       
                "quantity": 1,
                "price": '',
                "unit" : '',
                "totolPrice": '',
                "productName": '',
            }
            this.mutation_add_row_supplies(payload)
        }
    }
    ,
    beforeMount () {
      this.action_get_supplies()
      this.action_get_suppliesItems()
      this.get_supplier_information()
      this.get_supplier_products()
    },
}
</script>
<style lang="scss" >
</style>