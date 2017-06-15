<template>
    <div class="modal-mask" @click="close()" v-show="data.show">
        <transition name="modal">
            <div class="modal-container" @click.stop v-show="data.show">
                <div class="modal-header">
                    <span class="title-modal">{{ data.title }}</span>
                    <span @click="close()" class="close" title="Close Modal">&times;</span>
                </div>
                <div class="modal-body">
                   <div class="modal-body-content">{{ data.text }}</div>
                </div>
                <div class="modal-footer">
                    <div class="button-container">
                        <button @click="close()" class="button">
                            <span>{{ data.label.confirm }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import mixin from '../../../tool/mixin.js'
    
    export default {
        props : [ 'data' ],
        mixins : mixin.get(mixin.TRANSLATE),
        methods : {
            close() {
                this.$emit('close') // signal emit to parent component
            }
        },
        mounted: function () {
            this.$nextTick(function () { // here the document is ready
                document.addEventListener("keydown", (e) => { // escape key is pressed
                    if (this.data.show && e.keyCode == 27)
                        this.close()
                })
            })
        }
    }
</script>