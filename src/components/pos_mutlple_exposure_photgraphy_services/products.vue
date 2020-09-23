<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="padding : 20px; margin: auto;">
      <div style="padding : 20px">
        <q-btn
          color="secondary"
          class="animate__animated animate__fadeInLeft"
          outline
          icon="add"
          label="Add Product"
          @click="dialog_add_product = true"
        />
      </div>
      <q-table
        class="animate__animated animate__fadeIn shadow-1"
        title="Products"
        :data="getters_products"
        :columns="columns_products"
        row-key="name"
        style="border-radius:  10px ;"
      >
        <template v-slot:body="props">
          <q-tr :props="props" style="cursor :pointer ;">
            <q-td key="id" :props="props">
              <q-btn color="grey" flat icon="delete" size="sm" @click="order_delete(props.row.id)" />
              <q-btn color="secondary" flat icon="edit" size="sm" @click="edit_product(props.row)" />
            </q-td>

            <q-td key="productName" :props="props" class="title">{{ props.row.productName }}</q-td>
            <q-td
              key="productCategory_information"
              :props="props"
              class="title"
            >{{ props.row.productCategory_information }}</q-td>
            <q-td key="price" :props="props">
              <q-badge color="primary">{{ props.row.price }}</q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="dialog_add_product">
      <q-card style="width : 500px">
        <q-card-section>
          <q-select
            v-model="model_category"
            label="Select Category"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="category_option"
            @filter="filterFn"
            style="width: 100%; padding-bottom: 32px ; margin-bottom: 2px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input
            style="width:100%; margin-bottom: 2px"
            v-model="model_productName"
            type="text"
            label="Product Name"
          />
          <q-uploader
            class="shadow-0"
            style="width:100%;"
            label="Select Product Image(2 x 3 inches must be)"
            @added="upload"
            :no-thumbnails="image_thumbmails"
          />

          <q-input
            style="width:100%; margin-bottom: 2px ; "
            v-model="model_price"
            label="Price in Peso"
            mask="#"
            reverse-fill-mask
            input-class="text-right"
            hint="If you want to input price manually, just leave it zero(0)"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="close" color="grey" v-close-popup />
          <q-btn outline label="Save" v-close-popup @click="save_product" color="secondary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog_edit_product">
      <q-card style="width : 500px">
        <q-card-section>
          <div style="font-weight : 700; color:#ffb400 ; font-size : 15px">Edit Product</div>

          <q-input
            readonly
            v-model="edit_model_category"
            label="Category"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="category_option"
            @filter="filterFn"
            style="width: 100%; padding-bottom: 32px ; margin-bottom: 2px"
          ></q-input>
          <q-input
            style="width:100%; margin-bottom: 2px"
            v-model="edit_model_productName"
            type="text"
            label="Product Name"
          />
          <q-img
            v-if="image_preview"
            :src="edit_preview_image"
            :ratio="16/9"
            spinner-color="primary"
            spinner-size="82px"
          />
          <q-uploader
            color="secondary"
            class="shadow-0"
            style="width:100%;"
            label="Upload Image"
            @added="upload"
            :no-thumbnails="image_thumbmails"
          />

          <q-input
            style="width:100%; margin-bottom: 2px ; "
            v-model="edit_model_price"
            label="Price in Peso"
            mask="#"
            reverse-fill-mask
            input-class="text-right"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="close" color="grey" v-close-popup />
          <q-btn
            outline
            label="update Product Information"
            v-close-popup
            @click="update_product"
            color="secondary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

import axios from "axios";

