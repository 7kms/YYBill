import * as types from './actionTypes';
export function changeTab(tab){
    return {
        type: types.CHANGE_TAB,
        tab
    }
}