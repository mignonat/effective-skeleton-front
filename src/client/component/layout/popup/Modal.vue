<template>
        <div id="id01" class="modalAlt">
            <div class="modal-content animate">
                <div class="modal-header">
                    <span class="title-modal">{{ data.title }}</span>
                    <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
                </div>
                <div class="modal-body" v-html="data.text">
                     
                </div>
                <div class="modal-footer">
                    <div class="button-container">
                        <button class="button" onclick="closeAndSlide()" type="button"><span>{{ data.label.confirm }}</span></button>
                        <button onclick="document.getElementById('id01').style.display='none'" class="button cancel" type="button"><span>{{ data.label.cancel }}</span></button>
                    </div>   
                </div>
            </div>
        </div>
</template>

<script>
    import toolMixin from '../../../tool/mixin.js'
    import popupMixin from './mixin.js'

    export default {
        mixins : toolMixin.get(toolMixin.TRANSLATE).concat(popupMixin.get(popupMixin.CONFIRM))
    }
</script>