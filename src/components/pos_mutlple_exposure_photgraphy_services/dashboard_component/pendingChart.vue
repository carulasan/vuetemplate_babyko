<template>
     <div>
         <div class="row">
         
             <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 animate__animated animate__fadeIn ">
                    <pendingTable />

             
             </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 animate__animated animate__fadeIn" style="margin-top : 20px">
                <div class="row">
                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                    
                       {{ getters_getOrderByYears[0].monthEarned  }} 
                   <q-select v-model="model_chart"  dense :options="years_collect" label="Year"  /> 
                    </div>
                     <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                         <q-btn color="primary" dense icon="search" outline label="search"  />
                    </div>


                </div>
                <canvas id="myChart"  class="shadow-1" style="width : 100% ; border-radius:  10px; " height="400"></canvas>
                
             
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 animate__animated animate__fadeIn" style="margin-top : 20px ;" >
              
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 12px">
              Recent Activities | <q-btn color="secondary" size="sm" dense rounded label="clear"  @click="clear_activities" />
              </div>
              
                  <div    style="width : 100% ; border-radius:  10px; padding : 20px ;height : 300px ; overflow-y: scroll; ">
                       
                             <q-item dense  style="margin:10px" v-for="(item,index) in getters_user_logs" :key="index">
                                 <q-item-section top avatar>
                                         <q-avatar   size="md" flat class="shadow-1" text-color="primary"  icon="check" />
                                 </q-item-section>
                                 <q-item-section>
                                          <q-item-label class="descrip_dash">{{ item.description }}</q-item-label>
                                  </q-item-section>
                                  <q-item-section side top>
                                       
                                           <q-item-label caption ></q-item-label>
                                   </q-item-section>
                             </q-item>
                             
                </div>
               
            </div>

         </div>
     </div>
</template>
<script>

import pendingTable from '../pending/pendingTable.vue'

import { mapGetters } from 'vuex';

import { mapState } from 'vuex';
import axios from "axios";
import { mapActions } from 'vuex';



export default {
    name: "pendingChart",
    data() {
        return {
            model_chart: ''
        }
    },
    components:{
    pendingTable,
    },
    computed: {
        ...mapGetters([
            'getters_user_logs',
             'getters_getOrderByYears'
        ]),
         ...mapState([
            'instance',
            'global_hostname',
            'config',
            'years_collection',
            'state_monthly_earned'
        ]),
        years_collect(){
            var years = []
            this.years_collection.forEach(element => {
                years.push(element.year)
            })
            return years
        },

    },
    methods : {
        ...mapActions([
            'actions_get_user_logs', //also supports payload `this.nameOfAction(amount)` 
        ]),
        function_delete_activities(id){
            axios.delete(`${this.global_hostname}/api/userLogs/${id}/`,this.config)
            .then(res => {
                console.log(res)

            })
            .catch(err => {
                console.error(err); 
            })
        },
            clear_activities(){

                if (this.instance[0].is_superuser == true) {
                      
                        this.$q.dialog({
                            title: 'Confirm - Clear all system activities.',
                            message: 'Would you like to continue?',
                            cancel: true,
                            persistent: true
                            }).onOk(() => {

                                    for (let index = 0; index < this.getters_user_logs.length; index++) {
                                        const element = this.getters_user_logs[index];
                                        this.function_delete_activities(element.id)
                                        if (index == this.getters_user_logs.length - 1) {
                                            
                                            this.$q.notify({ //put dollor sign(q)
                                                 message: `Clear Activities Successfull!`,
                                                 timeout: 3000, // in milliseconds; 0 means no timeout
                                                color: 'primary',
                                                textColor: 'white', // if default 'white' doesn't fit
                                                icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                                                position: 'top', // 'top', 'left', 'bottom-left' etc.
                                            })
                                            setTimeout(() =>  { this.actions_get_user_logs() },2000)
                                            
                                        }
                                        
                                    }
                            }).onOk(() => {
                             }).onCancel(() => {
                             }).onDismiss(() => {
                        })
                        
                    
                } else{
                    alert('You are unable to clear activities!')
                    return
                }
            }
    },
    mounted () {
        var count = this.getters_getOrderByYears.length - 1
var monthly_earned = this.getters_getOrderByYears[count].monthEarned
        var ctx = document.getElementById('myChart').getContext('2d');
/* eslint-disable */  new Chart(ctx, { 
    
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
            label: 'Monthly Earned',
            data: monthly_earned,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}
}
</script>
<style lang="scss" >
.descrip_dash{

    text-align: left;
}
</style>