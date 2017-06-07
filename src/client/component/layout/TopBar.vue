<template>
    <div class="top_bar noselect">
        <menu-button></menu-button>
        <span class="top_bar_left_title m_left_10">{{ app_name }}</span>
        <div class="top_bar_right v_align_container">
            <select-locale id="top_bar_locale"></select-locale>
            <user-info id="top_bar_user"></user-info>
        </div>
    </div>
</template>

<script>
    import SelectLocale from './SelectLocale.vue'
    import UserInfo from './UserInfo.vue'
    import MenuButton from './MenuButton.vue'
    import event from '../../utils/event.js'

    export default {
        data : function() { 
            return {
                app_name : this.translate("app.name")
            }
        },
        methods : {
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            },
            setTranslation() {
                this.app_name = this.translate("app.name")
            }
        },
        components : { SelectLocale, UserInfo, MenuButton },
        mounted: function () {
            this.$nextTick(function () {
                event.on(event.LOCALE_CHANGE, () => {
                    this.setTranslation()
                })
            })
        }
    }
</script>