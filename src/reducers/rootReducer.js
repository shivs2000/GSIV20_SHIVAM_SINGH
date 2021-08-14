const initialState={

    currentMovie:0,
    visited:[],
    listNumber:1,
    
}
const rootReducer=(state=initialState,action)=>{
    switch (action.type) {
        case 'updateListNumber': {
          return {
            // Again, one less level of nesting to copy
            ...state,
            listNumber:state.listNumber+1
          }
        }
        
        
        default:
          return{ ...state} 
}


}

export default rootReducer;