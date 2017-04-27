<template>
    <div>
        <span>Page d'exemple</span>
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

    export default {
        data : function() { return {
            popup_data : {
                show : false,
                title : 'Titre de la popup',
                content : 'Contenu ultra long de la mort qui tue de la popup modal personnalisable via vue js',
                closeLabel : 'Fermer'
            },
            confirm_popup_data : {
                show : false,
                title : 'Confirmer l\'action',
                content : 'Vous êtes sûre de vouloir tout casser ?',
                confirmLabel : 'Oui',
                cancelLabel : 'Non'
            }
        }},
        methods : {
            closePopup : function() {
                this.popup_data.show = false ;
            },
            closeConfirmPopup : function() {
                this.confirm_popup_data.show = false ;
            },
            confirmPopup : function() {
                console.log('Do action here and when finish close popup')
                this.confirm_popup_data.show = false ;
            }
        },
        components : { ModalPopup, ConfirmModalPopup }
    }
</script>