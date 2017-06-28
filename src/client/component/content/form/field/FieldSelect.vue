<template>
    <div class="field">
        <div v-if="model.label" class="field-title">{{ model.label }}</div>
        <div class="field-input select">
            <select
                v-model="value"
                :id="htmlId"
                :autofocus="model.autofocus">
                <option 
                    v-for="opt in model.options"
                    v-bind:key="opt[model.value]"
                    v-bind:value="opt[model.value]"
                    :selected="value==opt[model.value]? 'selected' : undefined">
                    {{ opt[model.display] }}
                </option>
            </select>
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