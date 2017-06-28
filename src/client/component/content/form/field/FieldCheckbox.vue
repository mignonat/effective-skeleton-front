<template>
    <div class="field">
        <div class="field-title">{{ model.label }}</div>
        <div class="field-input checkbox">
            <input
                type="checkbox"
                v-model="value"
                :id="htmlId"
                :autofocus="model.autofocus"
                :checked="checkedFirst">
            </input>
            <label class="field-label">{{ toggleLabel }}</label>
            <div class="focus-bar"></div>
        </div>
        <div v-if="hasMessage" class="field-message">
            <div v-if="hasHelp"  class="field-help"></div>
            <div v-if="hasError" class="field-error"></div>
        </div>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.CHECKBOX ]
    }
</script>