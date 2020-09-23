<template>
     <div class="row">
        

         <div class="col-xs-12 col-sm-8 col-md-10 col-lg-10 shadow-1" style="margin:auto;border-radius:  10px; padding :20px ;margin-top:10px">
             
             <exportSales />
              
         </div>

         
     </div>
</template>
<script>

import exportSales from '../../components/pos_mutlple_exposure_photgraphy_services/export_components/exportSales.vue'




export default {
    name: "export",
    components:{
            exportSales,
            
        }
}
</script>
<style lang="scss" >

@import "../../styles/_variables.scss";



.expansion_style{
    color : $secondary
}
</style>