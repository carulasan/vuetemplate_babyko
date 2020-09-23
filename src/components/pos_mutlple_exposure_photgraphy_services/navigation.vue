<template>
  <q-layout view="lhh lpr fFf">
    <q-header reveal  class="bg-white text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" color="primary" @click="left = !left" />

        <q-toolbar-title style="color: #ffb400;">
      
        

         Multiple Exposure Photography Services
        </q-toolbar-title>
        <span class="user_label">
        <span v-if="instance[0].is_superuser == false"><small  >User Type : Employee</small>  | <small>{{ instance[0].first_name }}</small></span> 
        <span  v-else> <small >User Type : Admin</small>  | <small>{{ instance[0].first_name }}</small></span>
        
        </span>
        <span>
         
          <q-btn color="primary" dense flat icon="exit_to_app" outline @click="event_logout"  />
        </span>
        <span>

          <q-btn dense flat round icon="category" color="secondary" @click="right = !right" />
        <q-tooltip >
          Category
        </q-tooltip>
        </span>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" >
      <!-- drawer content -->
      <q-img
      class="logo animate__animated animate__fadeInUp"
        :src="companyInformation[0].image"
        spinner-color="primary"
        spinner-size="82px"
      />

      <q-list class="animate__animated animate__fadeInLeft"  @click="change_path(item)" v-for="(item,index) in getters_instance_access_level" :key="index">
  
          <q-item clickable v-ripple  v-if="item.accessLevel['view'] == true"  >
            <q-item-section avatar>
              <q-icon color="primary" :name="item.icon" />
            </q-item-section>
            <q-item-section class="title">{{item.title}}</q-item-section>
          </q-item>
          
      </q-list>

    </q-drawer>

    <q-drawer show-if-above  v-model="right" side="right" >
      <!-- drawer content -->
     

      <q-list  v-for="(item,index) in categoryAndProduct" :key="index" class="animate__animated animate__fadeInRight">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="text_secondary" name="west" />
          </q-item-section>
          <q-item-section class="title" @click="viewProducts(item)">{{item.title}}</q-item-section>

          <q-item-section side top>
            <q-item-label caption>
              <q-btn v-if="instance[0].is_superuser == true" color="primary" @click="edit_category(item)" flat size="sm" icon="edit" />
              <q-btn  v-if="instance[0].is_superuser == true" color="secondary" @click="delete_category(item)" flat size="sm" icon="delete" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list  v-if="instance[0].is_superuser == true" >
        <q-item clickable v-ripple class="animate__animated animate__fadeInRight">
          <q-item-section>
            <q-btn color="secondary" outline icon="add" @click="new_category" label="Add Category" />
          </q-item-section>
        </q-item>
      </q-list>
      
    </q-drawer>

    <q-page-container>
      <router-view  />
    </q-page-container>

    <q-dialog v-model="dialog_category">
      <q-card style="width : 400px">
        <q-card-section class="row items-center">
          <q-input style="width : 100%" v-model="model_category" type="text" label="New Category" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn flat label="Submit" color="secondary" @click="save_category(model_category)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog_category_edit">
      <q-card style="width : 400px">
        <q-card-section class="row items-center">
          <q-input style="width : 100%" v-model="edit_model_category" type="text" label="Category" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn
            flat
            label="Submit"
            color="secondary"
            @click="update_category(edit_model_category)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import axios from "axios";

