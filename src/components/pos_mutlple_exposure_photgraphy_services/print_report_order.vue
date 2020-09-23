<template>

     <div class="print_report_order_information" style="font-family: 'Montserrat', sans-serif;">
         <table style="width: 300px; font-family: 'Montserrat', sans-serif; font-size:11px" >
            <tbody>
            <tr style="height: 17px;">
                <td style="height: 17px; width: 181px;">&nbsp;</td>
                <td style="height: 17px; width: 189px; text-align:center;margin:auto">
                    <img style="width:150px" :src="companyInformation[0].image" alt="image" srcset=""/>
                </td>
                <td style="height: 17px; width: 157px;">&nbsp;</td>
            </tr>
          
            </tbody>
            </table >

            <table style="width: 300px; font-family: 'Montserrat', sans-serif; font-size:11px" >
            <tbody>
                  <tr style="width: 300px; text-align:center;">Reciept</tr>
            <tr>
                    <td style="width: 300px;">&nbsp; ID # : {{ report_print_order.id }}</td>
                    <td style="width: 300px; text-align:right">&nbsp; Prepared By : {{report_print_order.preparedBy}}</td>
                    </tr>
            <tr>
                    <td style="width: 300px;">&nbsp;Purchase </td>
                    <td style="width: 300px; text-align:right" >&nbsp; <div>Date Created</div> {{ new Date(report_print_order.date_created).toString().substr(0,21)}}</td>
            </tr>
            
            </tbody>
            </table>
            <table style="width: 300px; font-family: 'Montserrat', sans-serif; font-size:11px" >
            <tbody>
            <tr>
                    <td style="width:20px;">Qty </td>
                    
                    <td style="width: 180px;">Description</td>
                
                    <td style="width: 50px; text-align:right">Total</td>
            </tr>
            

               <tr v-for="(item,index) in report_print_order.customerListOrder" :key="index">
                    <td style="width:20px;">&nbsp; {{ item.quantity }}</td>
                    
                    <td style="width: 180px;">&nbsp; {{item.product }} </td>
                    
                    <td style="width: 50px; text-align:right">&#8369; {{ parseInt(item.totalAmmount)}}</td>
                </tr>
                <tr >
                    <td style="width:20px;">&nbsp; </td>
                    
                    <td style="width: 180px; text-align:right">&nbsp; Subtotal : </td>
                    
                    <td style="width: 50px; text-align:right">&#8369; <strong>{{ parseInt(report_print_order.totalAmountOrder)}}</strong></td>
                </tr>
                  
            
            </tbody>
</table>


     </div>
</template>
<script>
import { mapState } from 'vuex';


export default {
    name: "printable_report_order",
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
            'report_print_order',
            'companyInformation'
        ])
    },
    
}
</script>
<style lang="scss" >
.print_report_order_information{
      display: none;
}
@media print {
    .print_report_order_information{
            font-family: 'Montserrat', sans-serif;
    }
     
}
</style>