<template>  
    <div class="contextual-panel-item">
        <div class="title-container" @click="open=!open">
            <i :class="open? 'icon-moveUp' : 'icon-moveDown'"></i>  
            <span class="title-panel-item">{{ data.title }}</span>
        </div>
        <transition name="context-panel-item">
            <div v-show="open" class="content-panel-item">
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
    import Sample1 from '../../panel/Sample1.vue'
    import Sample2 from '../../panel/Sample2.vue'

    export default {
        props : [ 'data' ],
        data : function() { return {
            open : false,
        }},
        components : { Sample1, Sample2 }
    }
</script>