<template>
    <div class="form-radio-box">
        <div class="form-radio">
            <label>
                <input type="radio" name="radio" v-model="value" checked="checked"></input>
                <i class="form-helper"></i>
                {{ label }}
            </label>
        </div>
        <div class="form-radio">
            <label>
                <input type="radio" name="radio"></input>
                <i class="form-helper"></i>
                {{ label }}
            </label>
        </div>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.SIMPLE ]
    }
</script>