<template>
    <div class="field email">
        <label class="field-title">{{ model.label }}</label>
        <div class="field-content">
            <input 
                type="email"
                v-model="value"
                :id="htmlId"
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