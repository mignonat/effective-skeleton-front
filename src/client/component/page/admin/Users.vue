<template>
    <div class="page-content noselect">
        <div class="page-title">{{ title }}</div>
        <i @click="loadUsers" v-show="!loading" class="material-icons link page-reload-button" :title="label.refresh">refresh</i>
        <i @click="addUser" v-show="!loading" class="material-icons link page-add-button" :title="label.add">person_add</i>
        <list 
            :loading = "loading" 
            :objects = "users" 
            :options = "list" 
            :titles  = "column_titles" 
            @edit    = "editUser" 
            @delete  = "deleteUser">
        </list>
    </div>
</template>

<script>
    import event from '../../../tool/event.js'
    import ajax from '../../../tool/ajax.js'
    import List from '../../layout/List.vue'
    import mixin from '../../../tool/mixin.js'

    export default {
        mixins : mixin.get(mixin.TRANSLATE),
        data : function() { return {
            loading : true,
            title : this.translate('all.admin.users'),
            users : [],
            list : {
                columns : [
                    { name : '_id' },
                    { name : 'lastname' },
                    { name : 'firstname' },
                    { name : 'login' },
                    { name : 'admin' },
                    { name : 'password' }
                ],
                displayProperty : 'login',
                actions : [ 'edit', 'delete' ]
            },
            column_titles : {
                _id : this.translate('all.id'),
                firstname : this.translate('all.firstname'),
                lastname : this.translate('all.lastname'),
                login : this.translate('all.login'),
                admin : this.translate('all.administrator'),
                password : this.translate('all.password')
            },
            label : {
                refresh : this.translate('all.refresh.data'),
                add: this.translate('all.admin.users.add')
            }   
        }},
        methods : {
            displayIsAdmin(isAdmin) {
                return this.translate(isAdmin? 'all.yes' : 'all.no')
            },
            setTranslation() {
                this.title = this.translate('all.admin.users')
                this.label.refresh = this.translate('all.refresh.data')
                this.label.add = this.translate('all.admin.users.add')
                this.column_titles._id = this.translate('all.id')
                this.column_titles.firstname = this.translate('all.firstname')
                this.column_titles.lastname = this.translate('all.lastname')
                this.column_titles.login = this.translate('all.login')
                this.column_titles.admin = this.translate('all.administrator')
                this.column_titles.password = this.translate('all.password')
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
            deleteUser(user) {
                console.log('delete user with ID='+user._id)
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
        components: { List }
    }
</script>