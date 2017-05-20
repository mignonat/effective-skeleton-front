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
    export default {
        props : [ 'data' ],
        methods : {
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            },
            close () {
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