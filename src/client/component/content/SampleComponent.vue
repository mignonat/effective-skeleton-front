<template>
    <div class="content">
        <div class="contentPage">
            <span>Page d'exemple</span>
            <br/><br/>
            <div>
                <label>Test import image webpack</label>
                <img src="../../resource/img/close.png"></src>
            </div>
            <br/><br/>
            <confirm-popup :data.sync="popup_confirm" @close="closeConfirm" @confirm="confirm"></confirm-popup>
            <button class="button exemple-button" type="button"  @click="showConfirmModal()"><span>Open confirm popup</span></button>
            <br/><br/>
            <modal :data.sync="popup_model"></modal>
            <button class="button exemple-button" type="button" @click="showmodal()"><span>Open model modal popup</span></button>
        </div>
    </div>
</template>

<script>
    import ConfirmPopup from '../layout/popup/ConfirmPopup.vue'
    import Modal from '../layout/popup/Modal.vue'
    const closeImgUrl = require("file-loader!../../resource/img/close.png")

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
            popup_model : {
                show : false,
                title : 'Popup model title',
                text : ' <form class="" action="">'+ 
                            '<div class="form-group drop">'+
                                '<select type="multiple" class="dropdown">'+
                                    '<option>User 1</option>'+
                                    '<option>User 2</option>'+
                                    '<option>User 3</option>'+
                                    '<option>User 4</option>'+
                                '</select>'+
                                '<label class="control-label" for="select">Dropdown list <span class="required"> * </span></label><i class="bar"></i>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<textarea required="required"></textarea>'+
                                '<label class="control-label" for="textarea">Add a description</label><i class="bar"></i>'+
                            '</div>'+
                            '<div class="form-toggle">'+
                                '<div class="row press">'+
                                    '<input type="checkbox" id="checked2" class="cbx hidden"/>'+
                                    '<label for="checked2" class="lbl"></label>   <span class="ToggleLabel">Activate option </span> '+
                                '</div>'+
                            '</div>'+
                        '</form>',
                label : {
                    confirm : 'Send',
                    cancel : 'Cancel'
                }
            },
            closeImgUrl : closeImgUrl
        }},
        methods : {
            closeConfirm : function() {
                this.popup_confirm.show = false
            },
            confirm : function() {
                console.log('Do action here and when finish close popup')
                this.popup_confirm.show = false
            },
            showmodal : function(){
               document.getElementById('id01').style.display='block'
            },
            showConfirmModal : function(){
               document.getElementById('confirmPopup').style.display='block'
            }
        },
        components : { ConfirmPopup, Modal }
    }
</script>