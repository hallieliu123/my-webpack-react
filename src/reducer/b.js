const initialState = {
    value: 0,
};

export default function (state=initialState,action){
   switch(action.type){
        case 'add':
                return {
                    ...state,
                    value: action.value + state.value
                }
        default: return state;
   }
}
