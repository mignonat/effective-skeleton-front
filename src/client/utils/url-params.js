export default {
    get : (paramName) => {
        var search = location.search // '?locale=fr&otherParam=paramValue'
        if (search) {
            search = search.substring(1, search.length) // 'locale=fr&otherParam=paramValue'
            var params = search.split('&') // [ 'locale=fr', 'otherParam=paramValue' ]
            const len=params.length
            var i=0, param
            for (;i<len;i++) {
                param = params[i].split('=') // [ 'locale', 'fr' ]
                if (param[0] == paramName)
                    return param[1]
            }
        }
    }
}