<template>
     <div class="row">
         <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8" style="margin:auto">
              <q-table style="border-radius:  10px;" class="animate__animated animate__fadeIn shadow-1"  :filter="filter"  :selected.sync="selected"  :data="orderList" :columns="allrecord_column" row-key="id">
                    <template v-slot:top-right>
                            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                            </q-input>
                    </template>
                    <template v-slot:body="props">
                        
                        <q-tr :props="props" style="cursor :pointer ;">
                             
                            <q-td key="product" :props="props">
                                    {{ props.row.product }}
                            </q-td> 
                            <q-td key="price" :props="props">
                                    {{ props.row.price }}
                            </q-td> 
                            <q-td key="quantity" :props="props">
                                    {{ props.row.quantity }}
                            </q-td> 
                            <q-td key="totalAmmount" :props="props">
                                    {{ props.row.totalAmmount }}
                            </q-td> 
                            <q-td key="date_created" :props="props">
                                    {{ new Date(props.row.date_created).toString().substr(0,15) }}
                            </q-td> 
                         </q-tr>
                    </template>
              </q-table>


         </div>
     </div>
</template>
<script>
import { mapState } from 'vuex';


export default {
    name: "allRecordsOrder",
    computed: {
        ...mapState([
            'orderList',
            'global_hostname'
        ])
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
            filter : '',


        }
    },
    methods : {
          
    }
}
</script>
<style lang="scss" >
</style>