const user_model = {
    entity_name : 'User',
    fields : {
        login : {
            type : 'string',
            required : true,
            unique : true
        }, 
        firstName : {
            type : 'string',
            required : true,
            unique : true
        },
        lastName : {
            type : 'string',
            required : true,
            unique : true
        },
        email : {
            type : 'email',
            required : true,
            unique : true
        },
        locale : {
            type : 'locale',
            required : true,
            unique : true
        },
        creationDate : {
            type : 'datetime',
            required : true
        }, 
        isActive : {
            type : 'string',
            required : true,
            unique : true
        }
    }
}

export default {
    default : user_model
}