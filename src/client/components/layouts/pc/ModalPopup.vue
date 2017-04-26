<template>
    <div class="modal-mask" @click="close" v-show="show" transition="modal">
        <div class="modal-container" @click.stop>

            <div class="modal-header">
                <h3>New Post</h3>
            </div>

            <div class="modal-body">
                <label class="form-label">
                    Title
                    <input class="form-control">
                </label>
                <label class="form-label">
                    Body
                    <textarea rows="5" class="form-control"></textarea>
                </label>
            </div>

            <div class="modal-footer text-right">
                <button class="modal-default-button" @click="close()">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : [ 'show' ],
        methods : {
            close : function() {
                this.$emit('closeModalPopup', this); // signal emit to parent component
            },
            testMe : function() {
                return 'POUET TEST ME'
            }
        },
        mounted: function () {
            this.$nextTick(function () { // here the document is ready
                document.addEventListener("keydown", (e) => { // escape key is pressed
                    if (this.show && e.keyCode == 27) {
                        this.close();
                    }
                });
            })
        }
    }
</script>