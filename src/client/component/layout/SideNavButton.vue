<template>
    <div @click="toggle" 
        :class="open? 'sidenav-button open' : 'sidenav-button'" 
        :title="open? label.hide : label.show">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
    import event from '../../tool/event.js'
    import mixin from '../../tool/mixin.js'
    
    export default {
        mixins : mixin.get(mixin.TRANSLATE),
        data : function() { return {
            open : false,
            label : {
                show : this.translate('all.show.main.menu'),
                hide : this.translate('all.hide.main.menu')
            }
        }},
        methods : {
            toggle() {
                this.open = !this.open
                if (this.open)
                    event.emit(event.SIDENAV_OPENED)
                else
                    event.emit(event.SIDENAV_CLOSED)
            },
            setTranslation() {
                this.label.show = this.translate('all.show.main.menu')
                this.label.hide = this.translate('all.hide.main.menu')
            }
        },
        mounted: function () {
            const me = this
            this.$nextTick(function () {
                event.on(event.LOCALE_CHANGE, function SideNavButton() {
                    me.setTranslation()
                })
            })
        }
    }
</script>