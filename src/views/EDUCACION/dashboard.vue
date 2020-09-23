<template>
     <div>
         <div class="row">
             <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                 
                    <h1>dashboard  Firebase</h1>
                    <div>Ito na yung firebase </div>
                    <h6>{{ dash }}</h6>
                    <q-btn color="primary" icon="check" label="go to about" @click="change_link" />
                    {{ usersData }}
             </div>
             <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                 <q-btn color="primary" @click="create"  label="Create User" />
                
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <q-btn color="secondary"  @click="get_data" label="Get User" />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <q-btn color="secondary" @click="update"  label="Update" />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <q-btn color="secondary" @click="delete_fun"  label="Delete" />
            </div>


         </div>
     </div>
</template>
<script>
import { Loading } from 'quasar' 
export default {
    name: "Dashboard",
    data () {
        return {
            dash : 'Dashboard',
            firebaseConfig : {
                apiKey: "AIzaSyCOZnFI76L2nV0Og0eQ9uF-AmqIlQUsX0Q",
                authDomain: "educacion-503ba.firebaseapp.com",
                databaseURL: "https://educacion-503ba.firebaseio.com",
                projectId: "educacion-503ba",
                storageBucket: "educacion-503ba.appspot.com",
                messagingSenderId: "718184648370",
                appId: "1:718184648370:web:0329f453343ea6e7ff03ab"
            },
            usersData : []
        }
    },
    methods : {
        change_link(){
            this.$router.push('/about')
        },
        // /* eslint-disable */   some code here // if gusto mo e skip ang code na wrong para kay eslint. malalaman mo yan baby kasi menomonitor ang code mo dito iwas mali.
        
        async  create(){
            
   
         /* eslint-disable */   firebase.database().ref('users/' + 13).set({
                                username: 'Brylle',
                                email: 'cycarulasan',
                                image_link : 'basta imagei link dito love'
                });
                        // //get user
                        // var starCountRef = firebase.database().ref('users');
                        //      starCountRef.on('value', function(snapshot) {
                        //         console.log('res')
                        //         console.log(snapshot.val())
                        // });
                        // or
                        //call the getdata 
                    this.get_data()
                                                
                    
                    
        },
      async  get_data(){
        // https://medium.com/@hasangi/writing-deleting-and-updating-data-in-firebase-realtime-database-with-javascript-f26113ec8c93
            // baby dito may async await 
                Loading.show()
                var data = []
                var users = firebase.database().ref('users');
            // itong await taposin nya muna e execute ang users.on tska sya bababa sa line 89
                await users.on('value', function(snapshot) {
                                    console.log(snapshot.val())
                                    data = snapshot.val()
                });
            // need ng timeout para mag triger ang usersData sa html
                setTimeout(() => {
                    this.usersData = data
                    Loading.hide()
        
                }, 2000);
                

      
                 
        },

        async update(){
         /* eslint-disable */   var users = firebase.database().ref('users');
            var object_update = {
                email : 'mahal na mahal kita Will you mary me. hindi kita ipag papalit. sobra kitang mahal. magsisipag pa ako promise ikaw gusto ko makasama!'
            }
            await users.child('13').update(object_update)
            this.get_data()
            
            
        }
        ,
        async delete_fun(){
           
         /* eslint-disable */   let userRef = firebase.database().ref('users/' + '13');
            userRef.remove()
            this.get_data()
            
            
            
           
            
            
        }
  

    },
    mounted(){
        
        


    },

}
</script>
<style lang="scss" >
</style>