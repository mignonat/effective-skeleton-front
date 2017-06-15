<template>
    <div id="app">
        <side-nav id="sidenav"></side-nav>
        <div id="main_panel">
            <top-bar></top-bar>
            <div class="router-content top-inset-shadow">
                <transition name="slide_router">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <popup :data.sync="error_popup_data" @close="closeErrorPopup"></popup>
    </div>
</template>

<script>
    import TopBar from './layout/TopBar.vue'
    import SideNav from './layout/SideNav.vue'
    import Popup from './layout/popup/Popup.vue'
    import event from '../tool/event.js'

    export default {
        data : function() { return {
            error_popup_data : {
                show : false,
                title : 'Message',
                text : '--',
                label : {
                    confirm : 'Ok'
                }
            }
        }},
        computed : {}, // use when complexe check has to be done in the template
        methods : { // here no dom manipulation
            closeErrorPopup : function() {
                this.error_popup_data.show = false ;
            },
            showErrorPopup (title, message) {
                this.error_popup_data.title = title
                this.error_popup_data.text = message
                this.error_popup_data.show = true
            }
        },  
        components : { TopBar, SideNav, Popup },
        mounted: function () {
            const me = this
            this.$nextTick(function () { // here the document is ready
                event.on(event.POPUP_ERROR, function(arg) {
                    if (arg && Object.prototype.toString.call(arg) == '[object Array]' && arg.length > 1)
                        me.showErrorPopup(arg[0]/*title*/, arg[1]/*text*/)
                    else
                        console.error('App.vue : POPUP_ERROR, arg is not good !')
                })
            })
        }
    }
</script>