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
    import bus from '../../tool/bus.js'
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
                    bus.fire(bus.SIDENAV_OPENED)
                else
                    bus.fire(bus.SIDENAV_CLOSED)
            },
            setTranslation() {
                this.label.show = this.translate('all.show.main.menu')
                this.label.hide = this.translate('all.hide.main.menu')
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                bus.listen(bus.LOCALE_CHANGE, 'SideNavButton', () => {
                    this.setTranslation()
                })
            })
        }
    }
</script>