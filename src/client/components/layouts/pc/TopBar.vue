<template>
    <div class="top_bar">
        <span class="top_bar_left_title">{{ label_name }}</span>
        <div class="top_bar_right">
            <select-locale id="top-bar-locale"></select-locale>
            <user></user>
        </div>
    </div>
</template>

<script>
    import SelectLocale from '../SelectLocale.vue'
    import User from './User.vue'
    import event from '../../../utils/event.js'

    export default {
        data : function() { 
            return {
                label_name : this.translate("app.name")
            }
        },
        methods : {
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            },
            setTranslation() {
                this.label_name = this.translate("app.name")
            }
        },
        components : { SelectLocale, User },
        mounted: function () {
            this.$nextTick(function () {
                event.on(event.LOCALE_CHANGE, () => {
                    this.setTranslation()
                })
            })
        }
    }
</script>