import * as types from './actionTypes';
import realm from '../Dao';
let storeList;
export function getBillList(){
    if(!storeList){
        storeList =  realm.objects('BillList');
        if(storeList.length < 1){
            realm.write(()=>{
                let list = {
                    name:'默认账单',
                    items:[]
                };
                realm.create('BillList',list);
            });
        }
    }
    return {
        type: types.INITICAL_BILL_LIST,
        billList: storeList[0]
    }
}
export function addBill(bill){
    realm.write(()=>{
        storeList[0].items.push(bill);
    });
    return (dispatch)=>{
        dispatch(getBillList());
    }
}
export function updateBill(index,bill){
    realm.write(()=>{
        storeList[0].items[index] = bill;
    });
    return (dispatch)=>{
        dispatch(getBillList());
    }
}
export function deleteBill(index){
    realm.write(()=>{
        storeList[0].items.splice(parseInt(index),1);
    });
    return (dispatch)=>{
        dispatch(getBillList());
    }
}