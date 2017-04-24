<template>
    <div id="app">
        <div id="header">
            <span id="mc-name">
                {{ translate("app.name") }}
            </span>
            <span id="title">
                {{ translate("home.title") }}
            </span>
            <select id="select-locale" value="getLocale()" v-on:change="setLocale($event.target.value)">
                <option value="fr" :selected="getLocale() === 'fr'">Français</option>
                <option value="en" :selected="getLocale() === 'en'">English</option>
            </select>
        </div>
        <ul id="menu">
            <li><router-link to="/home" active-class="active">     {{ translate("menu.home") }}     </router-link></li>
            <li><router-link to="/contact" active-class="active">  {{ translate("menu.contact") }}  </router-link></li>
        </ul>
        <router-view class="content"></router-view>
    </div>
</template>

<script>
    import * as action_types from '../vuex/actions.js'

    export default {
        computed : { 
            /* use when complexe check has to be done in the template */
        },
        methods : { // here no dom manipulation
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
            },
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            }
        }
    }
</script>

    