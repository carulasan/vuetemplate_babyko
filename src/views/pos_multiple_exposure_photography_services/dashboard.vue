<template>
     <div style="padding-bottom : 100px">
         <div class="row">
             <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8" style="text-align :left; margin:auto;">
                 <h4 style="padding : 0; margin : 0px ; ">Welcome Back!</h4>
                  <h6 style="padding : 0; margin : 0px ; font-size : 15px">Monitor your pending regularly</h6>
             </div>
         </div>
         <div class="row" style="margin-top : 20px">
             <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8" style="margin:auto;">
                    <labelcomponent />
             </div>
         </div>
          <div class="row" style="margin-top : 20px">
             <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8" style="margin:auto;">
                        <pendingChart />
             </div>
         </div>
     </div>
</template>
<script>
import labelcomponent from '../../components/pos_mutlple_exposure_photgraphy_services/dashboard_component/label_component.vue'
import pendingChart from '../../components/pos_mutlple_exposure_photgraphy_services/dashboard_component/pendingChart.vue'

import { Loading } from 'quasar' 


export default {
    name: "dashboard",
    components:{
    labelcomponent,
    pendingChart,
    
},mounted () {
     Loading.hide();
},
}
</script>
<style lang="scss" >
</style>