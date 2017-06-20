<template>
    <div class="modal-mask noselect" @click="close()" v-show="data.show">
        <transition name="modal">
            <div class="modal-container" @click.stop v-show="data.show">
                <div class="modal-header">
                    <i class="material-icons modal-type-icon">{{ typeIcon }}</i>
                    <span class="modal-title">{{ data.title }}</span>
                    <span @click="close()" class="modal-close-button">&times;</span>
                </div>
                <div class="modal-body">
                   <div class="modal-body-content">{{ data.text }}</div>
                </div>
                <div class="modal-footer">
                    <div class="form-button-box">
                        <button @click="confirm()" class="form-button" ref="focusButton">
                            <span>{{ confirmLabel }}</span>
                        </button>
                        <button @click="close()" class="form-button form-cancel">
                            <span>{{ closeLabel }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import event from '../../tool/event.js'
    import mixin from '../../tool/mixin.js'
    
    export default {
        mixins : mixin.get(mixin.TRANSLATE),
        props : [ 'data' ], //data : type, show, title, text, confirmLabel, closeLabel, callback, closeCallback
        data : function() { return {
            label : {
                confirm : this.translate('all.confirm'),
                close : this.translate('all.close')
            }
        }},
        watch : {
            'data.show' : function(show){
                /* give the focus to the button */
                if (show) {
                    setTimeout(()=>{
                        this.$refs.focusButton.focus()
                    }, 300)
                }
            }
        },
        computed : {
            confirmLabel() {
                if (this.data.confirmLabel)
                    return this.data.confirmLabel
                else
                    return this.label.confirm
            },
            closeLabel() {
                if (this.data.closeLabel)
                    return this.data.closeLabel
                else
                    return this.label.close
            },
            typeIcon() {
                switch (this.data.type) {
                    case 'warning' : return 'warning'
                    case 'error' : return 'error'
                    default /* info */ : return 'info_outline'
                }
            }
        },
        methods : {
            confirm() {
                if (this.data.callback) this.data.callback()
                this.$emit('close') // signal emit to parent component
            },
            close() {
                if (this.data.closeCallback) this.data.closeCallback()
                this.$emit('close') // signal emit to parent component
            },
            setTranslation() {
                this.label.confirm = this.translate('all.confirm')
                this.label.close = this.translate('all.close')
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
                event.on(event.LOCALE_CHANGE, () => {
                    this.setTranslation()
                })
            })
        }
    }
</script>