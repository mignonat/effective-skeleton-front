<template>
    <div class="modal-mask" @click="close()" v-show="data.show">
        <transition name="modal">
            <div class="modal-container" @click.stop v-show="data.show">
                <div class="modal-header">
                    <span class="title-modal">{{ getTitle() }}</span>
                    <span @click="close()" class="close" title="Close Modal">&times;</span>
                </div>
                <div class="modal-body">
                   <div class="modal-body-content">{{ data.text }}</div>
                </div>
                <div class="modal-footer">
                    <div class="button-container">
                        <button @click="confirm()" class="button">
                            <span>{{ data.label.confirm }}</span>
                        </button>
                        <button @click="close()" class="button cancel">
                            <span>{{ data.label.cancel }}</span>
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
            },
            confirm() {
                this.$emit('confirm') // signal emit to parent component
            },
            getTitle() {
                if (!this.data.title)
                    return this.translate('all.confirm')
                else 
                    return this.data.title
            }
        },
        mounted () {
            this.$nextTick(function () { // here the document is ready
                document.addEventListener("keydown", (e) => { 
                    if (this.data.show && e.keyCode == 27)      // escape key is pressed
                        this.close()
                    else if (this.data.show && e.keyCode == 13) // enter key is pressed
                        this.$emit('confirm')
                })
            })
        }
    }
</script>