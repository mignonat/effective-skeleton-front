<template>
    <div class="user">
        <button @click="auth">Auth</button>
        <span>{{ isLogged }}</span>
    </div>
</template>

<script>
    import SelectLocale from '../SelectLocale.vue'
    import ajax from '../../../utils/ajax.js'

    export default {
        data : function() { return {
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
                ajax.post('/authenticate', {
                        login : 'mignonat',
                        password : 'petasse@31'
                    })
                    .then((data) => {
                        if (data.success) {
                            this.$store
                                .dispatch(action_types.SET_TOKEN, data.token, data.user)
                                .then(() => {
                                    this.setErrorMessages(false, false, false)
                                })
                                .catch((ex) => {
                                    this.setErrorMessages(false, true, false)
                                    console.error('user.auth.setToken : error, '+ex)
                                })
                        } else {
                            this.setErrorMessages(true, false, false)
                        }
                    })
                    .catch((err) => {
                        this.setErrorMessages(false, false, true)
                        console.log('user.authenticate : '+err) 
                    })
            }
        },
        components : { SelectLocale }
    }
</script>