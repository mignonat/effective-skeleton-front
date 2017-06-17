<template>
    <div class="content">
        <div class="contentPage">
            <br/><br/>
            <span>Sample page</span>
            <br/><br/>
            <button class="button exemple-button" @click="openInfo()">
                <span>Open modal Info</span>
            </button>
            <br/><br/>
            <button class="button exemple-button" @click="openWarning()">
                <span>Open modal warning</span>
            </button>
            <br/><br/>
            <button class="button exemple-button" @click="openError()">
                <span>Open modal error</span>
            </button>
            <br/><br/>
            <button class="button exemple-button" @click="openConfirm()">
                <span>Open modal confirm</span>
            </button>
        </div>
    </div>
</template>

<script>
    import event from '../../tool/event.js'

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
        }
    }
</script>