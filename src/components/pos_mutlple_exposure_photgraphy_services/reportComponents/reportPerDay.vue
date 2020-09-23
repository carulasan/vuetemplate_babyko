<template>
  
  <div>
       
<div class="row">
    <div class="col-xs-12 col-sm-8 col-md-10 col-lg-8" style="margin:auto;">
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
                     
                                  <q-btn v-if="reportEarnedPerDay.length > 0" outline color="secondary" style="margin-left:10px" icon="print" @click="print_result"   />
           
                    </div>
                    <div v-if="reportEarnedPerDay.length <= 0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 animate__animated animate__fadeInUp animate__delay-1s ">
                        To view the information, please select start date and end date , then click the button search.
                    </div>
    </div>

    
    <div class="row" v-if="reportEarnedPerDay.length > 0">
  
  

            <div id="printEarned" class="col-xs-12 col-sm-12 col-md-8 col-lg-6" style="margin:auto;text-align:center; padding:20px ">
                <div style=" font-weight : 800; font-family: 'Montserrat', sans-serif; font-size:25px">Daily Earned Report</div>
            <table   style="width: 400px; font-family: 'Montserrat', sans-serif; font-size:15px" >
            <tbody>
             <tr>
                         <td style=""> </td>
                                    
                        <td style="width:0px;"></td>
                                
                                  
                            </tr>

                            <tr>
                                    <td style="width:150px;">Date : </td>
                                    
                                    <td style="width: 250px;">Total Earned</td>
                                
                                  
                            </tr>
                            

                            <tr  v-for="(item,index) in reportEarnedPerDay" :key="index">
                                    <td style="width:150px;">&nbsp; {{ item.date }}</td>
                                    
                                    <td style="width: 250px;">&nbsp; &#8369; {{item.totalearned}}</td>
                                    
                                  
                            </tr>
                            
                            
                                
            
                 </tbody>
            </table>


                 
                 
            </div>

            
  
    </div>
    


    
    </div>
</div>

  </div>
  

</template>
<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';


export default {
    name: "reportPerDay",
    data() {
        return {
            date_start: '',
            date_end : '',
        }
    },
     computed: {
        ...mapState([
            'reportEarnedPerDay',
        ])
    },
    methods : {
            ...mapMutations([
            'mutate_earned_per_day', //also supports payload `this.nameOfMutation(amount)` 
        ]),
            event_display_order_start_end(){
                var payload = {
                date_start: this.date_start,
                date_end: this.date_end,
                }
                
                this.mutate_earned_per_day(payload)
            },
            print_result(){
                
                        popup()

                        function popup() {
                                var divToPrint = document.getElementById('printEarned');
                                var popupWin = window.open('', '_blank', 'width=300,height=300');
                                popupWin.document.open();
                                popupWin.document.write("<html><head><link rel='stylesheet'  <link href='https://fonts.googleapis.com/css2?family=Montserrat&display=swap' rel='stylesheet' /> <style> table{  font-family: 'Montserrat', sans-serif; }</style> </head><body onload='window.print()'>" + divToPrint.innerHTML + '</html>');
                                popupWin.document.close();
                        }
                
               
            },
    }
}
</script>
<style lang="scss" >
</style>