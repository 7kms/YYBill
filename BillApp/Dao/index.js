import Realm from 'realm';
//class Bill extends Realm.object {}
const BillSchema = {
    name:'Bill',
    properties:{
        category : {type:'string'},
        description: {type:'string'},
        time : {type:'date'},
        money: {type:'double'}
    }
};

//class BillList extends Realm.object {}

const BillListSchema = {
    name: 'BillList',
    properties: {
        name: 'string',
        items: {type:'list',objectType:'Bill'}
    }
}

export default new Realm({schema:[ BillSchema, BillListSchema ]});