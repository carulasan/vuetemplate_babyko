<template>

     <div class="print_supplies" style="font-family: 'Montserrat', sans-serif;">
         <table style="width: 300px; font-family: 'Montserrat', sans-serif; font-size:11px" >
            <tbody>
            <tr style="height: 17px;">
                <td style="height: 17px; width: 181px;">&nbsp;</td>
                <td style="height: 17px; width: 189px; text-align:center;margin:auto">
                    <img style="width:150px"  :src="companyInformation[0].image" alt="image" srcset=""/>
                </td>
            <td style="height: 17px; width: 157px;">&nbsp;</td>
            </tr>
            </tbody>
            </table >

            <table style="width: 300px; font-family: 'Montserrat', sans-serif; font-size:11px" >
            <tbody>
            <tr>
                    <td style="width: 300px;">&nbsp; ID # : {{ supplies_to_print.id }}</td>
                    <td style="width: 300px; text-align:right">&nbsp; Prepared By : {{supplies_to_print.preparedBy}}</td>
                    </tr>
            <tr>
                    <td style="width: 300px;">&nbsp; <div>Supplier :</div> {{ supplies_to_print.supplier}}</td>
                    <td style="width: 300px; text-align:right" >&nbsp; <div>Date Created</div> {{ new Date(supplies_to_print.date_created).toString().substr(0,21)}}</td>
            </tr>
             <tr>
                    <td style="width: 300px;">&nbsp; Status : <span v-if="supplies_to_print.status == true">Paid</span> <span v-else>Unpaid</span> </td>
                    <td style="width: 300px; text-align:right" >&nbsp; Total : <strong>{{supplies_to_print.totalAmount}}</strong></td>
            </tr>
            </tbody>
            </table>
            <table style="width: 300px; font-family: 'Montserrat', sans-serif; font-size:11px" >
            <tbody>
            <tr>
                    <td style="width:20px;">Qty </td>
                    
                    <td style="width: 160px;">Product Name</td>
                    <td style="width: 20px;">Unit</td>
                     <td style="width: 50px; text-align:right">Price </td>
                    <td style="width: 50px; text-align:right">Total</td>
            </tr>
            

               <tr v-for="(item,index) in supplies_to_print.suppliesListItem" :key="index">
                    <td style="width:20px;">&nbsp; {{ item.quantity }}</td>
                    
                    <td style="width: 160px;">&nbsp; {{item.productName }} </td>
                     <td style="width:20px;">&nbsp; {{ item.unit }}</td>
                     <td style="width: 50px; text-align:right">&#8369; {{ parseInt( item.price) }}</td>
                    <td style="width: 50px; text-align:right">&#8369; {{ parseInt(item.totolPrice)}}</td>
                </tr>
                  
            
            </tbody>
</table>


     </div>
</template>
<script>
import { mapState } from 'vuex';


export default {
    name: "printableSupplies",
    data() {
        return {
           
        }   
    },
    computed: {
        ...mapState([
            'global_hostname',
            'customerOrder_for_reciept',
            'customer_subtotal_order',
            'global_preparedby',
            'reciept_id',
            'supplies_to_print',
            'companyInformation'
        ])
    },
    
}
</script>
<style lang="scss" >
.print_supplies{
     display: none;
}
@media print {
    .print_supplies{
            font-family: 'Montserrat', sans-serif;
    }
     
}
</style>