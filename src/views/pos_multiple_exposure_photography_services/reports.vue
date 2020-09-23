<template>
  <div class="row">
     <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin:auto; ">
                <q-breadcrumbs>
                    <q-breadcrumbs-el label="Reports" icon="timeline" />
                    <q-breadcrumbs-el label="" />
                    
                </q-breadcrumbs>
        </div>




    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin:auto; ">
      <q-tabs v-model="tab" class="text-secondary">
        <q-tab name="today" class="animate__animated animate__fadeInLeft" icon="today" label="Today's Sales" />
        <q-tab name="daterange" class="animate__animated animate__fadeInRight" icon="date_range" label="Print Sales Report | In Detailed" />
        <q-tab name="dailyReport" class="animate__animated animate__fadeInRight" icon="sort" label="Print Sales Report | In Daily Earned" />
         <q-tab name="allrecords" class="animate__animated animate__fadeInRight" icon="how_to_vote" label="All Sales" />
          <q-tab name="reprint" class="animate__animated animate__fadeInRight" icon="print" label="Re Print Reciept" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="reprint">
          <rePrintReciept />
         
        </q-tab-panel>
         <q-tab-panel name="allrecords">
        
          <allRecordsOrder />
        </q-tab-panel>
     
        <q-tab-panel name="dailyReport">
        
          <reportPerDay />
        </q-tab-panel>
       
        <q-tab-panel name="today">
          <todaySales />
        </q-tab-panel>
        <q-tab-panel name="daterange">
          <startEndEarned />
          
        </q-tab-panel>
      </q-tab-panels>
    


    </div>
  </div>
</template>
<script>


import reportPerDay from "../../components/pos_mutlple_exposure_photgraphy_services/reportComponents/reportPerDay.vue"
import allRecordsOrder from "../../components/pos_mutlple_exposure_photgraphy_services/reportComponents/allRecordsOrder.vue"
import todaySales from "../../components/pos_mutlple_exposure_photgraphy_services/reportComponents/todaySales.vue"
import startEndEarned from "../../components/pos_mutlple_exposure_photgraphy_services/reportComponents/startEndEarned.vue"
import rePrintReciept from "../../components/pos_mutlple_exposure_photgraphy_services/reportComponents/rePrintReciept.vue"




import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import axios from "axios";




export default {
  name: "report",
  components: {

    
    reportPerDay,
    allRecordsOrder,
    todaySales,
    startEndEarned,
    rePrintReciept
  },

  computed: {
    ...mapState(['config','global_hostname',"orderList",'report_print_order','orderList_filtered_start_end_date','total_earned_today','orderList_filtered_start_end_date']),

    ...mapGetters(["getters_today_sales"]),
    
  },
  
  data() {
    return {
      dialog_view_report : false,
      temp_show : {},
      date_start: "",
      date_end: "",
      tab: "today",
     
    };
  },
  beforeMount () {
     this.action_get_customer()
    this.action_get_orders();
  },
  methods: {
      ...mapMutations([
      'mutate_set_start_end_date', //also supports payload `this.nameOfMutation(amount)` 
      'mutate_print_order'
    ]),
     
      ...mapActions([
      "action_getCategory", //also supports payload `this.nameOfAction(amount)`
      "action_getProduct",
      "action_view_products",
      "action_getImages",
      "action_get_customer",
      "action_get_orders",
      "action_get_expenses",
      "action_get_expenses_items",
       'action_get_supplies',
      'action_get_suppliesItems',

    ]),
   
  

 
    event_delete_record(id){

     
       this.$q.dialog({
         title: 'Confirm',
         message: `Would you like to delete this row Id: ${id}?`,
         cancel: true,
         persistent: true
         }).onOk(() => {
           axios.delete(`${this.global_hostname}/api/orders/${id}/`,this.config)
           .then(res => {
             console.log(res)
             this.$q.notify({ //put dollor sign(q)
                message: `Successfully Save!`,
                timeout: 3000, // in milliseconds; 0 means no timeout
               color: 'orange',
               textColor: 'white', // if default 'white' doesn't fit
               icon: 'check', //or  avatar: 'statics/boy-avatar.png',
               position: 'top', // 'top', 'left', 'bottom-left' etc.
             })
             this.action_getCategory();
    this.action_getProduct();
    this.action_getImages();
    this.action_get_orders()
    this.action_get_expenses()
     this.action_get_expenses_items()
      this.action_get_supplies()
      this.action_get_suppliesItems()

             
           })
           .catch(err => {
             console.error(err); 
           })
         }).onOk(() => {
          }).onCancel(() => {
          }).onDismiss(() => {
       })
       
        
    },
  
    
  },
};
</script>
<style lang="scss" >
.reports_earned {
  font-size: 20px;
  font-weight: 800;
  text-align: left;
}
.reports_subtitle {
  text-align: left;
}
</style>