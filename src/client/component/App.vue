<template>
    <div id="app">
        <side-nav id="sidenav"></side-nav>
        <div id="main-panel" class="main-panel-expanded">
            <top-bar></top-bar>
            <div class="router-content top-inset-shadow">
                <transition name="slide-router">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <popup :data.sync="popup" @close="closePopup"></popup>
    </div>
</template>

<script>
    import TopBar from './layout/TopBar.vue'
    import SideNav from './layout/SideNav.vue'
    import Popup from './layout/Popup.vue'
    import event from '../tool/event.js'
    import mixin from '../tool/mixin.js'

    export default {
        data : function() { return {
            popup : {
                show : false,
                type : 'info',
                title : '',
                text : '',
                confirmLabel : undefined, 
                closeLabel : undefined,
                callback : undefined,
                closeCallback : undefined, 
            }
        }},
        mixins : mixin.get(mixin.TRANSLATE),
        computed : {}, // use when complexe check has to be done in the template
        methods : { // here no dom manipulation
            closePopup : function() {
                this.popup.show = false ;
            },
            displayPopup (params) {
                if (!params || Object.prototype.toString.call(params) != '[object Object]') {
                    console.log('App.vue - displayPopup : bad params')
                    return
                }

                if (params.type) this.popup.type = params.type
                else this.popup.type = 'info'
                
                if (params.title) this.popup.title = params.title
                else this.popup.title = 'Missing title param'

                if (params.text) this.popup.text = params.text
                else this.popup.text = 'Missing text param'

                if (params.confirmLabel) this.popup.confirmLabel = params.confirmLabel
                else this.popup.confirmLabel = undefined

                if (params.closeLabel) this.popup.closeLabel = params.closeLabel
                else this.popup.closeLabel = undefined

                if (params.callback) this.popup.callback = params.callback
                else this.popup.callback = undefined

                if (params.closeCallback) this.popup.closeCallback = params.closeCallback
                else this.popup.closeCallback = undefined

                this.popup.show = true
            }
        },  
        components : { TopBar, SideNav, Popup },
        mounted: function () {
            const me = this
            me.$nextTick(function () { // here the document is ready
                event.on(event.POPUP, function(params) {
                    me.displayPopup(params)
                })
            })
        }
    }
</script>