import { mapMutations } from 'vuex';
export default {
  computed: {
    ...mapGetters(["categoryAndProduct","getters_instance_access_level"]),
    ...mapState(["global_hostname", "imagesList",'companyInformation','config','token','instance',]),
  },
  data() {
    return {
      global_id: 0,
      edit_model_category: "",
      dialog_category_edit: false,
      left: false,
      right: false,
      dialog_category: false,
      model_category: "",
      navigation: [
        {
          title: "Transaction",
          path: "/transaction",
          icon: "receipt_long",
        },
        
         {
          title: "Products",
          path: "/products",
          icon: "loyalty",
        },
        {
          title: "Expenses",
          path: "/expenses",
          icon: "science",
        },
        {
          title: "Supplies",
          path: "/supplies",
          icon: "support_agent",
        },
        {
          title: "Reports",
          path: "/reports",
          icon: "timeline",
        },
         {
          title: "Export",
          path: "/export",
          icon: "double_arrow",
        },
        
         
        {
          title: "Settings",
          path: "/settings",
          icon: "settings",
        },
        
      ],
    };
  },
  methods: {
    ...mapActions([
      "action_getCategory", //also supports payload `this.nameOfAction(amount)`
      "action_getProduct",
      "action_view_products",
      "action_getImages",
      "action_get_orders",
      "action_get_expenses",
      "action_get_expenses_items",
       'action_get_supplies',
      'action_get_suppliesItems',
      'action_get_customer',
      'get_companyInformation',
      'get_users',
      'actions_get_access_level',
      'actions_get_user_logs'
      

    ]),
    ...mapMutations([
            'mutate_logout', //also supports payload `this.nameOfMutation(amount)` 
          ]),
    event_logout(){
      
      
     
   
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like exit the app?',
        cancel: true,
        persistent: true
        }).onOk(() => {
         
          this.mutate_logout()
          axios.post(`${this.global_hostname}/user_logout/`,)
          .then(res => {
            console.log(res)
           
            this.$q.notify({ //put dollor sign(q)
               message: `Logout Successfull!`,
               timeout: 3000, // in milliseconds; 0 means no timeout
              color: 'orange',
              textColor: 'white', // if default 'white' doesn't fit
              icon: 'check', //or  avatar: 'statics/boy-avatar.png',
              position: 'top', // 'top', 'left', 'bottom-left' etc.
            })

            setTimeout(() => {
              window.location.reload()
            }, 2000);
            
          })
          .catch(err => {
            console.error(err); 
          })
          this.$router.push('/')
        }).onOk(() => {
         }).onCancel(() => {
         }).onDismiss(() => {
      })
      
    },
    update_category(edit_category) {
      axios
        .put(`${this.global_hostname}/api/ProductCategory/${this.global_id}/`, {
          title: edit_category,
        },this.config)
        .then((res) => {
          console.log(res);
          this.$q.notify({
            //put dollor sign(q)
            message: `Successfully Updated!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            color: "primary",
            textColor: "white", // if default 'white' doesn't fit
            icon: "check", //or  avatar: 'statics/boy-avatar.png',
            position: "top-right", // 'top', 'left', 'bottom-left' etc.
          });
          this.action_getCategory();
          this.action_getProduct();
        })
        .catch((err) => {
          console.error(err);
          this.$q.notify({
            //put dollor sign(q)
            message: `There is an error!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            color: "red",
            textColor: "white", // if default 'white' doesn't fit
            icon: "check", //or  avatar: 'statics/boy-avatar.png',
            position: "top-right", // 'top', 'left', 'bottom-left' etc.
          });
          this.action_getCategory();
          this.action_getProduct();
        });
    },
    edit_category(item) {
      this.dialog_category_edit = true;
      this.edit_model_category = item.title;
      this.global_id = item.id;
    },
    delete_category(item) {
      this.$q
        .dialog({
          title: "Confirm",
          message: `Would you like to Delete ${item.title} in the list?`,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
           alert('Delete Information is not allowed by this time. Please Contact a Developer')
         /* eslint-disable */  return 
          axios.delete(`${this.global_hostname}/api/ProductCategory/${item.id}/`,this.config)
            .then((res) => {
              console.log(res)
              this.$q.notify({
                //put dollor sign(q)
                message: `Successfully Removed!`,
                timeout: 3000, // in milliseconds; 0 means no timeout
                color: "primary",
                textColor: "white", // if default 'white' doesn't fit
                icon: "check", //or  avatar: 'statics/boy-avatar.png',
                position: "bottom", // 'top', 'left', 'bottom-left' etc.
              });

              this.action_getCategory();
              this.action_getProduct();
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    },
    new_category() {
      this.model_category = "";
      this.dialog_category = true;
    },
    save_category(item) {
      if (item.length <= 0) {
        alert("Please Enter new Category!");
        return;
      }
      axios
        .post(`${this.global_hostname}/api/ProductCategory/`, {
          title: item,
        },this.config)
        .then((res) => {
          console.log(res)
          this.$q.notify({
            //put dollor sign(q)
            message: `Successfully Save!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            color: "primary",
            textColor: "white", // if default 'white' doesn't fit
            icon: "check", //or  avatar: 'statics/boy-avatar.png',
            position: "bottom", // 'top', 'left', 'bottom-left' etc.
          });

          this.action_getCategory();
          this.action_getProduct();
          this.action_getImages();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    change_path(item) {
      try {
    localStorage.setItem('path',item.path)
    var path = localStorage.getItem('path')
   
          if (location.pathname == path) {
              
              return
          }else{
            this.$router.push(item)
          }
   } catch (error) {
     console.log(error)
   }

     

    

      
      // this.left = false;
    },
    viewProducts(item) {
      // this.right = false;
      console.log(item)
    //  var product_instance = {
    //    actual_image: `${this.global_hostname}/wilmarMediaFiles/MediaFiles/MANUALINPUT_YLQLi83.JPG`,
    //   date_created: "2020-08-27T12:09:34.760446Z",
    //   date_updated: "2020-08-27T12:36:51.423678Z",
    //   image: "47",
    //   price: 0,
    //   productCategory: "http://192.168.100.106:4000/api/ProductCategory/2/",
    //   productName: "",
    //   quantity: "1",
    //  }
     
     var info = item
    //  info.products.splice((info.products.length - 1),1)
    //  var index = info.products.length
    //  info.products[index] = product_instance
      this.action_view_products(info.products);
    },
  },
  

  beforeMount() {
      if (this.token.refresh.length <= 0) {
            this.$router.push('/')
      }
        this.get_users()
    this.action_getCategory();
    this.action_getProduct();
    this.action_getImages();
    this.action_get_customer()
    this.action_get_orders()
    this.action_get_expenses()
     this.action_get_expenses_items()
      this.action_get_supplies()
      this.action_get_suppliesItems()
      this.actions_get_access_level()
      this.actions_get_user_logs()
    
    
     
    
  },
  beforeCreate () {
  
    try {

 
     
          // var path = localStorage.getItem('path')
          
          // if (location.pathname == path) {
              
          //     return
          // }else{
          //   this.$router.push(path)
          // }
         
          
   } catch (error) {
     console.log(error)
   }
      
  },
  mounted () {
    setTimeout(() => {
      this.left = false;
      this.right = false;
   
    }, 60000);
  },
};
</script>
<style lang="scss">
@import "../../styles/_variables.scss";
.title {
  font-size: 15px;
  text-align: left;
  color: $text_secondary;
  font-weight: 700;
}
.user_label{
  color:$dark; margin-right:5px
}
</style>