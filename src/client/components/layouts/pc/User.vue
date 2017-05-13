<template>
    <div class="user" @click.stop>
        <div v-if="user" class="user_info">
            <!-- USER ALREADY AUHTHENTICATED -->
            <i v-show="!show" @click="toggle" class="material-icons link">keyboard_arrow_down</i>
            <i v-show="show" @click="toggle" class="material-icons link">keyboard_arrow_up</i>
            <span @click="toggle" class="link user_name">{{ user.firstname }}</span>
            <i @click="showConfirmPopup" class="material-icons link" :title="translate('all.logout')">exit_to_app</i>
            <transition name="user_win"> 
                <div v-show="show" @click="toggle" class="user_win link">
                    <div>
                        <h3 class="user_win_title">{{ translate('all.my.info') }}</h3>
                    </div>
                    <div >
                        <div class="table">
                            <div class="row">
                                <div class="cell bold">{{ label_login }}</div>
                                <div class="cell">{{ user.login }}</div>
                            </div>
                            <div class="row">
                                <div class="cell bold">{{ label_firstname }}</div>
                                <div class="cell">{{ user.firstname }} </div>
                            </div>
                            <div class="row">
                                <div class="cell bold">{{ label_lastname }}</div>
                                <div class="cell">{{ user.lastname }}</div>
                            </div>
                            <div v-show="user.admin" class="row">
                                <i class="material-icons small-icon">group</i>
                                    Administrator
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div v-else class="user_login">
            <!-- USER NOT AUHTHENTICATED -->
            <button @click="toggle" class="link vertical_align_container">
                <i class="material-icons small-icon">person</i>
                <span class="m_left_5">{{ translate('all.connection') }}</span>
                <i v-show="!show" class="material-icons small-icon">keyboard_arrow_down</i>
                <i v-show="show" class="material-icons small-icon">keyboard_arrow_up</i>
            </button>
            <transition name="user_win">
                <div v-show="show" class="user_win">
                    <div>
                        <h3 class="user_win_title">{{ title }}</h3>
                        <i class="material-icons link user_win_hide" :title="label_hide" @click="hide()">keyboard_arrow_up</i>
                    </div>
                    <div>
                        <div v-show="hasError" class="error">{{ this.displayError() }}</div>
                        <input v-model="login" :placeholder="placeholder_login" class="login"></input>
                        <input v-model="password" type="password" :placeholder="placeholder_password" class="password"></input>
                    </div>
                    <button @click="auth" class="user_valid default_button vertical_align_container">
                        {{ translate('all.valid') }}
                        <i class="material-icons m_left_5 small-icon">check</i>
                    </button>
                </div>
            </transition>
        </div>
        <confirm-modal-popup :data.sync="confirm_popup_data" @close="closeConfirmPopup" @confirm="confirmLogout"></confirm-modal-popup>
    </div>
</template>

<script>
    import ajax from '../../../utils/ajax.js'
    import * as action_types from '../../../vuex/actions.js'
    import event from '../../../utils/event.js'
    import ConfirmModalPopup from './ConfirmModalPopup.vue'

    export default {
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
                label_firstname : this.translate('all.firstname'),
                label_lastname : this.translate('all.lastname'),
                label_login : this.translate('all.login'),
                label_hide : this.translate('all.hide'),
                placeholder_login : this.translate('all.placeholder.login'),
                placeholder_password : this.translate('all.placeholder.password'),
                confirm_popup_data : {
                    show : false,
                    content : this.translate('all.confirm.logout'),
                    confirmLabel : this.translate('all.yes'),
                    cancelLabel : this.translate('all.no'),
                }
            }
        },
        computed : {
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
                            if (!data.token || !data.user)
                                return this.setErrorMessages(true, false, false)
                                
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
            logout() {
                this.$store
                    .dispatch(action_types.INVALIDATE_TOKEN)
                    .then(() => {
                        this.setErrorMessages(false, false, false)
                        this.user = undefined
                        this.show = false
                    })
                    .catch((ex) => {
                        console.error('user.auth.logout : error, '+ex)
                        event.emit(event.POPUP_ERROR, [ this.translate('all.error'), this.translate('all.error.logout') ]);
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
            },
            confirmLogout() {
                this.logout()
                this.closeConfirmPopup()
            },
            showConfirmPopup() {
                this.confirm_popup_data.show = true
            },
            closeConfirmPopup() {
                this.confirm_popup_data.show = false
            },
            setTranslation() {
                this.title = this.translate('all.input.credential')
                this.label_firstname = this.translate('all.firstname')
                this.label_lastname = this.translate('all.lastname')
                this.label_login = this.translate('all.login')
                this.label_hide = this.translate('all.hide')
                this.confirm_popup_data.content = this.translate('all.confirm.logout')
                this.confirm_popup_data.confirmLabel = this.translate('all.yes')
                this.confirm_popup_data.cancelLabel = this.translate('all.no')
                this.placeholder_login = this.translate('all.placeholder.login')
                this.placeholder_password = this.translate('all.placeholder.password')
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                document.addEventListener("keydown", (e) => { // enter key is pressed
                    if (!this.user && this.show && e.keyCode == 13)
                        this.auth()
                })
                event.on(event.LOCALE_CHANGE, () => {
                    this.setTranslation()
                })
            })
        },
        components: { ConfirmModalPopup }
    }
</script>