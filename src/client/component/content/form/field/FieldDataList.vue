<template>
    <div class="field datalist">
        <label class="field-title">{{ model.label }}</label>
        <div class="field-content">
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
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>