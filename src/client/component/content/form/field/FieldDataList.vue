<template>
    <div class="field">
        <div class="field-title">{{ model.label }}</div>
        <div class="field-input datalist">
            <input
                v-model="value"
                :id="htmlId"
                :list="'datalist-'+htmlId"
                :autofocus="model.autofocus">
            </input>
            <datalist :id="'datalist-'+htmlId">
                <option 
                    v-for="opt in model.options"
                    v-bind:key="opt[model.value]"
                    v-bind:value="opt[model.value]">
                    {{ opt[model.display] }}
                </option>
            </datalist>
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