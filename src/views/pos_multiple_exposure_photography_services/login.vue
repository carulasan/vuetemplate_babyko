<template>
     <div class="row">
         <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4" style="margin:auto;text-align:center;">
         <loginComponent />
         </div>
     </div>
</template>
<script>


import loginComponent from '../../components/pos_mutlple_exposure_photgraphy_services/loginComponent.vue'




export default {
    name: "login",
    components:{
    loginComponent,
},
    data() {
        return {
           
        }
    },
      methods: {
        
    },
    beforeMount () {
        
        
    },
}
</script>
<style lang="scss" >
</style>