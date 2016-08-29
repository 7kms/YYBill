import * as types from '../Actions/actionTypes';

export function billList(state={},action){
    switch(action.type){
        case types.INITICAL_BILL_LIST:
            return Object.assign({},action.billList);
        default:
            return state;
    }
}