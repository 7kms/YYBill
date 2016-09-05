import * as types from './actionTypes';
import realm from '../Dao';
let storeList,categoryList;
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
export function getCategoryList(){
    if(!categoryList){
        categoryList = realm.objects('Category');
    }
    return {
        type:types.INITICAL_CATEGORY_LIST,
        categoryList
    }
}
export function addCategory(category){
    realm.write(()=>{
        realm.create('Category',category);
    });
    return (dipatch)=>{
        dipatch(getCategoryList());
    }
}
export function updateCategory(category){
     realm.write(()=>{
        realm.create('Category',category,true);
    });
    return (dipatch)=>{
        dipatch(getCategoryList());
    }
}
export function deleteCategory(category,index){
     realm.write(()=>{
        realm.delete(categoryList[index]);
    });
    return (dipatch)=>{
        dipatch(getCategoryList());
    }
}