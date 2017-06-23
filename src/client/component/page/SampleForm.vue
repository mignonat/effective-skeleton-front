<template>
  <div class="page-content">  
      <app-form
        :id      = "id"
        :title   = "title"
        :entity  = "entity"
        :fields  = "fields"
        :labels  = "labels"
        :buttons = "buttons"
        @cancel  = "formActionCancel"
        @update  = "formActionUpdate"
        @valid   = "formActionValid"
        @joker   = "formActionJoker">
      </app-form>
  </div>
</template>

<script>
    import AppForm from '../content/form/AppForm.vue'

    export default {
        data : function() { return {
            title : 'Form sample',
            id : 'sample',
            entity : {
                field1 : 'Test',
                field2 : 'This is a test',
                field3 : 2,
                field4 : 'user1',
                field5 : '2015-05-17',
                field6 : 'mignonat@gmail.com',
                field7 : true
            },
            error : false,
            fields : [{
                id : 'field1',
                type : 'text',
                required :true,
                label : 'Text field'
            },{
                id : 'field2',
                type : 'textarea',
                label : 'Text Area'
            },{
                id : 'field3',
                type : 'number',
                label : 'Number',
                min : 0,
                max : 10
            },{
                id : 'field4',
                type : 'option',
                label : 'Select combo',
                value : 'id',
                display : 'name',
                options : [{
                    id: "user1",
                    name:"Laurent"
                },{
                    id: "user2",
                    name:"Florian"
                },{
                    id: "user3",
                    name:"Toto"
                }]
            },{
                id : 'field5',
                type : 'date',
                label : 'Date'
            },{
                id : 'field6',
                type : 'email',
                label : 'Email'
            },{
                id : 'field7',
                type : 'checkbox',
                label : 'Checkbox'
            },{
                id : 'field8',
                type : 'radio',
                label : 'Radio'
            }],
            labels : {
                valid : 'Apply',
                cancel : 'Cancel'
            },
            buttons : [{
                id : 'joker',
                label : 'Joker',
                action : 'joker'
            }]
        }},
        methods : {
            formActionUpdate(params) {
                this.entity[params.id] = params.value
                console.log('Update : '+params.id+'='+params.value)
                console.log('Entity : '+JSON.stringify(this.entity))
            },
            formActionCancel() {
                console.log('cancel action !')
            },
            formActionValid() {
                console.log('valid action ! '+JSON.stringify(this.entity))
            },
            formActionJoker() {
                console.log('joker action !')
            }
        },  
        components : { AppForm }
    }
</script>