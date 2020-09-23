<template>
     <div>
         <div class="row">
             <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <aboutComponent />
             </div>
         </div>
     </div>
</template>
<script>
import aboutComponent from '../../components/pos_mutlple_exposure_photgraphy_services/about_component/aboutComponent.vue'



export default {
    name: "Home",
    components:{
    aboutComponent,
}
}
</script>
<style lang="scss" >
</style>