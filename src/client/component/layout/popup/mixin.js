import mixinTool from '../../../tool/mixin.js'

const closeFn = () => {
    this.$emit('close') // signal emit to parent component
}

const simpleMixin = {
    props : [ 'data' ],
    methods : {
        close : closeFn
    },
    mounted: function () {
        this.$nextTick(function () { // here the document is ready
            document.addEventListener("keydown", (e) => { // escape key is pressed
                if (this.data.show && e.keyCode == 27)
                    this.close()
            })
        })
    }
}

const confirmMixin = {
    props : [ 'data' ],
    methods : {
        close : closeFn,
        confirm() {
            this.$emit('confirm') // signal emit to parent component
        },
        getTitle() {
            if (!this.data.title)
                return this.translate('all.confirm')
            else 
                return this.data.title
        }
    },
    mounted () {
        this.$nextTick(function () { // here the document is ready
            document.addEventListener("keydown", (e) => { 
                if (this.data.show && e.keyCode == 27)      // escape key is pressed
                    this.close()
                else if (this.data.show && e.keyCode == 13) // enter key is pressed
                    this.$emit('confirm')
            })
        })
    }
}

/************ ALL MIXINS ************/

const mixins = {
    SIMPLE : simpleMixin,
    CONFIRM : confirmMixin
}

/************ EXPORT ************/

export default {
    SIMPLE : 'SIMPLE',
    CONFIRM : 'CONFIRM',
    get(param) {
        return mixinTool.staticGet(mixins, param)
    }
}