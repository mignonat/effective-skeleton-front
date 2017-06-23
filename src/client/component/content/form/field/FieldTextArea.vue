<template>
    <div class="form-field">
        <textarea v-model="value"></textarea>
        <label class="form-label" for="textarea">{{ label }}</label>
        <i class="form-bar"></i>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>