<template>
     <div>
         <div class="row">
             <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8" style="margin:auto; padding:10px">

                <img style="max-height : 200px ;max-width : 200px ; margin: auto"  :src="companyInformation[0].image">
           
             </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:10px">
                  <div> {{  companyInformation[0].companyName }}</div>
                   <div> <small>{{  companyInformation[0].address }}</small></div>
                </div>
                 <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8" style="margin:auto;">
                   <div class="about_information">
                       <p>{{ companyInformation[0].aboutCompany }}</p>
                   </div>
                </div>
                
         </div>
     </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: "about_component",
    computed: {
        ...mapState([
            'companyInformation',
        ])
    },
    mounted () {
        
    },
}
</script>
<style lang="scss" >

@import "../../../styles/_variables.scss";
@import "../../../styles/quasar.sass";

.about_information{
    text-decoration: justify;
    text-align: left;
    padding : 10px;
    
}
</style>