<template>
    <div class="form-field">
        <input type="email" v-model="value"></input>
        <label class="form-label" for="input">{{ label }}</label>
        <i class="form-bar form-bar-short"></i>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>