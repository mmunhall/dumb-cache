var DumbCache = require('./dumb-cache.js');

myData = new DumbCache("id");
myData.add({id:1, name:"Mike"});
myData.add({id:1, name:"Dorrie"});
myData.add({id:2, name:"Dorrie"});


console.log(myData)