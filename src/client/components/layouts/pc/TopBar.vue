<template>
    <div class="top_bar">
        <span class="top_bar_left_title">{{ translate("app.name") }}</span>
        <span class="top_bar_title">{{ translate("home.title") }}</span>
        <user></user>
        <select-locale></select-locale>
    </div>
</template>

<script>
    import SelectLocale from '../SelectLocale.vue'
    import User from './User.vue'

    export default {
        methods : {
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            }
        },
        components : { SelectLocale, User }
    }
</script>