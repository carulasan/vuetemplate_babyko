<template>
    <div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div>{{ baby }}</div>
                   <!-- ito yung pag access ng data sa data () return {} sa baba baby -->
                   <!-- ************************************************ -->
                   <h1 class="classako">{{ title }}</h1>
                   <div>{{ mylist }} {{ mylist[0] }}</div>
                   <div>{{ myobject }}</div>
                   <div>{{ multipleobjectlist[1].name }}</div>
                   <!-- ********************************************* -->
                  
            </div>
            <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                <button v-for="(item,index) in multipleobjectlist" :key="index">{{item.name}} </button>
            </div>
           <!-- pag e loop mo yung object baby na json file -->
           <!-- ******************************************************** -->
            
           
        
            <!-- ************************************************** -->

           <q-btn color="primary" icon="check" label="save data" @click="create_ng_data" />
           
        </div>

    </div>
</template>
<script>

// palagi to ito baby pang fetch ng json file tuturo ko to madali lang to
import axios from "axios";

export default {
   name: "Home",
   data () {
       return {

           title : 'Educacion', //string dba
           mylist : ['baby1','baby2'], //array
           myobject : {name : 'brylle',age : 22}, //object to baby
           multipleobjectlist : [ {name : 'button1',age : 14}, {name : 'button2',age : 525}, {name : 'button3',age : 89}],
           baby : [],

       }
   },
   methods : {
    tinawagakonimount(){
                   alert('ako naman! bakit - hello baby')
                  
                       alert('mag lalagay ako n data objec')
                       var sample_object =    {
                               name : 'men',
                               age : 14
                           }
                       
                      setTimeout(() => {
                          
                        this.baby.push(sample_object)
                        setTimeout(() => {
                               
                                this.$router.push('/dashboard')
                                
                                
                        }, 1000);

                      }, 1000);
                       
                  
                   
           },
           create_ng_data(){
                   var data = {

                   }
                   axios.post(`${this.state.global_hostname}/api/refresh/`,data)
                   .then(res => {
                       console.log(res)
                   })
                   .catch(err => {
                       console.error(err);    
                   })
           },

           get_ng_data(){
                   var data = {

                   }
                   axios.get(`${this.state.global_hostname}/api/refresh/`,data)
                   .then(res => {
                       console.log(res)
                   })
                   .catch(err => {
                       console.error(err);    
                   })
           },
           delete_ng_data(){
                   var data = {

                   }
                   axios.delete(`${this.state.global_hostname}/api/refresh/`,data)
                   .then(res => {
                       console.log(res)
                   })
                   .catch(err => {
                       console.error(err);    
                   })
           },
           update_ng_data(){
                   var data = {

                   }
                   axios.put(`${this.state.global_hostname}/api/refresh/`,data)
                   .then(res => {
                       console.log(res)
                   })
                   .catch(err => {
                       console.error(err);    
                   })
           }


   },
   mounted () {
       alert('Mounted ako - ibig sabihin fully load ng yung html')
       this.tinawagakonimount()
       //nasa method lahat ng event
   },
   beforeMount () {
       alert('Hello Baby before mount')
   },

   
}

</script>
<style lang="scss" >
.classako{
   color: green;
}
</style>






