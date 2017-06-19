<template>
    <div class="top_bar noselect">
        <side-nav-button></side-nav-button>
        <span class="top_bar_left_title m_left_10">{{ title }}</span>
        <div class="top_bar_right v_align_container">
            <select-locale id="top_bar_locale"></select-locale>
            <user-info id="top_bar_user"></user-info>
        </div>
    </div>
</template>

<script>
    import SelectLocale from './SelectLocale.vue'
    import UserInfo from './UserInfo.vue'
    import SideNavButton from './SideNavButton.vue'
    import event from '../../tool/event.js'
    import mixin from '../../tool/mixin.js'

    export default {
        mixins : mixin.get(mixin.TRANSLATE),
        data : function() { 
            return {
                menuLabelKey : 'menu.home',
                title : this.translate('menu.home.title')
            }
        },
        methods : {
            setTranslation() {
                this.title = this.translate(this.menuLabelKey+'.title')
            }
        },
        components : { SelectLocale, UserInfo, SideNavButton },
        mounted: function () {
            this.$nextTick(function () {
                event.on(event.SIDENAV_CHANGE, (menu) => {
                    this.menuLabelKey = menu.id
                    this.setTranslation()
                })
                event.on(event.LOCALE_CHANGE, () => {
                    this.setTranslation()
                })
            })
        }
    }
</script>