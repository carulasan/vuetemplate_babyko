<template>
  <div style="margin-bottom:50px">
        <div class="row" > 
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin:auto; ">
            <q-breadcrumbs>
            <q-breadcrumbs-el label="Settings" icon="settings" />
            <q-breadcrumbs-el label />
            </q-breadcrumbs>
        </div>
        </div>
        <div class="row animate__animated animate__fadeIn" style="margin-top:20px">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"  >
              <adminAccount  />
          
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top:10px"  >
              <employees_account  />
          </div>
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top:10px"  >
             <companyInformation />
          </div>
         
        
        </div>

  </div>
</template>
<script>
import adminAccount from '../../components/pos_mutlple_exposure_photgraphy_services/settings_components/admin_accounts.vue'
import employees_account from '../../components/pos_mutlple_exposure_photgraphy_services/settings_components/employees_account.vue'
import companyInformation from '../../components/pos_mutlple_exposure_photgraphy_services/settings_components/company_information.vue'
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';


export default {
  name: "accounts",
    components:{
    adminAccount,
    employees_account,
    companyInformation,
  },
    computed: {
    ...mapGetters([
    
    ])
  },
  beforeMount () { 
     
      
  },
  methods : {
       ...mapActions([
     
     
    ]),
  }
}
</script>
<style lang="scss" >
</style>