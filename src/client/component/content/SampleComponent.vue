<template>
    <div class="content">
        <span>Page d'exemple</span>
        <br/><br/>
        <div>
            <label>Test import image webpack</label>
            <img src="../../resource/img/close.png"></src>
        </div>
        <br/><br/>
        <popup :data.sync="popup" @close="close"></popup>
        <button class="button exemple-button" type="button" @click="popup.show = true"><span>Open message popup</span></button>
        <br/><br/>
        <confirm-popup :data.sync="popup_confirm" @close="closeConfirm" @confirm="confirm"></confirm-popup>
        <button type="button" class="button exemple-button" @click="popup_confirm.show = true"><span>Open confirm popup</span></button>
        <br/><br/>
        <modal></modal>
        <button class="button exemple-button" type="button" @click="showmodal()"><span>Open model modal popup</span></button>
    </div>
</template>

<script>
    import Popup from '../layout/popup/Popup.vue'
    import ConfirmPopup from '../layout/popup/ConfirmPopup.vue'
    import Modal from '../layout/popup/Modal.vue'
    const closeImgUrl = require("file-loader!../../resource/img/close.png")

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
            modal : {
                show : false,
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
            },
            showmodal : function(){
               document.getElementById('id01').style.display='block'
            }
        },
        components : { Popup, ConfirmPopup, Modal }
    }
</script>