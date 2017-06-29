<template>
    <div :id="id" class="sidenav noselect sidenav-hidden">
        <div class="sidenav-header">
            <div class="sidenav-header-logo"></div>
            <div class="sidenav-header-name">{{ app_name }}</div>
            <div class="sidenav-header-by">{{ app_by }}</div>
        </div>
        <template v-for="item in items">
            <template v-if="!item.admin || (item.admin && isAdmin)">
                <router-link v-if="item.router_link" :id="item.id" :to="item.router_link" v-on:click.native="notify(item)" active-class="active" class="sidenav-item">
                    <span>{{ item.label }}</span>
                </router-link>
                <div v-else class="sidenav-group">
                    <div @click="item.open=!item.open" :id="item.id" class="sidenav-item">
                        <i v-show="!item.open" class="material-icons small-icon">keyboard_arrow_up</i>
                        <i v-show="item.open"  class="material-icons small-icon">keyboard_arrow_down</i>
                        <span>{{ item.label }}</span>
                    </div>
                    <transition v-for="child in item.children" v-bind:key="child.id" name="sidenav-child">
                        <router-link v-on:click.native="notify(child)" :id="child.id" v-show="item.open" :to="child.router_link" active-class="active" class="sidenav-item sidenav-child">
                            <span>{{ child.label }}</span>
                        </router-link>
                    </transition>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    import event from '../../tool/event.js'
    import mixin from '../../tool/mixin.js'

    export default {
        mixins : mixin.get(mixin.TRANSLATE),
        props : [ 'id' ],
        data : function() { 
            return {
                isAdmin : this.isAdmin(),
                app_name : this.translate('app.name'),
                app_by : this.translate('app.by'),
                items : [{
                    id : 'menu.home',
                    router_link : '/home',
                    label : this.translate('menu.home')
                },{
                    id : 'menu.contact',
                    router_link : '/contact',
                    label : this.translate('menu.contact')
                },{
                    id : 'menu.admin',
                    label : this.translate('menu.admin'),
                    open : false,
                    admin : true,
                    children : [{
                        id : 'menu.admin.users',
                        router_link : '/admin/users',
                        label : this.translate('menu.admin.users')
                    },{
                        id : 'menu.admin.groups',
                        router_link : '/admin/groups',
                        label : this.translate('menu.admin.groups')
                    },{
                        id : 'menu.admin.logs',
                        router_link : '/admin/logs',
                        label : this.translate('menu.admin.logs')
                    },{
                        id : 'menu.admin.maintenance',
                        router_link : '/admin/maintenance',
                        label : this.translate('menu.admin.maintenance')
                    },{
                        id : 'menu.admin.batch',
                        router_link : '/admin/batch',
                        label : this.translate('menu.admin.batch')
                    }]
                },{
                    id : 'menu.sample',
                    label : this.translate('menu.sample'),
                    open : false,
                    admin : true,
                    children : [{
                        id : 'menu.sample.component',
                        router_link : '/sample-component',
                        label : this.translate('menu.sample.component')
                    },{
                        id : 'menu.sample.contextual.panel',
                        router_link : '/sample-contextual-panel',
                        label : this.translate('menu.sample.contextual.panel')
                    },{
                        id : 'menu.sample.form',
                        router_link : '/sample-form',
                        label : this.translate('menu.sample.form')
                    }]
                }]
            }
        },
        methods : {
            isAdmin () {
                return this.$store.getters.isAdmin()
            },
            setTranslation() {
                this.items.forEach((item) => {
                    item.label = this.translate(item.id)
                    if (item.hasOwnProperty('children')) {
                        item.children.forEach((child) => {
                            child.label = this.translate(child.id)
                        })
                    }
                })
                this.app_name = this.translate('app.name')
                this.app_by = this.translate('app.by')
            },
            notify(item) {
                event.emit(event.SIDENAV_CHANGE, { 
                    id : item.id,
                    router_link : item.router_link
                })
            }
        },
        mounted: function () {
            const me = this
            this.$nextTick(function () {
                const meEl = document.getElementById(me.id)
                const mainPanelEl = document.getElementById('main-panel')

                event.on(event.LOCALE_CHANGE, function SideNav() {
                    me.setTranslation()
                })
                event.on(event.LOGIN, function SideNav() {
                    me.isAdmin = me.$store.getters.isAdmin()
                })
                event.on(event.LOGOUT, function SideNav() {
                    me.isAdmin = false
                })
                event.on(event.SIDENAV_OPENED, function SideNav() {
                    meEl.classList.remove("sidenav-hidden")
                    mainPanelEl.classList.remove("main-panel-expanded")
                })
                event.on(event.SIDENAV_CLOSED, function SideNav() {
                    meEl.classList.add("sidenav-hidden")
                    mainPanelEl.classList.add("main-panel-expanded")
                })
            })
        }
    }
</script>

    