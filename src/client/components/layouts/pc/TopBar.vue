<template>
    <div class="top_bar">
        <span class="top_bar_left_title">{{ translate("app.name") }}</span>
        <span class="top_bar_title">{{ translate("home.title") }}</span>
        <select-locale></select-locale>
    </div>
</template>

<script>
    import SelectLocale from '../SelectLocale.vue'

    export default {
        methods : {
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            }
        },
        components : { SelectLocale }
    }
</script>