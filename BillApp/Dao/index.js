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
        updateTime: {type:'date',optional:true},
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
var schemas = [
  {
    schema:[BillSchema,BillListSchema,CategorySchema],
    schemaVersion: 7,
    migration: function(oldRealm, newRealm) {
        let category = newRealm.objects('Category')[0];
        // 只有在 schemaVersion 提升为 1 的时候才应用此变化
        if (oldRealm.schemaVersion < 7) {
            var oldObjects = oldRealm.objects('Bill');
            var newObjects = newRealm.objects('Bill');
            // 遍历所有对象，然后设置新架构中的 updateTime
            for (var i = 0; i < oldObjects.length; i++) {
                if(!oldObjects[i].category){
                    newObjects[i].category = category;
                }
            }
        }
    }
  }
];

// 第一个架构将会被更新到现有的架构版本
// 因为第一个架构位于数组顶部
var nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
console.log(nextSchemaIndex);
while (nextSchemaIndex >=0 && nextSchemaIndex < schemas.length) {
  var migratedRealm = new Realm(schemas[nextSchemaIndex++]);
  migratedRealm.close();
}

// 使用最新的架构打开 Realm 数据库
export default new Realm(schemas[schemas.length-1]);
