<template>
    <div class="form-radio-box">
        <label v-if="model.label" class="field-title">{{ model.label }}</label>
        <div class="form-radio">
            <label>
                <input 
                    type="radio"
                    v-model="value"
                    :id="htmlId+'-radio1'"
                    :value="model.firstValue"
                    :name="htmlId"
                    :autofocus="model.autofocus"
                    :checked="checkedFirst">
                </input>
                <i class="form-helper"></i>
                {{ model.firstLabel }}
            </label>
        </div>
        <div class="form-radio">
            <label>
                <input 
                    type="radio"
                    v-model="value"
                    :id="htmlId+'-radio2'"
                    :value="model.secondValue"
                    :name="htmlId"
                    :checked="checkedSecond">
                </input>
                <i class="form-helper"></i>
                {{ model.secondLabel }}
            </label>
        </div>
    </div>
</template>

<script>
    import mixins from './mixins.js'

    export default {
        mixins : [ mixins.CHECKBOX ]
    }
</script>