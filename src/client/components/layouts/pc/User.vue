<template>
    <div v-if="isLogged" class="user">
        <span>{{ user.lastname }} {{ user.firstname }}</span>
    </div>
    <div v-else class="user">
        <button @click="open">Connection</button>
        <div class="modal_mask" @click="close" v-show="popup.show">
            <transition name="modal">
                <div class="modal_container" @click.stop v-show="popup.show">
                    <div class="modal_header">
                        <h3>{{ popup.title }}</h3>
                        <i class="material-icons modal_close_button" :title="translate('all.close')" @click="close()">close</i>
                    </div>
                    <div class="modal_body">
                        <input v-model="login" placeholder="Login"></input>
                        <input v-model="password" placeholder="Password"></input>
                        <button @click="auth">Connection</button>
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

    export default {
        data : function() { return {
            popup : {
                show : false,
                title : 'Saisir vos identifiants'
            },
            login : undefined,
            password : undefined,
            user : undefined,
            error_credential : false,
            error_internal : false,
            error_server : false
        }},
        computed : {
            isLogged () {
                return this.user != undefined
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
            open() {
                this.popup.show = true
            },
            close() {
                this.popup.show = false
            }
        },
        components : { SelectLocale }
    }
</script>