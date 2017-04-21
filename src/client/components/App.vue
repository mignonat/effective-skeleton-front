<template>
    <div id="app">
        <div id="header">
            <span id="mc-name">
                Marie-Charlotte
            </span>
            <span id="title">
                { translate("main.title") }
            </span>
            <select id="select-locale" name="currentLocale" @change="setLocale">
                <option value="fr" :selected="currentLocale === 'fr'">
                    Français
                </option>
                <option value="en" :selected="currentLocale === 'en'">
                    English
                </option>
            </select>
        </div>
        <ul id="menu">
            <li><router-link to="/home" active-class="active">     { translate("menu.home") }     </router-link></li>
            <li><router-link to="/care" active-class="active">     { translate("menu.care") }     </router-link></li>
            <li><router-link to="/clean" active-class="active">    { translate("menu.clean") }    </router-link></li>
            <li><router-link to="/wellbeing" active-class="active">{ translate("menu.wellbeing") }</router-link></li>
            <li><router-link to="/testimony" active-class="active">{ translate("menu.testimony") }</router-link></li>
            <li><router-link to="/contact" active-class="active">  { translate("menu.contact") }  </router-link></li>
        </ul>
        <router-view class="content"></router-view>
    </div>
</template>

<script>
    import { setLocale } from '../vuex/actions'

    export default {
        vuex : {
            getters : {
                currentLocale : state => state.currentLocale,
                translationMap : state => state.translationMap
            },
            actions : {
                setLocale
            }
        },/*
        data () {
            return {
                //currentLocale : 'fr'
            }
        },*/
        computed : {
            //TODO CONTINUE HERE
            translate (key, params) {
                
                var translation = this.$store.state.translationMap[key]

                if (!translation)
                    translation = '??-'+key+'-??'

                if (!params)
                    return translation

                if (params instanceof Array) {
                    const matches = translation.match(/{(\d+)}/g)

                    if (!matches || matches.length != params.length)
                        return translation+'-??-miss-param-??'

                    var i= 0, txtPattern, regex
                    for ( ; i<params.length; i++) {
                        txtPattern = '{['+i+']}'
                        regex = new RegExp(txtPattern)
                        translation = translation.replace(regex, params[i])
                    }
                    return translation
                }
                else
                    return translation.replace('{0}', params)
            }
        }
    }
</script>

    