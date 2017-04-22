<template>
    <div id="app">
        <div id="header">
            <span id="mc-name">
                {{ translate("app.name") }}
            </span>
            <span id="title">
                {{ translate("home.title") }}
            </span>
            <select id="select-locale" v-model="selectedLocale" v-on:change="setLocale">
                <option value="fr" :selected="selectedLocale === 'fr'">
                    Français
                </option>
                <option value="en" :selected="selectedLocale === 'en'">
                    English
                </option>
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
    export default {
        data () {
            return {
                selectedLocale : this.$store.state.currentLocale
            }
        },
        computed : { 
            /* use when complexe check has to be done in the template */
        },
        methods : { // here no dom manipulation
            setLocale (event) {
                return this.$store.commit('LOCALE_SET', this.selectedLocale)
            },
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            }
        }
    }
</script>

    