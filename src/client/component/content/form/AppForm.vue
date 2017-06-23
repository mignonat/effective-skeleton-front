<template>
        <div class="form-container">
            <div class="form-title">{{ title }}</div>
            <form>
                <template v-for="field in fields">
                    <field-text 
                        v-if="field.type=='text'"
                        :id = "field.id" :initValue = "entity[field.id]" :label = "field.label" @update= "update">
                    </field-text>
                    <field-text-area
                        v-else-if="field.type=='textarea'"
                        :id = "field.id" :initValue = "entity[field.id]" :label = "field.label" @update= "update">
                    </field-text-area>
                    <field-number
                        v-else-if="field.type=='number'"
                        :min = "field.min" :max = "field.max"
                        :id = "field.id" :initValue = "entity[field.id]" :label = "field.label" @update= "update">
                    </field-number>
                    <field-select
                        v-else-if="field.type=='option'"
                        :options="field.options" :optValue="field.value" :display="field.display"
                        :id = "field.id" :initValue = "entity[field.id]" :label = "field.label" @update= "update">
                    </field-select>
                    <field-date 
                        v-if="field.type=='date'"
                        :format = "field.format? field.format : 'yyyy-MM-mm'"
                        :id = "field.id" :initValue = "entity[field.id]" :label = "field.label" @update= "update">
                    </field-date>
                    <field-email 
                        v-if="field.type=='email'"
                        :id = "field.id" :initValue = "entity[field.id]" :label = "field.label" @update= "update">
                    </field-email>
                    <field-checkbox 
                        v-if="field.type=='checkbox'"
                        :id = "field.id" :initValue = "entity[field.id]" :label = "field.label" @update= "update">
                    </field-checkbox>
                    <field-radio 
                        v-if="field.type=='radio'"
                        :id = "field.id" :initValue = "entity[field.id]" :label = "field.label" @update= "update">
                    </field-radio>
                </template>
                
                <div class="form-field">
                    <input list="Managers" name="managers">
                    <datalist id="Managers" class="form-dropdown">
                        <option value="A name "></option>
                        <option value="AA name"></option>
                        <option value="B name"></option>
                        <option value="BB name"></option>
                        <option value="AAC name"></option>
                    </datalist>
                    <label class="form-label" for="Manager">dataList label</label>
                    <i class="form-bar"></i>
                </div>
                
                
                
                <div class="form-toggle">
                    <input type="checkbox" id="checked" class="form-hidden"></input>
                    <label for="checked"></label>
                    <span>Toggle label</span> 
                </div>
            </form>

            <div class="form-button-box">
                <button v-for="button in buttons" v-bind:key="button.id" @click="$emit(button.action)" :class="'form-button form-button-'+button.id" type="button">
                    <span>{{ button.label }}</span>
                </button>
                <button @click="valid" class="form-button" type="button">
                    <span>{{ labels.valid }}</span>
                </button>
                <button @click="cancel" class="form-button form-cancel" type="button">
                    <span>{{ labels.cancel }}</span>
                </button>
            </div>
        </div>
</template>

<script>
    import mixin from '../../../tool/mixin.js'
    import event from '../../../tool/event.js'
    
    import FieldText from './field/FieldText.vue'
    import FieldTextArea from './field/FieldTextArea.vue'
    import FieldNumber from './field/FieldNumber.vue'
    import FieldDate from './field/FieldDate.vue'
    import FieldEmail from './field/FieldEmail.vue'
    import FieldCheckbox from './field/FieldCheckbox.vue'
    import FieldRadio from './field/FieldRadio.vue'
    import FieldSelect from './field/FieldSelect.vue'

    //TODO : manage history for undo/redo
    //TODO : use mixins

    export default {
        mixins : mixin.get(mixin.TRANSLATE),
        props : [ 'id', 'title', 'entity', 'fields', 'labels', 'buttons' ],
        data : function() { return {
            temp_options : [{label:"Value 1", value: "val1"}, {label:"Value 2", value: "val2"}, {label:"Value 3", value: "val3"}]
        }},
        methods : {
            update : function(params) {
                this.$emit('update', params) //params : id, value
            },
            valid : function() {
                $emit('valid')
            },
            cancel : function() {
                $emit('cancel')
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                event.on(event.LOCALE_CHANGE, () => {
                    this.setTranslation()
                })
            })
        },
        components: { 
            FieldText,
            FieldTextArea,
            FieldNumber,
            FieldDate,
            FieldEmail,
            FieldCheckbox,
            FieldRadio,
            FieldSelect
        }
    }
</script>