<template>
    <select class="select_locale" value="selected" v-on:change="setLocale($event.target.value)">
        <option value="fr" :selected="selected === 'fr'">Français</option>
        <option value="en" :selected="selected === 'en'">English</option>
    </select>
</template>

<script>
    import * as action_types from '../../vuex/actions.js'
    import bus from '../../utils/bus.js'

    export default {
        data : function() { return {
            selected : this.getLocale()
        }},
        methods : {
            getLocale () {
                return this.$store.getters.getLocale()
            },
            setLocale (locale) {
                const oldLocale = this.selected
                this.selected = locale
                this.$store
                    .dispatch(action_types.SET_LOCALE, locale)
                    .catch((ex) => {
                        console.error('locale.setLocale : error, '+ex)
                        this.selected = oldLocale
                        bus.emit(bus.POPUP_ERROR, [ this.translate('all.error'), this.translate('all.error.locale.set') ]);
                    })
            },
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            }
        }
    }
</script>