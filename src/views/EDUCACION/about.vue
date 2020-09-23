<template>
     <div>
          <div class="row">
             <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h1>about</h1>
                    <h6></h6>
                    <q-btn color="primary" icon="check" label="go to contact" @click="gotohome('/contact')" />
             </div>
         </div>
     </div>
</template>
<script>
export default {
    name: "Home",
    data () {
        return {

        }
    },
    methods : {
        gotohome(mypath){
            this.$router.push(mypath)
        },
    }
}
</script>
<style lang="scss" >
</style>