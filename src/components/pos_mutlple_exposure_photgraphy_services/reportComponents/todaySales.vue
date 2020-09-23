<template>
    <div>
         <div class="row">
         <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8" style="margin:auto">
            <div class="row animate__animated animate__fadeIn" style="margin:auto" >
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin:auto">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="money" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="reports_earned">&#8369; {{ get_earned_today }} </q-item-label>
                  <q-item-label class="reports_subtitle" lines="2">Today's Earned</q-item-label>
                </q-item-section>
               
              </q-item>
            </div>
          </div>

              <q-table style="border-radius:  10px;" class="animate__animated animate__fadeIn shadow-1"  :rows-per-page-options="[0]"  :selected.sync="selected"  :data="getters_today_sales" :columns="allrecord_column" row-key="id">
                    
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
     </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';



export default {
    name: "allRecordsOrder",
    computed: {
        ...mapState([
            'orderList',
            'global_hostname'
        ]),
         ...mapGetters([
            'getters_today_sales',
        ]),get_earned_today(){
            var count = 0
            this.getters_today_sales.forEach(element => {
                count = count + parseFloat(element.totalAmmount)
            });
                  return count
            },
    },
    data() {
        return {
           allrecord_column: [
                    { name: "product", label: "Product", field: "product" ,sortable: true,  align: "left"},
                    { name: "price", label: "Price", field: "price" ,sortable: true,  align: "right"},
                    { name: "quantity", label: "Quantity", field: "quantity" ,sortable: true,  align: "right"},
                    { name: "totalAmmount", label: "Total Amount", field: "totalAmmount" ,sortable: true,  align: "right"},
                    { name: "date_created", label: "Date", field: "date_created" ,sortable: true,  align: "left"},
                    
            ],
            allrecord_data : [
                {id : 1},
                {id : 2}
            ],
            selected : [],
            

        }
    },
    methods : {
          
    }
}
</script>
<style lang="scss" >

</style>