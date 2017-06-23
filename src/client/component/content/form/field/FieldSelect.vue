<template>
    <div class="form-field">
        <select class="form-dropdown" v-model="value">
            <option v-for="opt in options" v-bind:key="opt[optValue]" v-bind:value="opt[optValue]">
                {{ opt[display] }}
            </option>
        </select>
        <label class="form-label" for="select">{{ label }}</label>
        <i class="form-bar"></i>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ],
        props : [ 'optValue', 'display', 'options', 'optValue' ]
    }
</script>