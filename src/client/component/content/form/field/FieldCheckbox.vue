<template>
    <div class="form-checkbox">
        <label>
            <input type="checkbox" v-model="value" checked="checked"></input>
            <i class="form-helper"></i>
            {{ label }}
        </label>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>