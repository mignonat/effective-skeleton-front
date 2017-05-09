<template>
    <div class="top_bar">
        <span class="top_bar_left_title">{{ translate("app.name") }}</span>
        <span class="top_bar_title">{{ translate("home.title") }}</span>
        <button @click="auth">Auth</button>
        <select-locale></select-locale>
    </div>
</template>

<script>
    import SelectLocale from '../SelectLocale.vue'
    import ajax from '../../../utils/ajax.js'

    export default {
        methods : {
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            },
            auth () {
                ajax.post('/authenticate', {
                    login : 'mignonat',
                    password : 'petasse@31'
                })
                    .then((data) => { console.log('OK') })
                    .catch((err) => { console.log('KO : '+err) })
            }
        },
        components : { SelectLocale }
    }
</script>