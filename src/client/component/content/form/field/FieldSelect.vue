<template>
    <div class="form-field">
        <select 
            class="form-dropdown"
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
        <label class="form-label" for="select">{{ model.label }}</label>
        <i class="form-bar"></i>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>