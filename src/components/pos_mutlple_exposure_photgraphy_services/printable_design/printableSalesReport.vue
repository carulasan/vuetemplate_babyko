<template>

     <div class="print_supply" style="font-family: 'Montserrat', sans-serif;">
         <table style="width:300px; font-family: 'Montserrat', sans-serif; font-size:11px" >
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

            <table style="width:300px; font-family: 'Montserrat', sans-serif; font-size:11px" >
            <tbody>
            <tr>
                    <td style="width:300px; font-size:20px; font-weight : 800;">&nbsp; Sales Report</td>
                   
            </tr>
            <tr>
                    <td style="width:300px;">&nbsp; Date : {{ state_date_print}}</td>
                   
            </tr>
            </tbody>
            </table>
            <table style="width:300px; font-family: 'Montserrat', sans-serif; font-size:11px" >
            <tbody>
            <tr>
                  
                    
                    <td style="width: 200px;">Product</td>
                      <td style="width:25px;">Price </td>
                      <td style="width:10px;">Qty </td>
                    <td style="width: 50px; text-align:right">Total</td>
                    </tr>
            

               <tr v-for="(item,index) in  print_sales" :key="index">
                    
                    <td style="width: 200px;">&nbsp; {{item.product }} </td>
                    <td style="width: 25px;">&nbsp; {{item.price }} </td>
                    <td style="width:10px;">&nbsp; {{ item.quantity }}</td>
                    <td style="width: 50px; text-align:right">&#8369;  {{ item.totalAmmount }}</td>
                </tr>
                     <tr>
                    <td style="width:200px;">&nbsp;..........  </td>
                     <td style="width:25px;">&nbsp;..........  </td>
                    <td style="width: 10px;">..................</td>
                    <td style="width:50px;"> &nbsp;..............</td>
                    </tr>
                    <tr>
                    <td style="width:200px;">&nbsp;  </td>
                     <td style="width:25px;">&nbsp;  </td>
                    <td style="width: 10px; text-align:right">&nbsp;Subtotal : </td>
                    <td style="width: 50px; text-align:right ;font-size:13px">&#8369; <strong>{{ print_sales_subtotal }}</strong></td>
                    </tr>
            
            </tbody>
</table>


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
            'companyInformation',
            'print_sales',
            'state_date_print'
        ]),
        print_sales_subtotal() {
            var count = 0
            this.print_sales.forEach(element => {
                count = count + parseFloat(element.totalAmmount)
            });
            return count

        }

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