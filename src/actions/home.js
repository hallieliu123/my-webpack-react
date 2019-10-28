import store from '../app';

export const add = (value) => (dispatch,getState) => { 
    dispatch({ type: 'add', value: 1 });
}




