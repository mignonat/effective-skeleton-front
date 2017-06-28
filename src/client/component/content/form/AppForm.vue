<template>
        <div class="form-panel">
            <div class="form-header">
                <span class="form-title">{{ title }}</span>
            </div>
            <form class="form-body">
                <template v-for="field in fields">
                    <field-text
                        v-if="field.type=='text'"
                        :formId="id" :model="field" :initValue = "entity[field.id]" @update= "update">
                    </field-text>
                    <field-text-area
                        v-else-if="field.type=='textarea'"
                        :formId="id" :model="field" :initValue = "entity[field.id]" @update= "update">
                    </field-text-area>
                    <field-spiner
                        v-else-if="field.type=='spiner'"
                        :formId="id" :model="field" :initValue = "entity[field.id]" @update= "update">
                    </field-spiner>
                    <field-slider
                        v-else-if="field.type=='slider'"
                        :formId="id" :model="field" :initValue = "entity[field.id]" @update= "update">
                    </field-slider>
                    <field-date
                        v-if="field.type=='date'"
                        :formId="id" :model="field" :initValue = "entity[field.id]" @update= "update">
                    </field-date>
                    <field-email
                        v-if="field.type=='email'"
                        :formId="id" :model="field" :initValue = "entity[field.id]" @update= "update">
                    </field-email>
                    <field-checkbox
                        v-if="field.type=='checkbox'"
                        :formId="id" :model="field" :initValue = "entity[field.id]" @update= "update">
                    </field-checkbox>
                    <field-radio
                        v-if="field.type=='radio'"
                        :formId="id" :model="field" :initValue = "entity[field.id]" @update= "update">
                    </field-radio>
                    <field-toggle
                        v-if="field.type=='toggle'"
                        :formId="id" :model="field" :initValue = "entity[field.id]" @update= "update">
                    </field-toggle>
                    <field-select
                        v-else-if="field.type=='select'"
                        :formId="id" :model="field" :initValue = "entity[field.id]" @update= "update">
                    </field-select>
                    <field-data-list
                        v-else-if="field.type=='datalist'"
                        :formId="id" :model="field" :initValue = "entity[field.id]" @update= "update">
                    </field-data-list>
                </template>
            </form>
            <div class="form-footer">
                <div class="button-container">
                    <button v-for="button in buttons" v-bind:key="button.id" @click="$emit(button.action)" :class="'button button-'+button.id" type="button">
                        <span>{{ button.label }}</span>
                    </button>
                    <button @click="valid" class="button" type="button">
                        <span>{{ labels.valid }}</span>
                    </button>
                    <button @click="cancel" class="button button-cancel" type="button">
                        <span>{{ labels.cancel }}</span>
                    </button>
                </div>
            </div>
        </div>
</template>

<script>
    import mixin from '../../../tool/mixin.js'
    import event from '../../../tool/event.js'
    
    import FieldText from './field/FieldText.vue'
    import FieldTextArea from './field/FieldTextArea.vue'
    import FieldSpiner from './field/FieldSpiner.vue'
    import FieldSlider from './field/FieldSlider.vue'
    import FieldDate from './field/FieldDate.vue'
    import FieldEmail from './field/FieldEmail.vue'
    import FieldCheckbox from './field/FieldCheckbox.vue'
    import FieldRadio from './field/FieldRadio.vue'
    import FieldToggle from './field/FieldToggle.vue'
    import FieldSelect from './field/FieldSelect.vue'
    import FieldDataList from './field/FieldDataList.vue'

    //TODO : manage history for undo/redo
    //TODO : use mixins

    export default {
        mixins : mixin.get(mixin.TRANSLATE),
        props : [ 'id', 'title', 'entity', 'fields', 'labels', 'buttons' ],
        methods : {
            update : function(params) {
                this.$emit('update', params) //params : id, value
            },
            valid : function() {
                this.$emit('valid')
            },
            cancel : function() {
                this.$emit('cancel')
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
            FieldText, FieldTextArea, FieldSpiner, FieldSlider, FieldDate, FieldEmail, FieldCheckbox,
            FieldRadio, FieldToggle, FieldSelect, FieldDataList
        }
    }
</script>