export default {
  name: "product",
  data() {
    return {
      global_id: 0,
      image_preview: false,
      edit_model_category: "",
      edit_model_productName: "",
      edit_model_price: "",
      edit_preview_image: "",
      model_productName: "",
      model_image_id: 0,
      dialog_edit_product: false,
      image_thumbmails: false,
      model_price: "",
      model_category: "",
      category_option: [],
      dialog_add_product: false,
      columns_products: [
        { name: "id", label: "Action", field: "id" },
        {
          name: "productName",
          required: true,
          label: "Product Name",
          align: "left",
          field: (row) => row.productName,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "productCategory_information",
          align: "left",
          label: "Category",
          field: "productCategory_information",
          sortable: true,
        },
        { name: "price", label: "Price", field: "price", sortable: true },
      ],
    };
  },
  computed: {
    ...mapState([
      "productList",
      "global_hostname",
      "categoryList",
      "imagesList",
      "config"
    ]),
    ...mapGetters([
      "getter_category_list",
      "getter_product_with_category",
      "getters_products",
    ]),
  },
  methods: {
    ...mapActions([
      "action_getCategory", //also supports payload `this.nameOfAction(amount)`
      "action_getProduct",
      "action_getImages",
    ]),
    update_product() {
      if (this.model_image_id == 0 || this.model_image_id.length <= 0) {
        alert("Please Select Image!");
        return;
      }

      var instance_url = this.categoryList.filter(
        (element) => element.title == this.edit_model_category
      );

      var payload = {
        productCategory: `${instance_url[0].url}`,
        image: `${this.model_image_id}`,
        productName: this.edit_model_productName,
        price: parseFloat(this.edit_model_price),
        quantity: 1,
      };

      axios
        .put(`${this.global_hostname}/api/Product/${this.global_id}/`, payload,this.config)
        .then((res) => {
          console.log(res);
          this.$q.notify({
            //put dollor sign(q)
            message: `Image Successfully Uploaded!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            color: "primary",
            textColor: "white", // if default 'white' doesn't fit
            icon: "check", //or  avatar: 'statics/boy-avatar.png',
            position: "bottom", // 'top', 'left', 'bottom-left' etc.
          });
          this.image_thumbmails = true;

          this.model_productName = "";
          this.model_price = "";
          this.model_category = "";
          this.model_image_id = 0;

          this.action_getCategory();
          this.action_getProduct();
          this.action_getImages();
        })
        .catch((err) => {
          console.error(err);
          this.$q.notify({
            //put dollor sign(q)
            message: `There is an error, Please try again!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            color: "red",
            textColor: "white", // if default 'white' doesn't fit
            icon: "check", //or  avatar: 'statics/boy-avatar.png',
            position: "bottom", // 'top', 'left', 'bottom-left' etc.
          });
          (this.model_productName = ""), (this.model_price = "");
          this.model_category = "";
        });
    },
    edit_product(row) {
       alert('Edit Information is not allowed by this time. Please Contact a Developer')
     /* eslint-disable */ 
   
      try {
        this.global_id = row.id;
        this.edit_model_category = row.productCategory_information;
        this.edit_model_productName = row.productName;
        this.edit_model_price = parseInt(row.price);

        var image_id = parseInt(row.image);

        this.model_image_id = image_id;
        this.edit_preview_image = this.imagesList.filter(
          (element) => element.id == parseInt(image_id)
        )[0].image;
        this.dialog_edit_product = true;
        this.image_preview = true;
        console.log(this.edit_preview_image);
      } catch (error) {
        console.log("No Image Exist");
      }
    },
    order_delete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: `Would you like Delete Row with ID : ${id}?`,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          alert(
            "Delete Information is not allowed by this time. Please Contact a Developer"
          );

          axios
            .delete(`${this.global_hostname}/api/Product/${id}/`,this.config)
            .then((res) => {
              console.log(res);
              this.$q.notify({
                //put dollor sign(q)
                message: `Successfully Deleted!`,
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
              this.$q.notify({
                //put dollor sign(q)
                message: `There is an error, Please try again!`,
                timeout: 3000, // in milliseconds; 0 means no timeout
                color: "red",
                textColor: "white", // if default 'white' doesn't fit
                icon: "check", //or  avatar: 'statics/boy-avatar.png',
                position: "bottom", // 'top', 'left', 'bottom-left' etc.
              });
            });
        })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    },
    save_product() {
      if (this.model_image_id == 0 || this.model_image_id.length <= 0) {
        alert("Please Select Image!");
        return;
      }

      var instance_url = this.categoryList.filter(
        (element) => element.title == this.model_category
      );

      var payload = {
        productCategory: `${instance_url[0].url}`,
        image: `${this.model_image_id}`,
        productName: this.model_productName,
        price: parseFloat(this.model_price),
        quantity: 1,
      };
      console.log(payload);

      axios
        .post(`${this.global_hostname}/api/Product/`, payload,this.config)
        .then((res) => {
          console.log(res);

          this.$q.notify({
            //put dollor sign(q)
            message: `Image Successfully Uploaded!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            color: "primary",
            textColor: "white", // if default 'white' doesn't fit
            icon: "check", //or  avatar: 'statics/boy-avatar.png',
            position: "bottom", // 'top', 'left', 'bottom-left' etc.
          });
          this.image_thumbmails = true;

          this.model_productName = "";
          this.model_price = "";
          this.model_category = "";
          this.model_image_id = 0;

          this.action_getCategory();
          this.action_getProduct();
          this.action_getImages();
        })
        .catch((err) => {
          console.error(err);
          this.$q.notify({
            //put dollor sign(q)
            message: `There is an error, Please try again!`,
            timeout: 3000, // in milliseconds; 0 means no timeout
            color: "red",
            textColor: "white", // if default 'white' doesn't fit
            icon: "check", //or  avatar: 'statics/boy-avatar.png',
            position: "bottom", // 'top', 'left', 'bottom-left' etc.
          });
          (this.model_productName = ""), (this.model_price = "");
          this.model_category = "";
        });
    },
    upload(files) {
      this.image_thumbmails = false;
      this.image_preview = false;
      console.log(files);
      let data = new FormData();
      data.append("image", files[0]);
      axios
        .post(`${this.global_hostname}/api/FilesImages/`, data,this.config)
        .then((response) => {
          this.model_image_id = response.data.id;
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
            position: "bottom", // 'top', 'left', 'bottom-left' etc.
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.category_option = this.getter_category_list;

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.category_option = this.getter_category_list.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  mounted() {
    setTimeout(() => {
      console.log("console from products");
      console.log(this.getters_products);
    }, 3000);
  },
};
</script>
<style lang="scss" >
</style>