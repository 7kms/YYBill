import * as types from '../Actions/actionTypes';

export function billList(state={},action){
    switch(action.type){
        case types.INITICAL_BILL_LIST:
            return Object.assign({},action.billList);
        default:
            return state;
    }
}

export function categoryList(state=[],action){
    switch(action.type){
        case types.INITICAL_CATEGORY_LIST:
            return Object.assign([],action.categoryList);
        default:
            return state;
    }
}