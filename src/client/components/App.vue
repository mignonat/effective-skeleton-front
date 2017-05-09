<template>
    <div id="app">
        <top-bar></top-bar>
        <left-menu></left-menu>
        <router-view class="content"></router-view>
        <modal-popup :data.sync="error_popup_data" @close="closeErrorPopup"></modal-popup>
    </div>
</template>

<script>
    import TopBar from './layouts/pc/TopBar.vue'
    import LeftMenu from './layouts/pc/LeftMenu.vue'
    import ModalPopup from './layouts/pc/ModalPopup.vue'
    import event from '../utils/event.js'

    export default {
        data : function() { return {
            error_popup_data : {
                show : false,
                title : 'Titre de la popup',
                content : 'Contenu ultra long de la mort qui tue de la popup modal personnalisable via vue js',
                closeLabel : 'Fermer'
            }
        }},
        computed : {}, // use when complexe check has to be done in the template
        methods : { // here no dom manipulation
            closeErrorPopup : function() {
                this.error_popup_data.show = false ;
            },
            showErrorPopup (title, message) {
                this.error_popup_data.title = title
                this.error_popup_data.content = message
                this.error_popup_data.show = true
            }
        },  
        components : { TopBar, LeftMenu, ModalPopup },
        mounted: function () {
            const me = this
            this.$nextTick(function () { // here the document is ready
                event.on(event.POPUP_ERROR, function(arg) {
                    if (arg && Object.prototype.toString.call(arg) == '[object Array]' && arg.length > 1)
                        me.showErrorPopup(arg[0]/*title*/, arg[1]/*content*/)
                    else
                        console.error('App.vue : POPUP_ERROR, arg is not good !')
                })
            })
        }
    }
</script>