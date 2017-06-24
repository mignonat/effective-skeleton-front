<template>
    <div class="form-field">
        <input
             v-model="value"
             :id="htmlId"
             :list="'datalist-'+htmlId"
             :autofocus="model.autofocus">
        </input>
        <datalist :id="'datalist-'+htmlId" class="form-dropdown">
            <option 
                v-for="opt in model.options"
                v-bind:key="opt[model.value]"
                v-bind:value="opt[model.value]">
                {{ opt[model.display] }}
            </option>
        </datalist>
        <label class="form-label" :for="'datalist-'+htmlId">{{ model.label }}</label>
        <i class="form-bar"></i>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>