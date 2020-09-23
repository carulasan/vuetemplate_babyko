<template>
    <div class="row">
         <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin:auto; ">
                <q-breadcrumbs>
                    <q-breadcrumbs-el label="Expenses" icon="home" />
                    <q-breadcrumbs-el label="" />
                    
                </q-breadcrumbs>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin:auto; text-align:center; padding : 20px;">
                <q-btn color="secondary" icon="add" style="margin-right:10px" @click="dialog_preparedby = true"  outline label="Add Expenses"  />
        <q-btn color="primary" icon="person" style="margin-right:10px" @click="dialog_expense = true"  outline label="Expense Keyword"  />
        </div>
          <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin:auto; text-align:center; padding : 20px;">
            
                <q-table    style="border-radius:  10px;" class="animate__animated animate__fadeIn shadow-1" :data="getters_expenses"  :columns="expenses_table" row-key="name">
              
                <template v-slot:body="props">
                  <q-tr :props="props" style="cursor :pointer ;">
                    <q-td key="id" :props="props">
                      <q-btn
                        color="primary"
                        flat
                        icon="visibility"
                        size="sm"
                        @click="view_expense_item(props.row , props.row.ammount_expense , new Date(props.row.date_created).toString().substr(0,15)) "
                      />
                    </q-td>

                    <q-td key="preparedBy" :props="props" class="title">{{ props.row.preparedBy }}</q-td>
                   
                 <q-td key="ammount_expense" :props="props">
                      <q-badge color="primary">&#8369; {{ props.row.ammount_expense }}</q-badge>
                    </q-td>
                    <q-td key="date_created" :props="props">
                      <q-badge color="secondary">{{ new Date(props.row.date_created).toString().substr(0,15) }}</q-badge>
                    </q-td>
                     <q-td key="date_updated" :props="props">
                      <q-badge color="secondary"> {{ new Date(props.row.date_updated ).toString().substr(0,15) }}</q-badge>
                    </q-td>
                  </q-tr>
                </template>
                 </q-table>
        </div>
        <q-dialog v-model="dialog_view_items" persistent>
            <q-card style="width : 1020px">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin:auto;text-align:center; font-size:18px; padding : 10px">
                           Expenses
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <q-item v-for="(item,index) in expense" :key="index">
                           
                            <q-item-section>
                                <q-item-label>  &#8369; {{item.ammount}} ................... {{ item.description }}</q-item-label>
                                
                            </q-item-section>
                            <q-item-section side top>
                                <q-item-label caption>{{ new Date().toString().substr(15,6)}}</q-item-label>
                                
                            </q-item-section>
                        </q-item>
                        <q-item>
                            
                            <q-item-section>
                                <q-item-label>Total </q-item-label>
                                <q-item-label style="font-weight:700" lines="2">&#8369; {{  expense_total }} as of  {{ expense_date }} </q-item-label>
                            </q-item-section>
                            
                        </q-item>
                    </div>
                </div>
                <q-card-actions align="right">
                    <q-btn  label="Close" outline color="secondary" v-close-popup />
                
                </q-card-actions>
            </q-card>
        </q-dialog>
   
   <q-dialog v-model="dialog_preparedby" persistent>
      <q-card style="width : 1050px">
          <div class="prep">New Expense</div>
          <div class="selec"><small>Prepared By</small></div>
          <div class="row" style="padding : 5px">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" :key="index" v-for="(item,index) in prepared_by">
            <q-btn color="secondary" icon="person"  style="width : 100%" :label="item" outline @click="event_selected(item)" />
            </div>
          </div>
       
        <q-card-actions align="right">
          <q-btn flat label="close" color="grey" v-close-popup />
         
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog  style="width : 80%"  v-model="dialog_item_expenses" persistent>
      <q-card style="width : 80%">
          <div class="prep">Add Expenses</div>
          <div class="selec"><small>Prepared by : {{ model_prepredby }}</small></div>
          <div class="row" style="margin-top:10px">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                     <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding:5px ; ">
                        <strong>Discription</strong>
                        </div>
                         <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding:5px">
                            <strong>Amount</strong>
                        </div>

                    </div>
                    
                    <div class="row"  v-for="(item,index) in expense_object" :key="index">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding:5px">
                           
                        <q-select dense outlined :options="getters_expense_keyword" v-model="item.description"  type="text" />
                        </div>
                         <div  class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding:5px">
                             <q-input  dense outlined v-model="item.ammount" min="1" max="99" type="number" />
                        </div>

                    </div>

                 <div style="padding:10px">
                      <q-btn  color="secondary" outline icon="add" style="width:100% ; margin-top:10px" label="add row" @click="event_add_row" />
                 </div>
              </div>
          </div>
         
       
        <q-card-actions align="right">
          <q-btn flat label="close" color="grey" v-close-popup />
          <q-btn  label="save" color="primary" @click="event_save_expense" v-close-popup />
         
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog_expense" persistent>
        <q-card>
          <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
            Expense Keyword
            </div>
          </div>
           <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="text-align:center;padding:10px; font-size : 20px">
                    <q-input v-model="model_expense_keyword" dense type="text" label="Enter Keyword" />
                    <q-btn color="secondary" outline dense icon="check" style="width:100%;margin-top:10px" label="Save" @click="event_save_expense_keyword(model_expense_keyword)" />
            </div>
          </div>
            
            <q-card-section>
                    <table>
                        <thead>
                           <tr>
                                <th>Action</th>
                            <th>Expense Name</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in expenseKeywordList" :key="index">
                                <td>
                                    <q-btn flat color="secondary" size="sm" @click="event_remove_keyword_info(item.id)" dense rounded icon="delete"   />
                                </td>
                                 <td>{{ item.keyword }}</td>
                            </tr>
                        </tbody>
                    </table>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat label="Close" color="primary" v-close-popup />
              
            </q-card-actions>
        </q-card>
    </q-dialog>



    </div>
