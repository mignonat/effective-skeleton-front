(function checkParams() {
    var searchParams = location.search // '?locale=fr&otherParam=paramValue'
    if (searchParams) {
        searchParams = searchParams.substring(1, searchParams.length) // 'locale=fr&otherParam=paramValue'
        const params = searchParams.split('&') // [ 'locale=fr', 'otherParam=paramValue' ]
        var i=0, len=params.length
        var param, value
        for (;i<len;i++) {
            param = params[i].split('=') // [ 'locale', 'fr' ]
            switch (param[0]) {
                case 'locale' : 
                    value = param[1]
                    if (app_locales.hasOwnProperty(value)) {
                        app_locale = value; break ;
                    }
                    break
            }
        }
    }
})()