<template>
    <div class="page-content noselect">
        <div class="page-title">{{ title }}</div>
        <i @click="loadUsers" v-show="!loading" class="material-icons link page-reload-button" :title="label.refresh">refresh</i>
        <i @click="addUser" v-show="!loading" class="material-icons link page-add-button" :title="label.add">person_add</i>
        <transition name="fade-in">
            <div v-if="users.length > 0" v-show="!loading" class="list">
                <div class="list-header">
                    <span>{{ label.id }}</span>
                    <span>{{ label.lastname }}</span>
                    <span>{{ label.firstname }}</span>
                    <span>{{ label.login }}</span>
                    <span>{{ label.admin }}</span>
                    <span>password</span>
                    <span>{{ label.actions }}</span>
                </div>
                <div v-for="user in users" class="list-row">
                    <span>{{ user._id }}</span>
                    <span>{{ user.lastname }}</span>
                    <span>{{ user.firstname }}</span>
                    <span>{{ user.login }}</span>
                    <span>{{ displayIsAdmin(user.admin) }}</span>
                    <span>{{ user.password }}</span>
                    <span>
                        <i @click="deleteUser(user._id)" class="material-icons link" :title="label.del+' '+user.login">delete_forever</i>
                        <i @click="editUser(user)" class="material-icons link" :title="label.edit+' '+user.login">mode_edit</i>
                    </span>
                </div>
            </div>
            <div v-else v-show="!loading" class="list-empty">
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
    import mixin from '../../../tool/mixin.js'

    export default {
        mixins : mixin.get(mixin.TRANSLATE),
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