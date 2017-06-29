<template>
    <div class="list-container noselect">
        <div v-if="displayTitle" class="list-title">{{ options.title }}</div>
        <transition name="fade-in">
            <div v-if="objects.length>0" v-show="!loading" class="list">
                <div class="list-header">
                    <span v-for="column in options.columns">{{ titles[column.name] }}</span>
                    <span v-if="options.actions">{{ label.actions }}</span>
                </div>
                <div v-for="object in objects" class="list-row">
                    <span v-for="column in options.columns">{{ object[column.name] }}</span>
                    <span v-if="options.actions">
                        <template v-for="action in options.actions">
                            <i 
                                v-if="action==='edit'" 
                                @click="editAction(object)" 
                                :title="label.edit+' '+object[options.displayProperty]"
                                class="material-icons link">
                                mode_edit
                            </i>
                            <i 
                                v-if="action==='delete'" 
                                @click="deleteAction(object)"
                                :title="label.del+' '+object[options.displayProperty]" 
                                class="material-icons link" >
                                delete_forever
                            </i>
                        </template>
                    </span>
                </div>
            </div>
            <div v-else v-show="!loading" class="list-empty">
                {{ label.empty }}
            </div>
        </transition>
        <loader v-show="loading"></loader>
    </div>
</template>

<script>
    import bus from '../../tool/bus.js'
    import mixin from '../../tool/mixin.js'
    import Loader from './Loader.vue'

    export default {
        mixins : mixin.get(mixin.TRANSLATE),
        props : [ 'loading', 'objects', 'options', 'titles' ],
        data : function() { return {
            label : {
                actions : this.translate('all.actions'),
                empty : this.translate('all.empty.users'),
                edit : this.translate('all.admin.users.edit'),
                del : this.translate('all.delete')
            }
        }},
        computed : {
            displayTitle() {
                return this.title != undefined
            }
        },
        methods : {
            setTranslation() {
                this.label.actions = this.translate('all.actions')
                this.label.empty = this.translate('all.empty.users')
                this.label.edit = this.translate('all.admin.users.edit')
                this.label.del = this.translate('all.delete')
            },
            editAction(object) {
                this.$emit('edit', object)
            },
            deleteAction(object) {
                this.$emit('delete', object)
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                bus.listen(bus.LOCALE_CHANGE, 'List', () => {
                    this.setTranslation()
                })
            })
        },
        components : { Loader }
    }
</script>