<template>
     <div id="confirmPopup" class="modalAlt">
            <div class="modal-content animate">
                <div class="modal-header">
                    <span class="title-modal">{{ getTitle() }}</span>
                    <span onclick="document.getElementById('confirmPopup').style.display='none'" class="close" title="Close Modal">&times;</span>
                </div>
                <div class="modal-body">
                   <div class="content-modal-body"> {{ data.text }}</div>
                </div>
                <div class="modal-footer">
                    <div class="button-container">
                        <button class="button" onclick="closeAndSlide()" type="button"><span>{{ data.label.confirm }}</span></button><button onclick="document.getElementById('confirmPopup').style.display='none'" class="button cancel" type="button"><span>{{ data.label.cancel }}</span></button>
                    </div>   
                </div>
            </div>
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