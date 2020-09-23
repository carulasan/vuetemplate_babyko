<template>
  <div class="parent">
  <div class="row">
       <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin:auto; ">
                <q-breadcrumbs>
                    <q-breadcrumbs-el label="Transaction" icon="receipt_long" />
                    <q-breadcrumbs-el label="" />
                    
                </q-breadcrumbs>
        </div>
  </div>

    <div class="row">
      
      
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
        <customerOrder />
      
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-8"  >
    
        <div class="row "  >
                <div
                  class="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  style="text-align: center ; padding:10px ; font-size:18px ;"
                  v-if="products_info[0]"
                >{{ products_info.categoryName }}</div>

                <div v-if="products_info.length <= 0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                      <img
                        class="animate__animated animate__fadeInUp"
                        style="margin: auto ; width : 50%"
                        :src="global_hostname+'/wilmarMediaFiles/mediaFiles/image_empty.png'"
                      />
                </div>
          <!-- style="height : 500px; overflow-x: scroll;" -->
         <div class="row "   v-if="products_info" >
           
           
            <!-- wilmarMediaFiles/MediaFiles/MANUALINPUT.JPG -->

          <div 
          class="col-xs-4 col-sm-6 col-md-4 col-lg-2  animate__animated animate__fadeInUp"
          v-for="(item,index) in products_info"
          :key="index"
          :style="item.price == 0 ? 'padding :3px; margin-top : 17px' : 'padding :3px;'  " 
        >

          <q-card
            @click="event_add_to_customer_order(item,products_info.categoryName)"
            class="my-card shadow-0 animate__animated animate__fadeIn"
            style="cursor:pointer; border-bottom: 2px solid #ffb400 ; margin:2px ; width: 100%;"
          >
            <img
              style=" margin: auto"
              :src="item.actual_image"
              
            />
            <q-card-section style="padding: 1px;">
             
              <div  style="text-align:left ; ">
                <div class="product_title" >{{ item.productName }}</div>
               <div style="color: #34495E;  font-size: 15px ; font-weight : 700"> 
                  &#8369; {{ item.price }}
               </div>
                
                </div>
              <div
                class="text-subtitle2"
                style="text-align:left ; font-size: 11px "
              >
              <!-- Item ID : {{ item.id }} -->
              </div>
            </q-card-section>
          </q-card>
        </div>


      
        </div>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

import customerOrder from "../../components/pos_mutlple_exposure_photgraphy_services/customerOrder.vue";



import { mapMutations } from 'vuex';



export default {
  name: "Home",
  components: {
   
    customerOrder,
  },
  computed: {
    ...mapState([
      "global_hostname",
      "categoryList",
      "productList",
      "products_info",
      "customerOrder",
      "user_clicked_category",
      "customer_subtotal_order",
      "token",
      'config'
    ]),
    ...mapGetters(["categoryAndProduct"]),
  },

  data() {
    return {};
  },
  methods: {
    ...mapMutations([
      'mutate_subtotal', //also supports payload `this.nameOfMutation(amount)` 
    ]),
   
    event_add_to_customer_order(item,categoryName){
      var price = 0
        if (parseFloat(item.price) <=0) {
                    var itemName = prompt("Please enter Item/Product Name: ", '');
                    if (itemName.length <=0) {
                      alert('Please Enter Item/Product Name :')
                      return
                      
                    }
                    item.productName  = itemName
                    var value = prompt(`Please enter the price of ${itemName}`, 0);
                    if (value == null || value == "") {
                      alert('Please Enter a Price :')
                        return
                    
                    } else {
                      try {
                          if (isNaN(parseFloat(value))) {
                            alert('You have inputed a text , Please Enter a Price/A number ')
                            return
                          }else{
                              
                              if (parseFloat(value) <= 0) {
                                  alert('Price must no be zero')
                                  return
                              }else{
                                price = value
                              }
                          }
                            
                        } catch (error) {
                          alert('error')
                          return
                        }
                    
                      
                    }

        }else{
          price = item.price
        }
       console.log(categoryName)
       

       var payload = {
         actual_image: item.actual_image,
        date_created: item.date_created,
        date_updated: item.date_updated,
        id: item.id,
        image: item.image,
        price: price,
        productCategory: item.productCategory,
        productCategory_information: item.productCategory_information,
        productName: item.productName  + '-' + categoryName,
        quantity: item.quantity,
        url: item.url
       }
     
        payload.totalAmmount = parseFloat(payload.price) * parseInt(payload.quantity)

       
        this.customerOrder.push(payload)
        this.$q.notify({ //put dollor sign(q)
           message: `Successfully Added to Customer Cart!`,
           timeout: 1000, // in milliseconds; 0 means no timeout
          color: 'primary',
          textColor: 'white', // if default 'white' doesn't fit
          icon: 'check', //or  avatar: 'statics/boy-avatar.png',
          position: 'top-left', // 'top', 'left', 'bottom-left' etc.
        })
        
      this.mutate_subtotal()
    },
  },
  mounted() {
     setTimeout(() => {
        console.log(this.categoryAndProduct)
      }, 2000);
      
  },
};
</script>
<style lang="scss" >

@import "../../styles/_variables.scss";



.text-subtitle2 {
  color: $primary;
}
.product_title{
  white-space: nowrap; 
  overflow: hidden;
  color: #34495E;font-size:12px; text-overflow: '...';
}



</style>