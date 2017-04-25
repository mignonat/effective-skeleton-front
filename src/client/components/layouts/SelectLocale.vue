<template>
    <select class="select_locale" value="getLocale()" v-on:change="setLocale($event.target.value)">
        <option value="fr" :selected="getLocale() === 'fr'">Français</option>
        <option value="en" :selected="getLocale() === 'en'">English</option>
    </select>
</template>

<script>
    import * as action_types from '../../vuex/actions.js'

    export default {
        methods : {
            getLocale () {
                return this.$store.getters.getLocale()
            },
            setLocale (locale) {
                this.$store
                    .dispatch(action_types.SET_LOCALE, locale)
                    .catch((ex) => {
                        // TODO display error to user
                        console.error('App.setLocale : '+ex)
                    })
            }
        }
    }
</script>