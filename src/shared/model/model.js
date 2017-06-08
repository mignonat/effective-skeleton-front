import UserEntity from './entity/User.vue'

const toString = Object.prototype.toString
const hasOwn = Object.prototype.hasOwnProperty
const checkNativeValueType = (value, type) => {
    if (value==undefined || type==undefined)
        return false

    switch (type) {
        case 'string'  : return toString.call(fieldValue) == '[object String]'
        case 'boolean' : return toString.call(fieldValue) == '[object Boolean]'
        case 'number'  : return toString.call(fieldValue) == '[object Number]'
        case 'array'   : return toString.call(fieldValue) == '[object Array]'
        case 'object'  : return toString.call(fieldValue) == '[object Object]'
    }
}

const entityModelByName = {
    [UserEntity.name] : UserEntity
}

const nativeTypes = {
    string : 'string',
    boolean : 'boolean',
    number : 'number',
    array : 'array',
    object : 'object'
}

const fieldTypes = {
    id : {
        fieldType : nativeTypes.string,
        unique : true,
        notNull : true
    },
    string : {
        fieldType : nativeTypes.string
    },
    boolean : {
        fieldType : nativeTypes.boolean
    },
    integer : {
        fieldType : nativeTypes.number
    },
    float : {
        fieldType : nativeTypes.number
    },
    locale : {
        fieldType : nativeTypes.string,
        regex : new RegExp(/([f][r])|([e][n])/ig)
    },
    date : {
        fieldType : nativeTypes.string,
        regex : new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d/ig)
    },
    datetime : {
        fieldType : nativeTypes.string,
        format : new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+/ig)
    },
    email : {
        fieldType : nativeTypes.string,
        format : new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ig)
    },
    array : {
        fieldType : nativeTypes.array
    },
    object : {
        fieldType : nativeTypes.object
    },
    entity : {
        fieldType : nativeTypes.object
    } //then check the entity inside the field
}

export default {
    isValidFieldType(type) {
        if (type)
            return fieldTypes.hasOwnProperty(type)
        else
            return false
    },
    checkEntityFields(entityType, entity) {
        if (!entityType || !entity) return false

        const entityModel = entityModelByName[entityType]
        if (!entityModel) return false

        for (fieldName in entity) {
            if (!hasOwn.call(entity, fieldName)) continue

            checkEntityField(entityType, fieldName, entity[fieldName])
        }
    },
    checkEntityField(entityType, fieldName, fieldValue) {
        //TODO check all regex and continue here
    },
    fieldTypes : fieldTypes
}