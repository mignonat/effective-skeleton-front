<template>  
    <div class="contextual-item">
        <div class="contextual-header" @click="open=!open">
            <i :class="iconClass"></i>  
            <span class="contextual-title">{{ data.title }}</span>
        </div>
        <transition name="contextual-item">
            <div v-show="open" class="contextual-item-content">
                <template v-if="data.type=='sample1'">
                    <sample1></sample1>
                </template>
                <template v-if="data.type=='sample2'">
                    <sample2></sample2>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>
    import Sample1 from '../../content/Sample1.vue'
    import Sample2 from '../../content/Sample2.vue'

    export default {
        props : [ 'data' ],
        data : function() { return {
            open : false,
        }},
        computed : {
            iconClass() {
                return this.open? 'contextual-item-icon-up' : 'contextual-item-icon-down'
            }
        },
        components : { Sample1, Sample2 }
    }
</script>