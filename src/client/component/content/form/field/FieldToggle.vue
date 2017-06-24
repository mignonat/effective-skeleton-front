<template>
    <div class="form-toggle">
        <label v-if="model.label" class="field-title">{{ model.label }}</label>
        <input
            type="checkbox"
            v-model="value"
            :id="htmlId"
            :checked="checkedFirst"
            :autofocus="autofocus"
            class="form-hidden">
        </input>
        <label :for="htmlId" class="form-toggle-text"></label>
        <span>{{ toggleLabel }}</span>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.CHECKBOX ]
    }
</script>