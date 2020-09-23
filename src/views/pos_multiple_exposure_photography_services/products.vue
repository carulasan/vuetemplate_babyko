<template>

     
            <!-- height: 500px; overflow-x: scroll; -->
          <div class="row" style="width : 100%; " >
              <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin:auto; ">
                <q-breadcrumbs>
                    <q-breadcrumbs-el label="Products" icon="loyalty" />
                    <q-breadcrumbs-el label="" />
                    
                </q-breadcrumbs>
        </div>

            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <products /> 
            </div>
          </div>
    
</template>
<script>
import products from "../../components/pos_mutlple_exposure_photgraphy_services/products.vue";
export default {
    name: "Home",
     components: {
    products,
   
  },
}
</script>
<style lang="scss" >
</style>