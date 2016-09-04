import Realm from 'realm';
//bill category
const CategorySchema = {
    name:'Category',
    primaryKey:'id',
    properties:{
        id:'string',
        name:'string',
        iconName:'string',
        color:'string'
    }
};

//class Bill extends Realm.object {}
const BillSchema = {
    name:'Bill',
    properties:{
        category : {type:'Category'},
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
};


export default new Realm({
    schema:[ BillSchema, BillListSchema,CategorySchema],
    schemaVersion: 1
});