<template>
    <div class="popup-mask noselect" @click="close()" v-show="data.show">
        <transition name="popup">
            <div class="popup-container" @click.stop v-show="data.show">
                <div class="popup-header">
                    <i class="material-icons popup-type-icon">{{ typeIcon }}</i>
                    <span class="popup-title">{{ data.title }}</span>
                    <span @click="close()" class="popup-close-button">&times;</span>
                </div>
                <div class="popup-body">
                   <div class="popup-body-content">{{ data.text }}</div>
                </div>
                <div class="popup-footer">
                    <div class="button-container">
                        <button @click="confirm()" class="button" ref="focusButton">
                            <span>{{ confirmLabel }}</span>
                        </button>
                        <button @click="close()" class="button button-cancel">
                            <span>{{ closeLabel }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import bus from '../../tool/bus.js'
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
        mounted : function () {
            this.$nextTick(function () { // here the document is ready
                document.addEventListener("keydown", (e) => { 
                    if (this.data.show && e.keyCode == 27)      // escape key is pressed
                        this.close()
                    else if (this.data.show && e.keyCode == 13) // enter key is pressed
                        this.$emit('confirm')
                })
                bus.listen(bus.LOCALE_CHANGE, 'Popup', () => {
                    this.setTranslation()
                })
            })
        }
    }
</script>