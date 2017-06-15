<template>    
    <div class="contextual-panel">
        <contextual-panel-item :data.sync="contextual_panel_item_sample1" ></contextual-panel-item>
        <contextual-panel-item :data.sync="contextual_panel_item_sample3" ></contextual-panel-item>
        <contextual-panel-item :data.sync="contextual_panel_item_sample2" ></contextual-panel-item>
    </div>
</template>

<script>
    import ContextualPanelItem from '../layout/ContextualPanelItem.vue'
    export default {
        data : function() { return {
            contextual_panel_item_sample1 : {
                show : false,
                title : 'Retractable Panel 1',
                instance :"arrow1",
                type : 'sample1'
            },
            contextual_panel_item_sample2 : {
                show : false,
                title : 'Retractable Panel 2',
                instance :"arrow2",
                type : 'sample2'
            },
            contextual_panel_item_sample3 : {
                show : false,
                title : 'Retractable Panel 3',
                instance :"arrow3",
                type : 'sample3'
            }
        }},
        components : { ContextualPanelItem }
    }
</script>