</template>
<script>
import { mapActions } from 'vuex';

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

import axios from 'axios'



export default {
    name: "expenses",

    computed: {
        ...mapState([
            'expensesList',
            'expensesListItems',
            "global_hostname",
            'prepared_by',
            'expenseKeywordList',
            'config'

        ]),
        
        ...mapGetters([
            'getters_expenses',
            'getters_expense_keyword'
        ])
    
    },
    data() {
        return {
            model_expense_keyword : '',
            dialog_expense : false,
            model_prepredby : '',
            dialog_view_items : false,
            dialog_preparedby : false,
            expense_object : [
               
            ],
            dialog_item_expenses : false,
        
            expense_date : '',
            expense_total : 0,
            expense :  [] ,
             expenses_table: [
            { name: "id", label: "Action", field: "id" },
                {
                name: "preparedBy",
                required: true,
                label: "Prepared By",
                align: "left",
                field: (row) => row.preparedBy,
                format: (val) => `${val}`,
                sortable: true,
                },
                 {
                name: "ammount_expense",
                align: "left",
                label: "Ammount Expense",
                field: "ammount_expense",
                sortable: true,
                },
                {
                name: "date_created",
                align: "left",
                label: "Date Created",
                field: "date_created",
                sortable: true,
                },
                

                {

                     name: "date_updated", label: "Last Update", field: "date_updated", sortable: true 
                
                
                },
                
      ],
        }
    },
    methods : {
         ...mapActions([
            'action_get_expenses', //also supports payload `this.nameOfAction(amount)` ,
            'action_get_expenses_items',
            'get_expense_keyword'

        ]),
        event_remove_keyword_info(id){
            
            axios.delete(`${this.global_hostname}/api/ExpenseKeyword/${id}/`,this.config)
            .then(res => {
                console.log(res)
                  this.$q.notify({ //put dollor sign(q)
                             message: `Successfully Deleted!`,
                             timeout: 3000, // in milliseconds; 0 means no timeout
                            color: 'orange',
                            textColor: 'white', // if default 'white' doesn't fit
                            icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                            position: 'top', // 'top', 'left', 'bottom-left' etc.
                        })
                        this.get_expense_keyword()
            })
            .catch(err => {
                console.error(err); 
                  this.$q.notify({ //put dollor sign(q)
                             message: `error!`,
                             timeout: 3000, // in milliseconds; 0 means no timeout
                            color: 'red',
                            textColor: 'white', // if default 'white' doesn't fit
                            icon: 'error', //or  avatar: 'statics/boy-avatar.png',
                            position: 'bottom', // 'top', 'left', 'bottom-left' etc.
                        })
            })
        },
        event_save_expense_keyword(keyword_name){
            console.log(keyword_name)
                
                var payload = {
                    'keyword' : keyword_name
                }
                axios.post(`${this.global_hostname}/api/ExpenseKeyword/`,payload,this.config)
                .then(res => {
                    console.log(res)
                       this.$q.notify({ //put dollor sign(q)
                             message: `Successfully Save!`,
                             timeout: 3000, // in milliseconds; 0 means no timeout
                            color: 'orange',
                            textColor: 'white', // if default 'white' doesn't fit
                            icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                            position: 'bottom', // 'top', 'left', 'bottom-left' etc.
                        })
                        this.get_expense_keyword()
                })
                .catch(err => {
                    console.error(err); 
                       this.$q.notify({ //put dollor sign(q)
                             message: `error!`,
                             timeout: 3000, // in milliseconds; 0 means no timeout
                            color: 'red',
                            textColor: 'white', // if default 'white' doesn't fit
                            icon: 'error', //or  avatar: 'statics/boy-avatar.png',
                            position: 'bottom', // 'top', 'left', 'bottom-left' etc.
                        })
                })
        },
        post_save_items(payload){
            axios.post(`${this.global_hostname}/api/ExpensesItems/`,payload,this.config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
        },
        post_items(id){
            var data = this.expense_object
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.description.length <= 0 ) {
                         this.$q.notify({ //put dollor sign(q)
                             message: `${(index+1)} Items Successfully Save!`,
                             timeout: 3000, // in milliseconds; 0 means no timeout
                            color: 'orange',
                            textColor: 'white', // if default 'white' doesn't fit
                            icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                            position: 'bottom', // 'top', 'left', 'bottom-left' etc.
                        })
                         this.action_get_expenses()
     this.action_get_expenses_items()
     this.dialog_view_items = false
     this.dialog_preparedby = false
     this.dialog_item_expenses = false


                    return
                }
                var payload = {
                    "preparedBy": `${this.global_hostname}/api/ExpensesInstance/${id}/`,
                    "description": element.description,
                    "ammount":element.ammount,
                }
                this.post_save_items(payload)
                if (index == data.length - 1) {
                        this.$q.notify({ //put dollor sign(q)
                             message: ` ${(index+1)} Items Successfully Save!`,
                             timeout: 3000, // in milliseconds; 0 means no timeout
                            color: 'orange',
                            textColor: 'white', // if default 'white' doesn't fit
                            icon: 'check', //or  avatar: 'statics/boy-avatar.png',
                            position: 'bottom', // 'top', 'left', 'bottom-left' etc.
                        })
                         this.action_get_expenses()
     this.action_get_expenses_items()
     this.dialog_view_items = false
     this.dialog_preparedby = false
     this.dialog_item_expenses = false
                        
                }
                
            }
        },
        event_save_expense(){
            

            var payload = {
                "preparedBy": this.model_prepredby,
            }
            axios.post(`${this.global_hostname}/api/ExpensesInstance/`,payload,this.config)
            .then(res => {
                console.log(res)
                var instance_id = res.data.id
                this.post_items(instance_id)
            })
            .catch(err => {
                console.error(err); 
            })
        },
        event_add_row(){
            this.expense_object.push({"description": '',"ammount": '', })

        },
            view_expense_item(row,expense_total,date){

                    this.expense_total = expense_total
                    this.expense = row.expensesListItems
                    this.expense_date = date
                    this.dialog_view_items = true
            },
            event_selected(item){
                this.dialog_item_expenses = true
                this.model_prepredby = item
            },
    },
    mounted () {
        this.expense_object.push({"description": '',"ammount": '', });
    },
    beforeMount () {
        this.get_expense_keyword();
    },

}
</script>
<style lang="scss" >
</style>