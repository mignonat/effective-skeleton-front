<template>
  <div class="page-content">
        <div class="app-panel">
            <div class="app-panel-title">Entity's properties detail</div>
            <div class="app-panel-body">
                <div class="table">
                    <div class="table-row">
                        <div class="table-cell"><b>Key</b></div>
                        <div class="table-cell"><b>Value</b></div>
                    </div>
                    <template v-for="field in entityFields">
                        <div class="table-row">
                            <div class="table-cell">{{ field.key }}</div>
                            <div class="table-cell">{{ field.value }}</div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="app-panel-footer">
                <label class="app-panel-label">Change entity properties from the form</label>
            </div>
        </div>
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
            title : 'Entity\'s modification form',
            id : 'sample',
            entity : {
                Field_0 : undefined,
                Field_1 : 'Hello world !' ,
                Field_2 : 'This is a test',
                Field_3 : 39,
                Field_4 : 2,
                Field_5 : '2015-05-17',
                Field_6 : 'mignonat@gmail.com',
                Field_7 : true,
                Field_8 : false,
                Field_9 : true,
                Field_10 : 'user3',
                Field_11 : 'city2'
            },
            error : false,
            fields : [{
                id : 'Field_0',
                type : 'text',
                required :true,
                label : 'Field_0 : empty textfield',
                autofocus : true
            },{
                id : 'Field_1',
                type : 'text',
                label : 'Field_1 : filled textfield but disabled',
                disabled : true
            },{
                id : 'Field_2',
                type : 'textarea',
                label : 'Field_2 : text Area limited to 20 chars',
                maxlength : 20,
                rows : 6
            },{
                id : 'Field_3',
                type : 'number',
                label : 'Field_3 : number with min(10) and max(50)',
                min : 10,
                max : 50
            },{
                id : 'Field_4',
                type : 'slider',
                label : 'Field_4 : slider with min(0) and max(10)',
                min : 0,
                max : 10
            },{
                id : 'Field_5',
                type : 'date',
                label : 'Field_5 : date example'
            },{
                id : 'Field_6',
                type : 'email',
                label : 'Field_6 : email example'
            },{
                id : 'Field_7',
                type : 'checkbox',
                label : 'Field_7 : simple checkbox',
                activeLabel : 'Activated',
                inactiveLabel : 'Deactivated'
            },{
                id : 'Field_8',
                type : 'radio',
                label : 'Field_8 : radio buttons',
                firstLabel : 'Activated',
                firstValue : true,
                secondLabel : 'Deactivated',
                secondValue : false
            },{
                id : 'Field_9',
                type : 'toggle',
                label : 'Field_9 : toggle example',
                activeLabel : 'Activated',
                inactiveLabel : 'Deactivated'
            },{
                id : 'Field_10',
                type : 'select',
                label : 'Field_10 : select combo',
                value : 'id',
                display : 'name',
                options : [{ id: "user1", name:"Laurent" },{ id: "user2", name:"Florian" },{ id: "user3", name:"Toto" }]
            },{
                id : 'Field_11',
                type : 'datalist',
                label : 'Field_11 : datalist select input',
                value : 'id',
                display : 'name',
                options : [
                    { id: "city1", name:"Paris" },{ id: "city2", name:"London" },{ id: "city3", name:"New-York" },
                    { id: "city4", name:"Tokyo" },{ id: "city5", name:"Shangai" }]
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
        computed : {
            entityFields : function() {
                const entityFields = []
                for (var key in this.entity) {
                    if (!this.entity.hasOwnProperty(key)) continue ;
                    entityFields.push({
                        key : key,
                        value : this.entity[key]
                    })
                }
                return entityFields
            }
        },
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