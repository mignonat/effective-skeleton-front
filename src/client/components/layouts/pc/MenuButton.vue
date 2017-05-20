<template>
    <div @click="toggle" :class="open? 'open' : ''" class="menu_button">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
    import event from '../../../utils/event.js'
    
    export default {
        data : function() { return {
            open : true
        }},
        methods : {
            toggle() {
                this.open = !this.open
                if (this.open)
                    event.emit(event.MENU_OPENED)
                else
                    event.emit(event.MENU_CLOSED)
            }
        }
    }
</script>