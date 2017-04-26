<template>
    <div>
        <span>Page d'exemple</span>
        <br/><br/>
        <modal-popup :data.sync="popup_data" @close="closePopup"></modal-popup>
        <button @click="popup_data.show = true">Open modal popup</button>
    </div>
</template>

<script>
    import ModalPopup from '../layouts/pc/ModalPopup.vue'

    export default {
        data : function() { return {
            popup_data : {
                show : false,
                title : 'Titre de la popup',
                content : 'Contenu ultra long de la mort qui tue de la popup modal personnalisable via vue js'
            }
        }},
        methods : {
            closePopup : function() {
                this.popup_data.show = false ;
            }
        },
        components : { ModalPopup }
    }
</script>