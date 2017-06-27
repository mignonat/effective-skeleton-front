<template>
    <div class="field checkbox">
        <label class="field-title">{{ model.label }}</label>
        <div class="field-input">
            <input
                type="checkbox"
                v-model="value"
                :id="htmlId"
                :autofocus="model.autofocus"
                :checked="checkedFirst">
            </input>
            <label class="field-label">{{ toggleLabel }}</label>
        </div>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.CHECKBOX ]
    }
</script>