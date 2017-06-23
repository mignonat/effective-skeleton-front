<template>    
    <div class="contextual-panel">
        <contextual-panel-item :data="panel1" ></contextual-panel-item>
        <contextual-panel-item :data="panel2" ></contextual-panel-item>
    </div>
</template>

<script>
    import ContextualPanelItem from './ContextualPanelItem.vue'
    
    export default {
        data : function() { return {
            panel1 : {
                show : false,
                title : 'Loan infos',
                type : 'sample1'
            },
            panel2 : {
                show : false,
                title : 'Loan Resume',
                type : 'sample2'
            }
        }},
        components : { ContextualPanelItem }
    }
</script>