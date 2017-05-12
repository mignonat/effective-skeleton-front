<template>
    <div class="user">
        <div v-if="isLogged" class="user_info">
            <span class="user_name_display"><i class="material-icons">account_circle</i>{{ user.lastname }} {{ user.firstname }}</span>
        </div>
        <div v-else>
            <button @click="toggle" class="user_connection_btn">{{ translate('all.connection') }}</button>
            <transition name="login">
                <div class="login_window" @click.stop v-show="show">
                    <div class="modal_header">
                        <h3>{{ title }}</h3>
                        <i class="material-icons hide_button" :title="translate('all.hide')" @click="hide()">keyboard_arrow_up</i>
                    </div>
                    <div>
                        <span v-show="hasError" class="error">{{ this.displayError() }}</span>
                        <input v-model="login" :placeholder="translate('all.login')" class="login"></input>
                        <input v-model="password" type="password" :placeholder="translate('all.password')" class="password"></input>
                        <button @click="auth" class="login_button">{{ translate('all.valid') }}</button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import SelectLocale from '../SelectLocale.vue'
    import ajax from '../../../utils/ajax.js'
    import * as action_types from '../../../vuex/actions.js'

    //TODO : continue working on user info display

    export default {
        data : function() { 
            return {
                show : false,
                login : undefined,
                password : undefined,
                user : this.$store.getters.getUser(),
                error_credential : false,
                error_internal : false,
                error_server : false
            }
        },
        computed : {
            isLogged () {
                return this.user != undefined
            },
            hasError () {
                return this.error_credential || this.error_internal || this.error_server
            },
            title () {
                return this.translate('all.input.credential')
            }
        },
        methods : {
            setErrorMessages(credential, internal, server) {
                this.error_credential = credential
                this.error_internal = internal
                this.error_server = server
            },  
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            },
            auth () {
                if (!this.login || !this.password) {
                    return
                }
                    
                ajax.post('/authenticate', {
                        login : this.login,//'mignonat',
                        password : this.password//'petasse@31'
                    })
                    .then((data) => {
                        if (data.success) {
                            if (!data.token || !data.user) {
                                return this.setErrorMessages(true, false, false)
                            }

                            this.$store
                                .dispatch(action_types.SET_TOKEN, data)
                                .then(() => {
                                    this.setErrorMessages(false, false, false)
                                    this.user = data.user
                                })
                                .catch((ex) => {
                                    this.setErrorMessages(false, true, false)
                                    console.error('user.auth.setToken : error, '+ex)
                                })
                        } else {
                            console.error(data.message)
                            this.setErrorMessages(true, false, false)
                        }
                    })
                    .catch((err) => {
                        console.log('user.authenticate : '+err) 
                        this.setErrorMessages(false, false, true)
                    })
            },
            displayError() {
                if (this.error_credential)
                    return this.translate('all.error.bad.credential')
                if (this.error_internal)
                    return this.translate('all.error.internal')
                if (this.error_server)
                    return this.translate('all.error.server')
            },
            toggle() {
                this.show = !this.show
            },
            hide() {
                this.show = false
            }
        },
        components : { SelectLocale }
    }
</script>