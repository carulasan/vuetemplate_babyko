<template>
     <div>
         
         <div class="row">
             <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                 <div style="text-align:left; border-bottom : 1px solid gray"><small>Daily Monitoring</small></div>
             </div>
            
             <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 dash_labal  animate__animated animate__fadeInLeft" >
                <div class="shadow-1 " style="border-radius:  10px;">
                     <q-item >
                     <q-item-section top avatar>
                        
                         <span class="dash_ammount dash_peso">&#8369;</span>
                     </q-item-section>
                     <q-item-section>
                         <q-item-label class="dash_ammount">{{ getters_today_sales_dashboard }}</q-item-label>
                         <q-item-label caption lines="2" class="dash_earned">Earned</q-item-label>
                     </q-item-section>
                     <q-item-section side top>
                        
                     </q-item-section>
                    </q-item>
                </div>
             
             </div>
             <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 dash_labal animate__animated animate__fadeInDown ">
                  <div class="shadow-1 " style="border-radius:  10px;">

                  <q-item>
                     <q-item-section top avatar>
                        
                       <img width="50" src="https://img.icons8.com/clouds/100/000000/peso-symbol.png"/>
                     </q-item-section>
                     <q-item-section>
                         <q-item-label class="dash_ammount">{{ getters_today_expense_dashboard }}</q-item-label>
                         <q-item-label caption lines="2" class="dash_earned">Expense</q-item-label>
                     </q-item-section>
                     <q-item-section side top>
                        
                     </q-item-section>

                 </q-item>
                  </div>

             
             </div>
             <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 dash_labal animate__animated animate__fadeInUp ">
                  <div class="shadow-1 " style="border-radius:  10px;">
                   <q-item>
                     <q-item-section top avatar>
                        
                         <q-avatar color="secondary" text-color="white" icon="eco" />
                        
                     </q-item-section>
                     <q-item-section>
                         <q-item-label class="dash_ammount">{{ getters_pending.length }}</q-item-label>
                         <q-item-label caption lines="2" class="dash_earned">Pending</q-item-label>
                     </q-item-section>
                     <q-item-section side top>
                        
                     </q-item-section>

                 </q-item>
                  </div>
             
             </div>
             <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 dash_labal animate__animated animate__fadeInRight">
                  <div class="shadow-1 " style="border-radius:  10px;">
                   <q-item>
                     <q-item-section top avatar>
                        <q-avatar color="green" text-color="white" icon="groups" />

                        
                     </q-item-section>
                     <q-item-section>
                         <q-item-label class="dash_ammount">{{  getters_users_count_dashboard }}</q-item-label>
                         <q-item-label caption lines="2" class="dash_earned">Users</q-item-label>
                     </q-item-section>
                     <q-item-section side top>
                        
                     </q-item-section>

                 </q-item>
                  </div>
             
             </div>
             

         </div>
     </div>
</template>
<script>
import { mapGetters } from 'vuex';


export default {
    name: "label",
     computed: {
        ...mapGetters([
            'getters_today_sales_dashboard',
            'getters_today_expense_dashboard',
            'getters_pending',
            'getters_users_count_dashboard'
        ])
    },
}
</script>
<style lang="scss" >

@import "../../../styles/_variables.scss";
@import "../../../styles/quasar.sass";

.dash_labal{
padding : 10px;

}
.dash_ammount{
    font-size: 25px;
    font-weight: 800;
    color: $primary;
}
.dash_earned{
    color: $secondary;
}

</style>