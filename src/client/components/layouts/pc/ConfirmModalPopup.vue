<template>
    <div class="modal_mask" @click="close" v-show="data.show">
        <transition name="modal">
            <div class="modal_container" @click.stop v-show="data.show">
                <div class="modal_header">
                    <h3>{{ getTitle() }}</h3>
                    <i class="material-icons modal_close_button" :title="translate('all.close')" @click="close()">close</i>
                </div>
                <div class="modal_body">
                    <label class="form_label">{{ data.content }}</label>
                </div>
                <div class="modal_footer text_right">
                    <button @click="confirm()" class="default_button">{{ data.confirmLabel }}</button>
                    <button @click="close()">{{ data.cancelLabel }}</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props : [ 'data' ],
        methods : {
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            },
            close () {
                this.$emit('close') // signal emit to parent component
            },
            confirm () {
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