<template>
    <div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                axios topic 
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
                <button  v-for="(item,index) in multipleobjectlist" :key="index">{{item.name}} </button>
            </div>
           <!-- pag e loop mo yung object baby na json file -->
           <!-- ******************************************************** -->
            <!-- ************************************************** -->

           <q-btn color="primary" icon="check" label="save data" @click="create_ng_data" />
           
           <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <h1>3 MINUTES WAIT......... GALING ITO SA API. galing sa (get_ng_data) na function</h1>

               {{ DATA_GET }}
           </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <h6>  delete</h6>
              <q-btn color="primary" icon="check" label="delete" @click="delete_ng_data(56)" />

              <q-btn color="secondary" size="lg" icon="check" label="GO TO Firebase Dashboard" @click="goto_dash" />

              
           </div>
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
           DATA_GET : [],

       }
   },
   methods : {
       goto_dash(){
           this.$router.push('/dashboard')
       },
    tinawagakonimount(){
                   alert('ako naman! bakit - hello baby')
                  
                       alert('mag lalagay ako n data objec')
                       var sample_object =    {
                               name : 'men',
                               age : 14
                           }
                       
                      setTimeout(() => {
                          
                        this.baby.push(sample_object)
                       
                               
                                
                                
                                
                      

                      }, 5000);
                       
                  
                   
           },
           create_ng_data(){
                  
                   axios.post(``,)
                   .then(res => {
                       console.log(res)
                   })
                   .catch(err => {
                       console.error(err);    
                   })
           },

           get_ng_data(){
                var link = "https://jsonplaceholder.typicode.com/todos/"
                   
                   axios.get(`${link}`)
                   .then(res => {
                       console.log(res)
                       this.DATA_GET = res.data
                   })
                   .catch(err => {
                       console.error(err);    
                   })
           },
           delete_ng_data(id){
                 
                   axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}/`,)
                   .then(res => {
                       console.log(res)
                       alert('deleted - gumagana yan')
                   })
                   .catch(err => {
                       console.error(err);    
                   })
           },
           update_ng_data(){
                   
                   axios.put()
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
       setTimeout(() => {
           this.get_ng_data()
       }, 4000);
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






