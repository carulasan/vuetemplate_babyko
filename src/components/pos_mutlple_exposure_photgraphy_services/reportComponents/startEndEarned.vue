<template>
     <div class="row">
         <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8" style="margin:auto;">
         
              
               <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin:auto;">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="money" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="reports_earned">&#8369; {{ get_earned_start_end_date}}</q-item-label>
                  <q-item-label class="reports_subtitle" >Earned </q-item-label>
                </q-item-section>
               
              </q-item>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:5px">
              <q-input @input="clear_print()" label="Start Date" v-model="date_start" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="date_start">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:5px">
              <q-input label="End Date" v-model="date_end" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="date_end">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="">
              <q-btn color="primary" outline icon="search" label="search" @click="event_display_order_start_end" />
                <q-btn color="secondary" @click="print_sales_function(orderList_filtered_start_end_date,date_start,date_end)" v-if="orderList_filtered_start_end_date.length > 0" style="margin-left:10px" outline icon="print" label="" />
            </div>
            
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 animate__animated animate__fadeInUp animate__delay-1s " v-if="orderList_filtered_start_end_date.length <= 0">
                To view and print the information, please select start date and end date , then click the button search.
            </div>
     
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top:10px" v-if="orderList_filtered_start_end_date.length > 0">

                      <q-table style="border-radius:  10px;" class="animate__animated animate__fadeIn shadow-1"   :rows-per-page-options="[0]"   :data="orderList_filtered_start_end_date" :columns="allrecord_column" row-key="id">
                    
                    <template v-slot:body="props">
                        
                        <q-tr :props="props" style="cursor :pointer ;">
                             
                            <q-td key="product" :props="props">
                                    
                                    <q-badge color="primary" text-color="white"  >{{ props.row.product }}</q-badge>
                            </q-td> 
                            <q-td key="price" :props="props">
                                    {{ props.row.price }}
                            </q-td> 
                            <q-td key="quantity" :props="props">
                                    {{ props.row.quantity }}
                            </q-td> 
                            <q-td key="totalAmmount" :props="props">
                                 
                                    <q-badge color="secondary" text-color="white"  >{{props.row.totalAmmount}}</q-badge>
                            </q-td> 
                            <q-td key="date_created" :props="props">
                                    {{ new Date(props.row.date_created).toString().substr(0,15) }}
                            </q-td> 
                         </q-tr>
                    </template>
              </q-table>



            </div>
            
  <printableSalesReport id="print_sales" />


          </div>
         </div>
     </div>
</template>
<script>
import printableSalesReport from '../printable_design/printableSalesReport.vue'



import { mapState } from 'vuex';

import { mapMutations } from 'vuex';
export default {
    name: "Home",
    components:{
  printableSalesReport,
},
    computed: {
        ...mapState([
            'orderList_filtered_start_end_date',
            'print_sales'
        ]),
        get_earned_start_end_date(){
            var count = 0
            this.orderList_filtered_start_end_date.forEach(element => {
                count = count + parseFloat(element.totalAmmount)
            });
            return count
    },
    },
    
    data() {
        return {
            date_end : '',
            date_start  : '',
                   allrecord_column: [
                    { name: "product", label: "Product", field: "product" ,sortable: true,  align: "left"},
                    { name: "price", label: "Price", field: "price" ,sortable: true,  align: "right"},
                    { name: "quantity", label: "Quantity", field: "quantity" ,sortable: true,  align: "right"},
                    { name: "totalAmmount", label: "Total Amount", field: "totalAmmount" ,sortable: true,  align: "right"},
                    { name: "date_created", label: "Date", field: "date_created" ,sortable: true,  align: "left"},
                    
            ],

        }
    },
    methods : {
          ...mapMutations([
            'mutate_set_start_end_date', //also supports payload `this.nameOfMutation(amount)` 
            'mutate_reciept_information',
            'mutate_print_sales'
        ]),
        clear_print(){
          this.mutate_print_sales([])
             var payload = {
                date_start: '',
                date_end: '',
                }
                
        this.mutate_set_start_end_date(payload)
        },
        print_sales_function(data,start,end){
          if (start == end) {
             data.date_info = new Date(start).toString().substring(0,15)
             
          }else{
            data.date_info = `From ${new Date(start).toString().substring(0,15)} to ${new Date(end).toString().substring(0,15)}`
             
          }
          
          this.mutate_print_sales(data)
          
            //for loading only
            this.$q.loading.show({'message' : 'Please wait.....'})
            //for bar only 
           
            
          setTimeout(() => {
            this.$q.loading.hide()
             popup()
          },2000)
              function popup() {
              var divToPrint = document.getElementById('print_sales');
              var popupWin = window.open('', '_blank', 'width=600,height=800');
              popupWin.document.open();
              popupWin.document.write("<html><head><link rel='stylesheet'  href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css' /> <style> table{  font-family: 'Montserrat', sans-serif; }</style> </head><body onload='window.print()'>" + divToPrint.innerHTML + '</html>');
              popupWin.document.close();
            }
          
         
        },
           event_display_order_start_end(){
                var payload = {
                date_start: this.date_start,
                date_end: this.date_end,
                }
                
        this.mutate_set_start_end_date(payload)
    }

    }
   
}
</script>
<style lang="scss" >
</style>