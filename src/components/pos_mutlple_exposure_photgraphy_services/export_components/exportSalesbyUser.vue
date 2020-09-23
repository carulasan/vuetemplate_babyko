<template>
  <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <q-expansion-item
               expand-separator
               icon="perm_identity"
               label="Sales from a User"
               caption="John Doe"
               group="somegroup"
               style="text-align:left;"
               class="expansion_style"
               default-opened
             >
              <div class="row" style="padding:10px">
                   <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 animate__animated animate__fadeInUp  ">
                            To export the information, please select start date and end date , then click the button export.
                    </div>
                     <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4" style="padding:5px">
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
                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4" style="padding:5px">
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

                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <q-btn color="primary" icon="double_arrow" label="Export"  @click="export_to_xls(date_start,date_end)" />
                       
                        
                  </div>
                   <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top:20px">
                       <div> Export all records here.</div>
                        <q-btn color="secondary" icon="double_arrow" label="Export all"  @click="export_to_xls_all" />
                        
                  </div>
              </div>
             </q-expansion-item>
      </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';


export default {
    name: "exportOrder",
     computed: {
        ...mapState([
            'global_hostname',
        ])
    },
    data() {
        return {
            date_start: '',
            date_end : ''
            
        }
    },
    methods : {
           
             export_to_xls_all(){
                window.location.href = `${this.global_hostname}/export_to_excell_all_orders/`
                    
            },
           export_to_xls(start,end){
      
       
     
       try {
          var sdy = parseInt(new Date(start).getFullYear())
        var sdm = parseInt(new Date(start).getMonth()) + 1
        var sdd = parseInt(new Date(start).getDate())

          var enddy = parseInt(new Date(end).getFullYear())
        var enddm = parseInt(new Date(end).getMonth()) + 1
        // + 1 kasi sa backend yung range nya ya no output pag exact 1 django orm problems
        var enddd = parseInt(new Date(end).getDate()) + 1 
       } catch (error) {
         
         console.log(error)
         alert('Please enter a valid Date')
         return
       }
        console.log(sdy)
        console.log(sdm)
        console.log(sdd)
        console.log(enddy)
        console.log(enddm)
        console.log(enddd)
     

        window.location.href= `${this.global_hostname}/export_to_xls/${sdy}/${sdm}/${sdd}/${enddy}/${enddm}/${enddd}/`
    },

    }
}
</script>
<style lang="scss" >

</style>