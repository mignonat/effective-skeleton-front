<template>
    <div class="field">
        <textarea 
            v-model="value"
            :id="htmlId"
            :maxlength="model.maxlength"
            :rows="model.rows"
            :autofocus="model.autofocus"
            :readonly="model.disabled">
        </textarea>
        <label class="form-label" for="textarea">{{ model.label }}</label>
        <i class="form-bar"></i>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>