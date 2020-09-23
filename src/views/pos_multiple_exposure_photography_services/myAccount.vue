<template>
     <div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <myAccountComponent />
                    
            </div>
        </div>
     </div>
</template>
<script>
import myAccountComponent from '../../components/pos_mutlple_exposure_photgraphy_services/myAccount_components/myAccountComponent.vue'





export default {
    name: "myAccount",
    components:{
        myAccountComponent,
    },
    
}
</script>
<style lang="scss" >
</style>