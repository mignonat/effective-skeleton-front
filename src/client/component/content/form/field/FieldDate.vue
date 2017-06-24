<template>
    <div class="form-field">
        <input
            type="date" 
            v-model="value"
            :id="htmlId"
            :autofocus="model.autofocus">
        </input>
        <label class="form-label" for="input">{{ model.label }}</label>
        <i class="form-bar form-bar-short"></i>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>