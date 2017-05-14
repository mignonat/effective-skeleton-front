<template>
    <div>
        <span>Page d'exemple</span>
        <br/><br/>
        <div>
            <label>Test import image webpack</label>
            <img src="../../resources/img/close.png"></src>
        </div>
        <br/><br/>
        <modal-popup :data.sync="popup_data" @close="closePopup"></modal-popup>
        <button @click="popup_data.show = true">Open message popup</button>
        <br/><br/>
        <confirm-modal-popup :data.sync="confirm_popup_data" @close="closeConfirmPopup" @confirm="confirmPopup"></confirm-modal-popup>
        <button @click="confirm_popup_data.show = true">Open confirm popup</button>
    </div>
</template>

<script>
    import ModalPopup from '../layouts/pc/ModalPopup.vue'
    import ConfirmModalPopup from '../layouts/pc/ConfirmModalPopup.vue'
    const closeImgUrl = require("file-loader!../../resources/img/close.png")

    export default {
        data : function() { return {
            popup_data : {
                show : false,
                title : 'Titre de la popup',
                text : 'Contenu ultra long de la mort qui tue de la popup modal personnalisable via vue js'
            },
            confirm_popup_data : {
                show : false,
                title : 'Confirmer l\'action',
                text : 'Vous êtes sûre de vouloir tout casser ?',
                label_confirm : 'Oui',
                label_cancel : 'Non'
            },
            closeImgUrl : closeImgUrl
        }},
        methods : {
            closePopup : function() {
                this.popup_data.show = false
            },
            closeConfirmPopup : function() {
                this.confirm_popup_data.show = false
            },
            confirmPopup : function() {
                console.log('Do action here and when finish close popup')
                this.confirm_popup_data.show = false
            }
        },
        components : { ModalPopup, ConfirmModalPopup }
    }
</script>