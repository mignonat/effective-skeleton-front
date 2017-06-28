<template>
    <div class="field toggle">
        <div v-if="model.label" class="field-title">{{ model.label }}</div>
        <div class="field-input toggle">
            <input
                type="checkbox"
                v-model="value"
                :id="htmlId"
                :checked="checkedFirst"
                :autofocus="autofocus"
                class="field-hidden">
            </input>
            <label :for="htmlId" class="toggle-text"></label>
            <span>{{ toggleLabel }}</span>
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