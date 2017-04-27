<template>
    <div class="modal-mask" @click="close" v-show="data.show">
        <transition name="modal">
            <div class="modal-container" @click.stop v-show="data.show">
                <div class="modal-header">
                    <h3>{{ data.title }}</h3>
                </div>
                <div class="modal-body">
                    <label class="form-label">{{ data.content }}</label>
                </div>
                <div class="modal-footer text-right">
                    <button class="modal-default-button" @click="confirm()">{{ data.confirmLabel }}</button>
                    <button class="modal-default-button" @click="close()">{{ data.cancelLabel }}</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props : [ 'data' ],
        methods : {
            close : function() {
                this.$emit('close'); // signal emit to parent component
            },
            confirm : function() {
                this.$emit('confirm'); // signal emit to parent component
            }
        },
        mounted: function () {
            this.$nextTick(function () { // here the document is ready
                document.addEventListener("keydown", (e) => { // escape key is pressed
                    if (this.data.show && e.keyCode == 27) {
                        this.close();
                    }
                });
            })
        }
    }
</script>