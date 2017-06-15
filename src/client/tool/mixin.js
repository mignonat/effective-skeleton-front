/************ TRANSLATE ************/

const translateMixin = {
    methods : {
        translate(key, params) {
            return this.$store.getters.translate(key, params)
        }
    }
}

/************ ALL MIXINS ************/

const mixins = {
    TRANSLATE : translateMixin
}

/************ EXPORT ************/

export default {
    TRANSLATE : 'TRANSLATE',
    get(param) {
        const result = []

        if (param == undefined || param == '') {
            console.error('mixin.get : param undefined')
            return result
        }

        if (param instanceof Array) {
            
            param.forEach(mixinName => {
                if (mixins.hasOwnProperty(mixinName))
                    result.push(mixins[mixinName])
            })
            return result ;
        } else if (mixins.hasOwnProperty(param))
            result.push(mixins[param])
        else
            console.error('mixin.get : mixin="'+param+'" unknown')
        
        return result
    },
    staticGet(mixins, param) {
        const result = []

        if (mixins==undefined || param == undefined || param == '') {
            console.error('mixin.staticGet : mixin or param undefined')
            return result
        }

        if (param instanceof Array) {
            param.forEach(mixinName => {
                if (mixins.hasOwnProperty(mixinName))
                    result.push(mixins[mixinName])
                else
                    return 
            })
            return result ;
        } else if (mixins.hasOwnProperty(param))
            result.push(mixins[param])
        else
            console.error('mixin.staticGet : mixin="'+param+'" unknown')
        
        return result
    }
}