<template>
    <div class="form-field">
        <input type="range" v-model="value"></input>
        <label class="form-label" for="input">{{ label }}</label>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>