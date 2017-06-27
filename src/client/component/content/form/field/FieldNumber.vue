<template>
    <div class="field number">
        <label class="field-title">{{ model.label }}</label>
        <div class="field-content">
            <input 
                type="number"
                v-model="value"
                :id="htmlId"
                :min="model.min"
                :max="model.max"
                :autofocus="model.autofocus">
            </input>
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