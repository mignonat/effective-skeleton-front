<template>
    <div class="field radio">
        <label v-if="model.label" class="field-title">{{ model.label }}</label>
        <div class="field-content">
            <div class="radio-input">
                <input 
                    type="radio"
                    v-model="value"
                    :id="htmlId+'-radio1'"
                    :value="model.firstValue"
                    :name="htmlId"
                    :autofocus="model.autofocus"
                    :checked="checkedFirst">
                </input>
                <label>{{ model.firstLabel }}</label>
            </div>
            <div class="radio-input">
                <input 
                    type="radio"
                    v-model="value"
                    :id="htmlId+'-radio2'"
                    :value="model.secondValue"
                    :name="htmlId"
                    :checked="checkedSecond">
                </input>
                <label>{{ model.secondLabel }}</label>
            </div>
            <div class="focus-bar"></div>
        </div>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.CHECKBOX ]
    }
</script>