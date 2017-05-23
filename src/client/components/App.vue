<template>
    <div id="app">
        <menus id="sidenav"></menus>
        <div id="main_panel">
            <top-bar></top-bar>
            <div class="router-content top-inset-shadow">
                <transition name="slide_router">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <modal-popup :data.sync="error_popup_data" @close="closeErrorPopup"></modal-popup>
    </div>
</template>

<script>
    import TopBar from './layouts/pc/TopBar.vue'
    import Menus from './layouts/pc/Menus.vue'
    import ModalPopup from './layouts/pc/ModalPopup.vue'
    import event from '../utils/event.js'

    export default {
        data : function() { return {
            error_popup_data : {
                show : false,
                title : 'Message',
                text : '--'
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
        components : { TopBar, Menus, ModalPopup },
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