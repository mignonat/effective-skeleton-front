<template>
    <div :class="'loader noselect '+sizeClass">
        <div class="loader-circle">
            <div class="loader-circle1 loader-child"></div>
            <div class="loader-circle2 loader-child"></div>
            <div class="loader-circle3 loader-child"></div>
            <div class="loader-circle4 loader-child"></div>
            <div class="loader-circle5 loader-child"></div>
            <div class="loader-circle6 loader-child"></div>
            <div class="loader-circle7 loader-child"></div>
            <div class="loader-circle8 loader-child"></div>
            <div class="loader-circle9 loader-child"></div>
            <div class="loader-circle10 loader-child"></div>
            <div class="loader-circle11 loader-child"></div>
            <div class="loader-circle12 loader-child"></div>
            <div class="loader-text">{{ label }}</div>
        </div>
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
        computed : {
            sizeClass() {
                switch (this.size) {
                    case 'big' : return 'loader-big'
                    case 'small' : return 'loader-small'
                    default : return ''
                }
            }
        },
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