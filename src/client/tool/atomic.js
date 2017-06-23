const PROPERTY_ADD    = 'PA'
const PROPERTY_DEL    = 'PD'
const PROPERTY_CHANGE = 'PC'
const ARRAY_ADD       = 'AA'
const ARRAY_DEL       = 'AD'
const ARRAY_MOVE      = 'AM'

const undoRedoAtomicChange = (atomicChange, undo) => {
    switch (atomicChange.type) {
        case PROPERTY_ADD    : exportFn.undoRedoPropertyAdd(atomicChange, undo)    ; return
        case PROPERTY_DEL    : exportFn.undoRedoPropertyDel(atomicChange, undo)    ; return
        case PROPERTY_CHANGE : exportFn.undoRedoPropertyChange(atomicChange, undo) ; return
        case ARRAY_ADD       : exportFn.undoRedoArrayAdd(atomicChange, undo)       ; return
        case ARRAY_DEL       : exportFn.undoRedoArrayDel(atomicChange, undo)       ; return
        case ARRAY_MOVE      : exportFn.undoRedoArrayMove(atomicChange, undo)      ; return
    }
    console.error('Atomic:undoRedoAtomicChange : atomic change = '+atomicChange.type+' unknown !')
}

const exportFn = {
    /********** UNDO/REDO **********/
    undo : (atomicChange) => {
        undoRedoAtomicChange(atomicChange, true)
    },
    redo : (atomicChange) => {
        undoRedoAtomicChange(atomicChange, false)
    },
    cancelAll : (atomicChangesHeap) => {
        if (atomicChangesHeap!=UN) {
            var i = atomicChangesHeap.length-1
            for ( ; i>-1; i--) {
                undoRedoAtomicChange(atomicChangesHeap[i], true)
            }
        }
    },
    /********** ELEMENT ADD **********/
    newPropertyAdd : (object, propertyName, propertyValue) => {
        return {
            type          : PROPERTY_ADD,
            object        : object,
            propertyName  : propertyName,
            propertyValue : propertyValue
        }
    },
    undoRedoPropertyAdd : (atomicChange, undo) => {
        if (undo)
            delete atomicChange.object[atomicChange.propertyName]
        else
            atomicChange.object[atomicChange.propertyName] = atomicChange.propertyValue
    },
    /********** ELEMENT DEL **********/
    newPropertyDel : (object, propertyName, propertyValue) => {
        return {
            type          : PROPERTY_DEL,
            object        : object,
            propertyName  : propertyName,
            propertyValue : propertyValue
        }
    },
    undoRedoPropertyDel : (atomicChange, undo) => {
        if (undo)
            atomicChange.object[atomicChange.propertyName] = atomicChange.propertyValue
        else
            delete atomicChange.object[atomicChange.propertyName]
    },
    /********** ELEMENT CHANGE **********/
    newPropertyChange : (props, propertyName, oldValue, newValue) => {
        return {
            type          : PROPERTY_CHANGE,
            props         : props,
            propertyName  : propertyName,
            propertyValue : newValue,
            oldValue      : oldValue
        }
    },
    undoRedoPropertyChange : (atomicChange, undo) => {
        if (undo)
            atomicChange.props[atomicChange.propertyName] = atomicChange.oldValue
        else
            atomicChange.props[atomicChange.propertyName] = atomicChange.propertyValue
    },
    /********** ELEMENT ADD **********/
    newArrayAdd : (array, element, addIndex)  {
        return {
            type    : ARRAY_ADD,
            array   : array,
            element : element,
            index   : addIndex
        }
    },
    undoRedoArrayAdd : (atomicChange, undo) => {
        if (undo)
            atomicChange.array.splice(atomicChange.index, 1)
        else
            atomicChange.array.splice(atomicChange.index, 0, atomicChange.element)
    },
    /********** ELEMENT DEL **********/
    newArrayDel : (array, element, delIndex) => {
        return {
            type    : ARRAY_DEL,
            array   : array,
            element : element,
            index   : delIndex
        }
    },
    undoRedoArrayDel : (atomicChange, undo) => {
        if (undo) {
            atomicChange.array.splice(atomicChange.index, 0, atomicChange.element)
        else
            atomicChange.array.splice(atomicChange.index, 1)
    },
    /********** ELEMENT MOVE **********/
    newArrayMove : (array, fmIndex, toIndex) => {
        return {
            type    : ARRAY_MOVE,
            array   : array,
            fmIndex : fmIndex,
            toIndex : toIndex
        }
    },
    undoRedoArrayMove : (atomicChange, undo) => {
        if (undo)
            atomicChange.array.move(atomicChange.toIndex, atomicChange.fmIndex)
        else
            atomicChange.array.move(atomicChange.fmIndex, atomicChange.toIndex)
    }
}

export default exportFn