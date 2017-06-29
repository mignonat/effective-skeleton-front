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
    import bus from '../../tool/bus.js'
    
    export default {
        mixins : mixin.get(mixin.TRANSLATE),
        props : [ 'size' ],
        data : function() { return {
            label : this.translate('all.loading')
        }},
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
            },
            getClass() {
                console.log('this.size='+this.size)
                switch (this.size) {
                    case 'big' : return 'loader-big'
                    case 'small' : return 'loader-small'
                    default : return ''
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                bus.listen(bus.LOCALE_CHANGE, 'Loader', () => {
                    this.setTranslation()
                })
            })
        }
    }
</script>