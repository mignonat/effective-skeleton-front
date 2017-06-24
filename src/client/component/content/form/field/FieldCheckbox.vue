<template>
    <div class="form-checkbox">
        <label v-if="model.label" class="field-title">{{ model.label }}</label>
        <label>
            <input 
                type="checkbox"
                v-model="value"
                :id="htmlId"
                :autofocus="model.autofocus"
                :checked="checkedFirst">
            </input>
            <i class="form-helper"></i>
            {{ toggleLabel }}
        </label>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.CHECKBOX ]
    }
</script>