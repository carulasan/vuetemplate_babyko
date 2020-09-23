<template>
     <div>
           <q-uploader
           style="width:100%"
            color="white"
            text-color="secondary"
            class="shadow-0"
            flat
            label="Upload Image"
            @added="upload"
            :no-thumbnails="image_thumbmails"
          />
       
                  
                      
     </div>
</template>
<script>
import axios from "axios";
import { mapState } from 'vuex';
import { mapActions } from 'vuex';





export default {
    name: "uppload",
     computed: {
        ...mapState([
            'global_hostname',
            'companyInformation',
            'config'
        ]),
         
    },
    data() {
        return {
            image_thumbmails: true,
            model_image_id : 0,
        }
    },
    methods: {
         ...mapActions([
            'get_companyInformation', //also supports payload `this.nameOfAction(amount)` 
            'action_getImages'
        ]),
        update_companyInformation(id){
            var payload = {
                 "companyName": this.companyInformation[0].companyName,
        "aboutCompany": this.companyInformation[0].aboutCompany ,
        "logo": id,
        "address": this.companyInformation[0].address,
            }
            axios.put(`${this.global_hostname}/api/CompanyInformation/1/`,payload,this.config)
                .then(res => {
                    console.log(res)
                    this.action_getImages()
                  
                    this.$q.loading.show({ 'message' : 'Updating...'})
                   
                    
                    setTimeout(() => {
                        
                        this.get_companyInformation()
                        this.$q.loading.hide()
                    }, 2000);
                })
                .catch(err => {
                    console.error(err); 
                })
                
        },
         upload(files) {
           
            console.log(files);
            let data = new FormData();
            data.append("image", files[0]);
           
           this.$q.dialog({
               title: 'Confirm',
               message: 'Would you like to Update the Company Logo?',
               cancel: true,
               persistent: true
               }).onOk(() => {
                    axios
                .post(`${this.global_hostname}/api/FilesImages/`, data,this.config)
                .then((response) => {
                this.model_image_id = response.data.id;
                this.update_companyInformation(response.data.id)
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
                this.$q.notify({
                    //put dollor sign(q)
                    message: `Image Successfully Uploaded!`,
                    timeout: 1000, // in milliseconds; 0 means no timeout
                    color: "primary",
                    textColor: "white", // if default 'white' doesn't fit
                    icon: "check", //or  avatar: 'statics/boy-avatar.png',
                    position: "top", // 'top', 'left', 'bottom-left' etc.
                });
                
                })
                .catch((error) => {
                    console.log(error);
                 this.$q.notify({
                    //put dollor sign(q)
                    message: `Error!`,
                    timeout: 1000, // in milliseconds; 0 means no timeout
                    color: "red",
                    textColor: "white", // if default 'white' doesn't fit
                    icon: "error", //or  avatar: 'statics/boy-avatar.png',
                    position: "bottom", // 'top', 'left', 'bottom-left' etc.
                });


                });

               }).onOk(() => {
                }).onCancel(() => {
                }).onDismiss(() => {
           })
           
        },
    },
}
</script>
<style lang="scss" >
</style>