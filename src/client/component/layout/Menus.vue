<template>
    <div :id="id" class="menus noselect closed-main-menu">
        <div id="app-logo">
            <div id="logo" class="icon-defaultdesigner2">

            </div>
            <div id="text-logo">
                Real App
            </div>
            <div id="text-sub-logo">
                By Effective
            </div>
        </div>
        <template v-for="menu in menus">
            <template v-if="!menu.admin || (menu.admin && isAdmin)">
                <router-link :id="menu.id" v-if="menu.router_link" :to="menu.router_link" active-class="active" class="link-menu">
                    <span class="menu-text-link">{{ menu.label }}</span>
                </router-link>
                <div v-else class="menu-group">
                    <div @click="menu.open=!menu.open" :id="menu.id" class="link">
                        <i v-show="!menu.open" class="material-icons small-icon">keyboard_arrow_up</i>
                        <i v-show="menu.open" class="material-icons small-icon">keyboard_arrow_down</i>
                        <span class="menu-text-link">{{ menu.label }}</span>
                    </div>
                    <transition v-for="child in menu.children" v-bind:key="child.id" name="menu_item">
                        <router-link :id="child.id" v-show="menu.open" :to="child.router_link" active-class="active" class="menu-item">
                            <span class="sub-menu-text-link">{{ child.label }}</span>
                        </router-link>
                    </transition>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    import event from '../../tool/event.js'

    export default {
        props : [ 'id' ],
        data : function() { 
            return {
                isAdmin : this.isAdmin(),
                menus : [
                    {
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
                        children : [
                            {
                                id : 'menu.admin.users',
                                router_link : '/admin/users',
                                label : this.translate('menu.admin.users')
                            },{
                                id : 'menu.admin.groups',
                                router_link : '/admin/groups',
                                label : this.translate('menu.admin.groups')
                            }
                        ]
                    },{
                        id : 'menu.sample',
                        router_link : '/sample',
                        label : this.translate('menu.sample')
                    },{
                        id : 'menu.sampleWithLeftPanel',
                        router_link : '/samplewithleftpanel',
                        label : this.translate('menu.samplewithpanel')
                    }
                ]
            }
        },
        methods : {
            isAdmin () {
                return this.$store.getters.isAdmin()
            },
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            },
            setTranslation() {
                this.menus.forEach((menu) => {
                    menu.label = this.translate(menu.id)
                    if (menu.hasOwnProperty('children')) {
                        menu.children.forEach((child) => {
                            child.label = this.translate(child.id)
                        })
                    }
                })
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                event.on(event.LOCALE_CHANGE, () => {
                    this.setTranslation()
                })
                event.on(event.LOGIN, () => {
                    this.isAdmin = this.$store.getters.isAdmin()
                })
                event.on(event.LOGOUT, () => {
                    this.isAdmin = false
                })
                event.on(event.MENU_OPENED, () => {
                    document.getElementById(this.id).classList.remove("closed-main-menu")
                    document.getElementById('main_panel').style.marginLeft = '250px'
                })
                event.on(event.MENU_CLOSED, () => {
                    document.getElementById(this.id).classList.add("closed-main-menu")
                    document.getElementById('main_panel').style.marginLeft= '0'
                })
            })
        }
    }
</script>

    