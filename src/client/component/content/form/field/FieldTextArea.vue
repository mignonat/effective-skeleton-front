<template>
    <div class="field">
        <div v-if="model.label" class="field-title">{{ model.label }}</div>
        <div class="field-input textarea">
            <textarea 
                v-model="value"
                :id="htmlId"
                :maxlength="model.maxlength"
                :rows="model.rows"
                :autofocus="model.autofocus"
                :readonly="model.disabled">
            </textarea>
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
        mixins : [ mixins.SIMPLE ]
    }
</script>