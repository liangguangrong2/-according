// 定义数据名称
var DTORAGE_KEY = "todoListData";
// 数据获取
export default {
    fetch:function(){
        var todos = JSON.parse(sessionStorage.getItem(DTORAGE_KEY) || "[]");
        return todos;
    },
    save:function (newVal){  //更新数据，派发监听事件
        newVal = JSON.stringify(newVal);
    
        // 创建一个storageEvent事件
        var newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
            setItem: function(k,val){
                //更新数据
                sessionStorage.setItem(k,val);
    
                // 初始化创建事件
                newStorageEvent.initStorageEvent("setItem",false,false,k,null,val,null,null);
    
                // 派发对象
                window.dispatchEvent(newStorageEvent);
            }
        }
        return storage.setItem(DTORAGE_KEY,newVal);
    },
    saveData:function(value){  //更新数据
        sessionStorage.setItem(DTORAGE_KEY,JSON.stringify(value));
    }
};


// export default function (key,newVal){
//     newVal = JSON.stringify(newVal);

//     // 创建一个storageEvent事件
//     var newStorageEvent = document.createEvent("StorageEvent");
//     const storage = {
//         setItem: function(k,val){
//             sessionStorage.setItem(k,val);

//             // 初始化创建事件
//             newStorageEvent.initStorageEvent("setItem",false,false,k,null,val,null,null);

//             // 派发对象
//             window.dispatchEvent(newStorageEvent);
//         }
//     }
//     return storage.setItem(key,newVal);
// }



// void initStorageEvent(
//     in DOMString typeArg,  事件名
//     in boolean canBubbleArg, 布尔值，代表是否可以通过dom冒泡
//     in boolean cancelableArg, 布尔值，代表是否可以注销事件
//     in DOMString keyArg,       事件结果时被改变的值对应的属性名称
//     in DOMString oldValueArg, 旧值
//     in DOMString newValueArg, 新值
//     in DOMString urlArg,  事件初始化时页面的url
//     in nsIDOMStorage storageAreaArg    发生在哪个storage对象上
//   );