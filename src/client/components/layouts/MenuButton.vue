<template>
    <div @click="toggle" 
        :class="open? 'menu_button open' : 'menu_button'" 
        :title="open? label.hide : label.show">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
    import event from '../../utils/event.js'
    
    export default {
        data : function() { return {
            open : true,
            label : {
                show : this.translate('all.show.main.menu'),
                hide : this.translate('all.hide.main.menu')
            }
        }},
        methods : {
            toggle() {
                this.open = !this.open
                if (this.open)
                    event.emit(event.MENU_OPENED)
                else
                    event.emit(event.MENU_CLOSED)
            },
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            },
            setTranslation() {
                this.label.show = this.translate('all.show.main.menu')
                this.label.hide = this.translate('all.hide.main.menu')
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                event.on(event.LOCALE_CHANGE, () => {
                    this.setTranslation()
                })
            })
        }
    }
</script>