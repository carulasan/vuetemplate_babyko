<template>
     <div class="row">
         <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8" style="margin:auto;">
               <div class="row">
                  <printableReportOrdder id="print_report_order" />
               
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin:auto;">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="money" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="reports_earned">&#8369; {{ get_earned_start_end_date}}</q-item-label>
                  <q-item-label class="reports_subtitle" >Earned</q-item-label>
                </q-item-section>

              </q-item>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:5px">
              <q-input label="Start Date" v-model="date_start" mask="date" :rules="['date']">
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
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:5px">
              <q-btn color="primary" outline icon="search" label="search" @click="event_display_order_start_end" />
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 animate__animated animate__fadeInUp animate__delay-1s " v-if="orderList_filtered_start_end_date_reprint.length <= 0">
                To view the information, please select start date and end date , then click the button search.
            </div>

          </div>





          <div class="row" style="margin-top:10px" v-if="orderList_filtered_start_end_date_reprint.length > 0">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <q-table style="border-radius:  10px;" class="animate__animated animate__fadeIn shadow-1"  :rows-per-page-options="[0]" :filter="filter" :data="orderList_filtered_start_end_date_reprint" :columns="columns_reports_all" row-key="id">
                  <template v-slot:top-right>
                              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                        <template v-slot:append>
                          <q-icon name="search" />
                      </template>
                    </q-input>
                  </template>
                              
                <template v-slot:body="props">
                  <q-tr :props="props" style="cursor :pointer ;">

                 <!-- delete_function -->
                <q-td key="id" :props="props">
                   <!-- <q-btn
                    color="grey"
                    flat
                    icon="delete"
                    size="sm"
                    @click="event_delete_record(props.row.id)"
                  /> -->
                   <q-btn
                    color="secondary"
                    flat
                    icon="print"
                    size="sm"
                    @click="print_record(props.row)"
                  />
                  <q-btn
                    color="primary"
                    flat
                    icon="visibility"
                    size="sm"
                    @click="view_information_order_records(props.row)"
                  />
                </q-td>


                <q-td key="totalAmountOrder" :props="props">
                  <q-badge color="secondary">&#8369; {{ props.row.totalAmountOrder }}</q-badge>
                </q-td>
                 <q-td key="preparedBy" :props="props">
                  {{ props.row.preparedBy }}
                </q-td>

                  <q-td key="date_created" :props="props">
                        {{ new Date(props.row.date_created).toString().substr(0,21)}}

                </q-td>
                  </q-tr>
                </template>
              </q-table>
               </div>
            </div>
          


            <q-dialog v-model="dialog_view_report" persistent>
        <q-card >
         
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin:auto; text-align:center;  padding:50px">
            
             <printableReportOrdderDialog  id="print_report_order"  style=" text-align:center;  padding:10px"  />
            
            </div>
          </div>
          <q-card-actions align="right">
            <q-btn flat label="Close" color="grey" v-close-popup />
            <q-btn  label="Print"  color="secondary" @click="event_print"  />
          </q-card-actions>
        </q-card>
      </q-dialog>
         </div>
        

         

     </div>
</template>
<script>
import { mapState } from 'vuex';

import printableReportOrdder from "../print_report_order.vue";
import printableReportOrdderDialog from "../printable_report_order_for_dialog.vue";
import { mapMutations } from 'vuex';




export default {
    name: "Home",
    components:{
      printableReportOrdder,
      printableReportOrdderDialog ,
},
    computed: {
        ...mapState([
            'orderList_filtered_start_end_date_reprint',
        ]),

     get_earned_start_end_date(){
      var count = 0
       this.orderList_filtered_start_end_date_reprint.forEach(element => {
         count = count + parseFloat(element.totalAmountOrder)
    });
    return count
    },
    },
    data() {
        return {
          filter : '',
          dialog_view_report : false,
          date_start : '',
          date_end : '',
            columns_reports_all: [
            { name: "id", label: "Action", field: "id" },

        {
          name: "totalAmountOrder",
          label: "Total Pay",
          field: "totalAmountOrder",
          sortable: true,
        },
         {
          name: "preparedBy",
          align: "right",
          label: "Prepared By",
          field: "preparedBy",
          sortable: true,
        },
        {
          name: "date_created",
          align: "right",
          label: "Date Created",
          field: "date_created",
          sortable: true,
        },
      ],
      columns_reports: [
        { name: "id", label: "Action", field: "id" },

        {
          name: "totalAmountOrder",
          label: "Total Pay",
          field: "totalAmountOrder",
          sortable: true,
        },
         {
          name: "preparedBy",
          align: "right",
          label: "Prepared By",
          field: "preparedBy",
          sortable: true,
        },
        {
          name: "date_created",
          align: "right",
          label: "Date Created",
          field: "date_created",
          sortable: true,
        },
      ],

        }
    },
    methods : {
       ...mapMutations([
      'mutate_print_order', //also supports payload `this.nameOfMutation(amount)` 
      'mutate_set_start_end_date_reprint'
    ]),
      
    event_print(){
      
  popup_print_report_order()

function popup_print_report_order() {
      var divToPrint = document.getElementById('print_report_order');
      var popupWin = window.open('', '_blank', 'width=800,height=800');
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
                
        this.mutate_set_start_end_date_reprint(payload)
    },
  view_information_order_records(row) {
        this.mutate_print_order(row)
        this.dialog_view_report = true

    },
    print_record(row){
                this.mutate_print_order(row)

                this.$q.loading.show({ 'message' : 'Please wait............'})


                setTimeout(() => {

                popup_print_report_order()
                this.$q.loading.hide()
                }, 1000);
                function popup_print_report_order() {
                    var divToPrint = document.getElementById('print_report_order');
                    var popupWin = window.open('', '_blank', 'width=800,height=800');
                    popupWin.document.open();
                    popupWin.document.write("<html><head><link rel='stylesheet'  href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css' /> <style> table{  font-family: 'Montserrat', sans-serif; }</style> </head><body onload='window.print()'>" + divToPrint.innerHTML + '</html>');
                    popupWin.document.close();
                }


    },
    }
}
</script>
<style lang="scss" >
</style>