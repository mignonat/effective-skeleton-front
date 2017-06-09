<template>
    <div class="content noselect">
        <div class="page_title">{{ title }}</div>
        <i @click="loadUsers" v-show="!loading" class="material-icons link reload_btn" :title="label.refresh">refresh</i>
        <i @click="addUser" v-show="!loading" class="material-icons link add_btn" :title="label.add">person_add</i>
        <transition name="fade-in">
            <div v-if="users.length > 0" v-show="!loading" class="users_list table">
                <div class="user_header_row user_row row">
                    <span class="cell">{{ label.id }}</span>
                    <span class="cell">{{ label.lastname }}</span>
                    <span class="cell">{{ label.firstname }}</span>
                    <span class="cell">{{ label.login }}</span>
                    <span class="cell">{{ label.admin }}</span>
                    <span class="cell">password</span>
                    <span class="cell">{{ label.actions }}</span>
                </div>
                <div v-for="user in users" class="user_row row">
                    <span class="cell">{{ user._id }}</span>
                    <span class="cell">{{ user.lastname }}</span>
                    <span class="cell">{{ user.firstname }}</span>
                    <span class="cell">{{ user.login }}</span>
                    <span class="cell">{{ displayIsAdmin(user.admin) }}</span>
                    <span class="cell">{{ user.password }}</span>
                    <span class="cell">
                        <i @click="deleteUser(user._id)" class="material-icons link" :title="label.del+' '+user.login">delete_forever</i>
                        <i @click="editUser(user)" class="material-icons link" :title="label.edit+' '+user.login">mode_edit</i>
                    </span>
                </div>
            </div>
            <div v-else v-show="!loading" class="empty">
                {{ label.empty }}
            </div>
        </transition>
        <loader v-show="loading"></loader>
    </div>
</template>

<script>
    import event from '../../../tool/event.js'
    import ajax from '../../../tool/ajax.js'
    import Loader from '../../layout/Loader.vue'

    export default {
        data : function() { return {
            loading : true,
            users : [],
            title : this.translate('all.admin.users'),
            label : {
                id : this.translate('all.id'),
                firstname : this.translate('all.firstname'),
                lastname : this.translate('all.lastname'),
                login : this.translate('all.login'),
                admin : this.translate('all.administrator'),
                empty : this.translate('all.empty.users'),
                refresh : this.translate('all.refresh.data'),
                actions: this.translate('all.actions'),
                add: this.translate('all.admin.users.add'),
                edit: this.translate('all.admin.users.edit'),
                del: this.translate('all.delete')
            }
        }},
        methods : {
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            },
            displayIsAdmin(isAdmin) {
                return this.translate(isAdmin? 'all.yes' : 'all.no')
            },
            setTranslation() {
                this.title = this.translate('all.admin.users')
                this.label.id = this.translate('all.id')
                this.label.firstname = this.translate('all.firstname')
                this.label.lastname = this.translate('all.lastname')
                this.label.login = this.translate('all.login')
                this.label.admin = this.translate('all.administrator')
                this.label.empty = this.translate('all.empty.users')
                this.label.refresh = this.translate('all.refresh.data')
                this.label.actions = this.translate('all.actions')
                this.label.add = this.translate('all.admin.users.add')
                this.label.edit = this.translate('all.admin.users.edit')
                this.label.del = this.translate('all.delete')
            },
            loadUsers() {
                this.loading = true
                const me = this
                setTimeout(() => {
                    ajax.post('/users')
                        .then((data) => {
                            if (data.success) {
                                if (!data.users) {
                                    console.error('Users : /users error '+data.message)
                                    me.users = []
                                } else
                                    me.users = data.users
                            } else {
                                console.error('Users : /users error '+data.message)
                                me.users = []
                            }
                            me.loading = false
                        })
                        .catch((err) => {
                            console.error('Users : /users error '+err)
                            me.users = []
                            me.loading = false
                        })
                }, 1000)
            },
            addUser() {
                console.log('add user')
            },
            editUser(user) {
                console.log('edit user with ID='+user._id)
            },
            deleteUser(userId) {
                console.log('delete user with ID='+userId)
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.loadUsers()

                event.on(event.LOCALE_CHANGE, () => {
                    this.setTranslation()
                })
            })
        },
        components: { Loader }
    }
</script>