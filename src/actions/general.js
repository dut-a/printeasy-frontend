
import C from "../constants";



export const startFetching = () => ({ type: C.ACTIONS.FETCHING });
export const finishFetching = () => ({ type: C.ACTIONS.FINISH_FETCHING });

export const startAdding = () => ({ type: C.ACTIONS.ADDING });
export const finishAdding = () => ({ type: C.ACTIONS.FINISH_ADDING });

export const startViewing = () => ({ type: C.ACTIONS.VIEWING });
export const finishViewing = () => ({ type: C.ACTIONS.FINISH_VIEWING });

export const startDeleting = () => ({ type: C.ACTIONS.DELETING });
export const finishDeleting = () => ({ type: C.ACTIONS.FINISH_DELETING });

export const startEditing = () => ({ type: C.ACTIONS.EDITING });
export const finishEditing = () => ({ type: C.ACTIONS.FINISH_EDITING });

export const addError = errorMessage => 
  ({
    type: C.ADD_ERROR,
    message: errorMessage
  })

export const clearError = errorIndex => 
  ({
    type: C.CLEAR_ERROR,
    errorId: errorIndex
  })
  
