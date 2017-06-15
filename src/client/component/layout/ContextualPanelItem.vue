<template>  
    <div class="contextual-panel-item">
        <div id="title-container" class="title-container" @click="toggle">
            <i :class="open? 'icon-moveUp' : 'icon-moveDown'"></i>  
            <span id="title-panel-item" class="title-panel-item">{{ data.title }}</span>
        </div>
        <transition name="slide-up">
            <div v-show="open" id="content-panel-item" class="content-panel-item">
                <template v-if="data.type=='sample1'">
                    <sample1></sample1>
                </template>
                <template v-if="data.type=='sample3'">
                    <div>lorem ipsum dolor sit amet consecture</div>
                </template>
                <template v-if="data.type=='sample2'">
                    <sample2></sample2>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>
    import Sample1 from '../fragment/Sample1.vue'
    import Sample2 from '../fragment/Sample2.vue'

    export default {
        props : [ 'data' ],
        data : function() { return {
            open : false,
        }},
        methods : {
            toggle() {
                this.open = !this.open
                document.getElementById(instance).classList.remove("icon-moveDown");
                document.getElementById(instance).classList.add("icon-moveUp");
            }
        },
        components : { Sample1, Sample2 }
    }
</script>