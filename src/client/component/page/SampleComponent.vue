<template>
    <div class="page-content">
        <br/><br/>
        <span>Modal popup sample</span>
        <br/><br/>
        <button class="form-button sample-button" @click="openInfo()">
            <span>Info modal</span>
        </button>
        <button class="form-button sample-button" @click="openWarning()">
            <span>Warning modal</span>
        </button>
        <button class="form-button sample-button" @click="openError()">
            <span>Error modal</span>
        </button>
        <button class="form-button sample-button" @click="openConfirm()">
            <span>Confirm modal</span>
        </button>
        <br/><br/>
        <span>Loader small</span>
        <loader size="small"></loader>
        <br/><br/>
        <span>Loader medium</span>
        <loader></loader>
        <br/><br/>
        <span>Loader big</span>
        <loader size="big"></loader>
    </div>
</template>

<script>
    import event from '../../tool/event.js'
    import Loader from '../layout/Loader.vue'

    export default {
        methods : {
            openInfo : function() {
                event.emit(event.POPUP, {
                    type : 'info',
                    title: 'Information message',
                    text: 'This is the content of the INFO modal popup'
                })
            },
            openWarning : function() {
                event.emit(event.POPUP, {
                    type : 'warning',
                    title: 'Warning message',
                    text: 'This is the content of the WARNING modal popup'
                })
            },
            openError : function() {
                event.emit(event.POPUP, {
                    type : 'error',
                    title: 'Error message',
                    text: 'This is the content of the ERROR modal popup'
                })
            },
            openConfirm : function() {
                event.emit(event.POPUP, {
                    type : 'warning',
                    title: 'Confirm answer',
                    text: 'Are you sure that you want to display a javascript test alert which potentialy cannot hurt your conputer ?',
                    callback : () => {
                        alert('Action processed !')
                    },
                    closeCallback : () => {
                        alert('Close action processed !')
                    },
                    confirmLabel : 'I agree',
                    closeLabel : 'I close'
                })
            }
        },
        components : { Loader }
    }
</script>