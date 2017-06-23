<template>
    <div class="form-field">
        <input type="text" v-model="value"></input>
        <label class="form-label" for="input">{{ label }}</label>
        <i class="form-bar"></i>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>