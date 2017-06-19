<template>
    <div class="page-content">
        <contextual-panel></contextual-panel>
        <div>Content of the page</div>
    </div>
</template>

<script>
    import ContextualPanel from '../layout/contextual/ContextualPanel.vue'
    export default {
        components : { ContextualPanel }
    }
</script>