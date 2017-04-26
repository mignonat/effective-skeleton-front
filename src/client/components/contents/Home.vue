<template>
    <div>
        <span>Page accueil</span>
        <modal-popup id="test" :show.sync="showModalPopup" @closeModalPopup="closeModalPopup"></modal-popup>
        <modal-popup :show.sync="showModalPopup2" @closeModalPopup="closeModalPopup2"></modal-popup>
        <button id="show-modal" @click="showModalPopup = true">Open modal 1</button>
        <button id="show-modal2" @click="showModalPopup2 = true">Open modal 2</button>
    </div>
</template>

<script>
    import ModalPopup from '../layouts/pc/ModalPopup.vue'

    export default {
        data : function() { return {
            showModalPopup: false,
            showModalPopup2: false 
        }},
        methods : {
            closeModalPopup : function(popup) {
                console.log('1 has been closed ! '+popup.testMe())
                this.showModalPopup = false ;
            },
            closeModalPopup2 : function() {
                console.log('2 has been closed !')

                this.showModalPopup2 = false ;
            }
        },
        components : { ModalPopup }
    }
</script>