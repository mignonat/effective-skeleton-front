/**
 * Used to print a label
 * TODO : test because not yet used, merge print & printD into one configurable function
 */
const reader = require('properties-reader')
const config = require('./config.js')
const Const = require('./const.js')
const log = require(config.getAbsRootPath()+'/src/server/shared/log.js')

const locales = [ 'fr', 'en']
const default_locale = locales[0]
const cache = {}
locales.forEach((locale) => { cache[locale] = {} })

const file_hierarchy = (config.get(Const.APP_STACK) == 'back')? 
    [
        config.getAbsRootPath()+'/translations/server/back/',
        config.getAbsRootPath()+'/translations/server/shared/',
        config.getAbsRootPath()+'/translations/server/front/'
    ] : [
        config.getAbsRootPath()+'/translations/server/front/',
        config.getAbsRootPath()+'/translations/server/shared/',
        config.getAbsRootPath()+'/translations/server/back/'
    ]

const getInFileHierarchyFn = (key, locale) => {
    var i=0, file, result, properties
    const len = file_hierarchy.length
    for (;i<len;i++) {
        filePath = file_hierarchy[i]
        filePath += locale+'.properties'
        try {
            properties = reader(filePath)
            result = properties.get(key)
            if (result)
                return result
        } catch(ex) {
            log.error('locales.getInFileHierarchyFn : problem while reading file '+filePath)
        }
    }
}

const exportsFn = {
    print : (key, locale) => {
        if (!locale)
            locale = default_locale

        if (locales.indexOf(locale) == -1) {
            log.debug('Language:print : locale '+locale+' unknown (key='+key+')')
            return '???-'+key+'_'+locale+'-???'
        }

        const translations = cache[locale]
        if (translations.hasOwnProperty(key))
            return translations[key]
        else {
            var translation = getInFileHierarchyFn(key, locale)
            if (!translation)
                translation = '???-'+key+'_'+locale+'-???'
            translations[key] = translation
            return translation
        }
    },

    // d for dynamic label
    printD : (key, params, locale) => {
        var translation = exportsFn.print(key)
        if (translation.indexOf("??") > -1)
            return translation

        if (params == undefined) {
            log.debug('Language:printDynamic : missing params argument for key '+key+' ('+translation+') !')
            return translation
        }

        if (params instanceof Array) {
            const matches = translation.match(/{(\d+)}/g)
            if (!matches) {
                log.debug('Language:printDynamic : key '+key+' ('+translation+') : no argument found in the translation')
                return translation + "-?!?"
            }

            if (matches.length != params.length) {
                log.debug('Language:printDynamic : key '+key+' ('+translation+') : expected arguments '+matches.length+', found : '+params.length)
                return translation + "-?!?"
            }

            var i= 0, txtPattern, regex
            for ( ; i<params.length; i++) {
                txtPattern = '{['+i+']}'
                regex = new RegExp(txtPattern)
                translation = translation.replace(regex, params[i])
            }
        }
        else
            return translation = translation.replace('{0}', params)

        return translation
    },
    getSupportedLocales : () => {
        return locales.slice()
    }
}

module.exports = exportsFn