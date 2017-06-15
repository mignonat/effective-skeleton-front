<template>
    <div class="modal_mask" @click="close" v-show="data.show">
        <transition name="modal">
            <div class="modal_container" @click.stop v-show="data.show">
                <div class="modal_header">
                    <h3>{{ data.title }}</h3>
                    <i class="material-icons modal_close_button link" :title="translate('all.close')" @click="close()">close</i>
                </div>
                <div class="modal_body">
                    <label class="form_label">{{ data.text }}</label>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import toolMixin from '../../../tool/mixin.js'
    import popupMixin from './mixin.js'
    
    export default {
        mixins : toolMixin.get(toolMixin.TRANSLATE).concat(popupMixin.get(popupMixin.SIMPLE))
    }
</script>