<template>

     <div class="print_supply" style="font-family: 'Montserrat', sans-serif;">
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
            <td style="width: 300px;">&nbsp; ID # : {{ reciept_id }}</td>
            <td style="width: 300px; text-align:right">&nbsp; Prepared By : {{global_preparedby}}</td>
            </tr>
            <tr>
            <td style="width: 300px;">&nbsp; Purchase</td>
            <td style="width: 300px; text-align:right" >&nbsp; {{ new Date().toString().substr(0,21)}}</td>
            </tr>
            </tbody>
            </table>
            <table style="width: 300px; font-family: 'Montserrat', sans-serif; font-size:11px" >
            <tbody>
            <tr>
                    <td style="width:50px;">Qty </td>
                    
                    <td style="width: 300px;">Description</td>
                    <td style="width: 50px; text-align:right">Total</td>
                    </tr>
            

               <tr v-for="(item,index) in customerOrder_for_reciept" :key="index">
                    <td style="width:50px;">&nbsp; {{ item.quantity }}</td>
                    
                    <td style="width: 250px;">&nbsp; {{item.productName }} </td>
                    <td style="width: 100px; text-align:right">&#8369; {{ item.totalAmmount }}</td>
                </tr>
                     <tr>
                    <td style="width:50px;">&nbsp;..........  </td>
                    
                    <td style="width: 250px; text-align:right">........................................................................................</td>
                    <td style="width: 100px;"> &nbsp;..............</td>
                    </tr>
                    <tr>
                    <td style="width:50px;">&nbsp;  </td>
                    
                    <td style="width: 250px; text-align:right">&nbsp;Subtotal : </td>
                    <td style="width: 100px; text-align:right ;font-size:13px">&#8369; <strong>{{ customer_subtotal_order }}</strong></td>
                    </tr>
            
            </tbody>
</table>
 <table style="width: 300px; font-family: 'Montserrat', sans-serif; font-size:11px" >
            <tbody>
            <tr style="height: 17px;">
                <td style="height: 17px; width: 181px;">&nbsp;</td>
                <td style="height: 17px; width: 189px; text-align:center;margin:auto">
                    <img style="width:200px"  :src="global_hostname+ '/wilmarMediaFiles/MediaFiles/terms_and_conditions.JPG'" alt="image" srcset=""/>
                </td>
            <td style="height: 17px; width: 157px;">&nbsp;</td>
            </tr>
            </tbody>
            </table >

     </div>
</template>
<script>
import { mapState } from 'vuex';


export default {
    name: "printable",
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
            'companyInformation'
        ])
    },
    
}
</script>
<style lang="scss" >
.print_supply{
     display: none;
}
@media print {
    .print{
            font-family: 'Montserrat', sans-serif;
    }
     
}
</style>