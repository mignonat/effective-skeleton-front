<template>
    <div class="content-loading">
        <div class="sk-circle">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
        </div>
        <div class="please-loading">{{ label }}</div>
    </div>
</template>

<script>
    import mixin from '../../tool/mixin.js'
    import event from '../../tool/event.js'
    
    export default {
        props : [ 'size' ],
        data : function() { return {
            label : this.translate('all.loading')
        }},
        mixins : mixin.get(mixin.TRANSLATE),
        methods : {
            setTranslation() {
                this.label = this.translate('all.loading')
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                event.on(event.LOCALE_CHANGE, () => {
                    this.setTranslation()
                })
            })
        }
    }
</script>