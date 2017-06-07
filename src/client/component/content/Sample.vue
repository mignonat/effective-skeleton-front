<template>
    <div class="content">
        <span>Page d'exemple</span>
        <br/><br/>
        <div>
            <label>Test import image webpack</label>
            <img src="../../resources/img/close.png"></src>
        </div>
        <br/><br/>
        <popup :data.sync="popup" @close="close"></popup>
        <button @click="popup.show = true">Open message popup</button>
        <br/><br/>
        <confirm-popup :data.sync="popup_confirm" @close="closeConfirm" @confirm="confirm"></confirm-popup>
        <button @click="popup_confirm.show = true">Open confirm popup</button>
    </div>
</template>

<script>
    import Popup from '../layout/popup/Popup.vue'
    import ConfirmPopup from '../layout/popup/ConfirmPopup.vue'
    const closeImgUrl = require("file-loader!../../resources/img/close.png")

    export default {
        data : function() { return {
            popup : {
                show : false,
                title : 'Titre de la popup',
                text : 'Contenu ultra long de la mort qui tue de la popup modal personnalisable via vue js'
            },
            popup_confirm : {
                show : false,
                title : 'Confirmer l\'action',
                text : 'Vous êtes sûre de vouloir tout casser ?',
                label : {
                    confirm : 'Oui',
                    cancel : 'Non'
                }
            },
            closeImgUrl : closeImgUrl
        }},
        methods : {
            close : function() {
                this.popup.show = false
            },
            closeConfirm : function() {
                this.popup_confirm.show = false
            },
            confirm : function() {
                console.log('Do action here and when finish close popup')
                this.popup_confirm.show = false
            }
        },
        components : { Popup, ConfirmPopup }
    }
</script>