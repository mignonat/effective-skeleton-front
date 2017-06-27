<template>
    <div class="field">
        <input 
            type="range"
            v-model="value"
            :id="htmlId"
            :min="model.min"
            :max="model.max"
            :autofocus="model.autofocus">
        </input>
        <label class="form-label" for="input">{{ model.label }} : {{ value }}</label>
        <i class="form-bar"></i>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>