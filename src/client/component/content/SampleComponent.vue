<template>
    <div class="content">
        <div class="contentPage">
            <span>Page d'exemple</span>
            <br/><br/>
            <confirm-popup :data.sync="popup_confirm" @close="closeConfirm" @confirm="confirm"></confirm-popup>
            <button class="button exemple-button" @click="popup_confirm.show=true">
                <span>Open confirm popup</span>
            </button>
            <br/><br/>
            <popup :data.sync="popup" @close="close"></popup>
            <button class="button exemple-button" @click="popup.show=true">
                <span>Open modal popup</span>
            </button>
            <br/><br/>
            <span>Loader big</span>
            <loader size="big"></loader>
            <br/><br/>
            <span>Loader small</span>
            <loader size="small"></loader>
            <br/><br/>
            <span>Loader normal</span>
            <loader></loader>
        </div>
    </div>
</template>

<script>
    import ConfirmPopup from '../layout/popup/ConfirmPopup.vue'
    import Popup from '../layout/popup/Popup.vue'
    import Loader from '../layout/Loader.vue'

    export default {
        data : function() { return {
            popup_confirm : {
                show : false,
                title : 'Confirmer l\'action',
                text : 'Vous êtes sûre de vouloir tout casser ?',
                label : {
                    confirm : 'Oui',
                    cancel : 'Non'
                }
            },
            popup : {
                show : false,
                title : 'Information',
                text : 'Ceci est un message d\'information !',
                label : {
                    confirm : 'Ok'
                }
            }
        }},
        methods : {
            closeConfirm : function() {
                this.popup_confirm.show = false
            },
            close : function() {
                this.popup.show = false
            },
            confirm : function() {
                console.log('Do action here and when finish close popup')
                this.popup_confirm.show = false
            }
        },
        components : { ConfirmPopup, Popup, Loader }
    }
</script>