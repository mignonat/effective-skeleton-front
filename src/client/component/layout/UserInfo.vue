<template>
    <div :id="id" class="user-info" @click.stop>
        <div v-if="user" class="user-info-panel valign-center">
            <!-- USER ALREADY AUHTHENTICATED -->
            <i @click="toggle" class="material-icons link">{{ arrowUpDown }}</i>
            <span @click="toggle" class="link user-info-name">{{ user.firstname }}</span>
            <i @click="showConfirmPopup" class="material-icons link" :title="label.logout">exit_to_app</i>
            <transition name="user-info-win">
                <div v-show="show" @click="toggle" class="user-info-win link">
                    <div>
                        <h3 class="user-info-win-title">{{ label.info }}</h3>
                    </div>
                    <div>
                        <div>
                            <div class="user-info-label">{{ label.login }}</div>
                            <div class="user-info-value">{{ user.login }}</div>
                        </div>
                        <div>
                            <div class="user-info-label">{{ label.firstname }}</div>
                            <div class="user-info-value">{{ user.firstname }} </div>
                        </div>
                        <div>
                            <div class="user-info-label">{{ label.lastname }}</div>
                            <div class="user-info-value">{{ user.lastname }}</div>
                        </div>
                        <div v-show="user.admin" class="user-info-type-user">
                            <i class="material-icons small-icon">group</i>
                            {{ label.admin }}s
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div v-else class="user-login-panel valign-center">
            <!-- USER NOT AUHTHENTICATED -->
            <button :id="id+'-login-button'" @click="toggle" class="link valign-center">
                <i class="material-icons small-icon">person</i>
                <span :id="id+'-login-button-label'" class="m-left-5">{{ label.connection }}</span>
                <i @click="toggle" class="material-icons link">{{ arrowUpDown }}</i>
            </button>
            <transition name="user-info-win">
                <div v-show="show" class="user-info-win">
                    <div>
                        <h3 class="user-info-win-title">{{ title }}</h3>
                        <i class="material-icons link user-info-win-hide" :title="label.hide" @click="hide()">keyboard_arrow_up</i>
                    </div>
                    <div class="table">
                        <div v-show="hasError" class="table-row error">{{ this.displayError() }}</div>
                        <input v-model="login" :placeholder="placeholder.login" class="user-info-login table-row"></input>
                        <input v-model="password" type="password" :placeholder="placeholder.password" class="user-info-password table-row"></input>
                        <button @click="auth" class="table-row user-info-login-valid valign-center">
                            {{ label.valid }}
                            <i class="material-icons m-left-5 small-icon">check</i>
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import ajax from '../../tool/ajax.js'
    import * as action_types from '../../vuex/actions.js'
    import event from '../../tool/event.js'
    import mixin from '../../tool/mixin.js'

    export default {
        mixins : mixin.get(mixin.TRANSLATE),
        props : [ 'id' ],
        data : function() { 
            return {
                show : false,
                login : undefined,
                password : undefined,
                user : this.$store.getters.getUser(),
                error_credential : false,
                error_internal : false,
                error_server : false,
                title : this.translate('all.input.credential'),
                label : {
                    firstname : this.translate('all.firstname'),
                    lastname : this.translate('all.lastname'),
                    login : this.translate('all.login'),
                    hide : this.translate('all.hide'),
                    admin : this.translate('all.administrator'),
                    logout : this.translate('all.logout'),
                    info : this.translate('all.my.info'),
                    valid : this.translate('all.valid'),
                    connection : this.translate('all.connection'),
                    popup_title : this.translate('all.confirm'),
                    popup_text : this.translate('all.confirm.logout'),
                    popup_confirm : this.translate('all.logout'),
                    popup_close : this.translate('all.cancel')
                },
                placeholder : {
                    login : this.translate('all.placeholder.login'),
                    password : this.translate('all.placeholder.password')
                }
            }
        },
        computed : {
            arrowUpDown() {
                return this.show? 'keyboard_arrow_down' : 'keyboard_arrow_up'
            },
            hasError () {
                return this.error_credential || this.error_internal || this.error_server
            }
        },
        methods : {
            setErrorMessages(credential, internal, server) {
                this.error_credential = credential
                this.error_internal = internal
                this.error_server = server
                this.password = undefined
            },
            auth () {
                if (!this.login || !this.password) {
                    this.setErrorMessages(true, false, false)
                }
                    
                ajax.post('/authenticate', {
                        login : this.login,//'mignonat',
                        password : this.password//'petasse@31'
                    })
                    .then((data) => {
                        if (!data.token || !data.user)
                            return this.setErrorMessages(false, true, false)

                        this.$store
                            .dispatch(action_types.SET_TOKEN, data)
                            .then(() => {
                                this.setErrorMessages(false, false, false)
                                this.password = undefined
                                this.user = data.user
                                this.show = false
                            })
                            .catch((ex) => {
                                console.error('user.auth.setToken : error, '+ex)
                                this.setErrorMessages(false, true, false)
                            })
                    })
                    .catch((err) => {
                        switch (err.status) {
                            case 401 :
                                this.setErrorMessages(true, false, false)
                                break
                            default : //other like 500
                                this.setErrorMessages(false, false, true)
                                console.log('user.authenticate : error '+err.message)
                        }
                    })
            },
            logout() {
                this.$store
                    .dispatch(action_types.INVALIDATE_TOKEN)
                    .then(() => {
                        this.setDataToLogoutState()
                    })
                    .catch((ex) => {
                        console.error('user.auth.logout : error, '+ex)
                        event.emit(event.POPUP_ERROR, [ this.translate('all.error'), this.translate('all.error.logout') ]);
                    })
            },
            setDataToLogoutState() {
                this.setErrorMessages(false, false, false)
                this.user = undefined
                this.show = false
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
            },
            showConfirmPopup() {
                event.emit(event.POPUP, {
                    type : 'warning',
                    title : this.label.popup_title,
                    text : this.label.popup_text,
                    confirmLabel : this.label.popup_confirm, 
                    closeLabel : this.label.popup_close,
                    callback : this.logout
                })
            },
            setTranslation() {
                this.title = this.translate('all.input.credential')
                this.label.firstname = this.translate('all.firstname')
                this.label.lastname = this.translate('all.lastname')
                this.label.login = this.translate('all.login')
                this.label.hide = this.translate('all.hide')
                this.label.admin = this.translate('all.administrator')
                this.label.logout = this.translate('all.logout')
                this.label.info = this.translate('all.my.info')
                this.label.valid = this.translate('all.valid')
                this.label.connection = this.translate('all.connection')
                this.label.popup_title = this.translate('all.confirm')
                this.label.popup_text = this.translate('all.confirm.logout')
                this.label.popup_confirm = this.translate('all.logout')
                this.label.popup_close = this.translate('all.cancel')
                this.placeholder.login = this.translate('all.placeholder.login')
                this.placeholder.password = this.translate('all.placeholder.password')
            }
        },
        mounted: function () {
            const me = this
            this.$nextTick(function () {
                document.addEventListener("keydown", (e) => { // enter key is pressed
                    if (!me.user && me.show && e.keyCode == 13)
                        me.auth()
                })
                event.on(event.LOCALE_CHANGE, function UserInfo() {
                    me.setTranslation()
                })
                event.on(event.LOGOUT, function UserInfo() {
                    me.setDataToLogoutState()
                })
            })
        }
    }
</script>
