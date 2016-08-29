import * as types from '../Actions/actionTypes';
let Tabs = {
    billList:{
        selected:true,
        badage:0
    },
    notify:{
        selected:false,
        badage:0
    }
};
export function tabStatus(state=Tabs,action){
    switch(action.type){
        case types.CHANGE_TAB:
            return {...state,...action.tab}
        default:
            return state;
    }
}