const simpleField = {
    props : [ 'id', 'initValue', 'label' ],
    data : function() { return {
        value : this.initValue
    }},
    watch : {
        value : function() {
            this.$emit('update', {
                id : this.id,
                value : this.value
            })
        }
    }
}

export default {
    SIMPLE : simpleField
}