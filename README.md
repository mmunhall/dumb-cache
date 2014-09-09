dumb-cache.js
=============

Dumb Cache is a quick and dirty implementation of a set, using a specified property as the unique key for all objects
stored in the set. Objects stored are deep cloned and comparisons on the unique key are performed using ===. Because of
these two facts, only primitives should be used as the unique key.

Dumb Cache was developed to solve a particular caching problem and is not likely to be meet everyone's needs. There are
certainly better caching libraries out there. If you need something very simple and your objects have all contain a
property with the same name that can be used as a unique key, Dumb Cache make work for you. Otherwise... sorry.

Examples
--------
    var objA = {id: 1, name: "Mike"},
        objB = {id: 2, name: "Dorrie"},
        objC = {id: 4, name: "Anna"},
        objE, // will be defined later in the example
        dumbCacheInstance = new DumbCache("id", [objA, objB]); // create an instance with an existing array of objects

    assert(dumbCacheInstance.size() === 2);        // Get the size of the cache

    dumbCacheInstance.add({id: 3, name: "Henry"}); // Add an object to the cache
    dumbCacheInstance.add(objC);                   // Add another object
    assert(dumbCacheInstance.size() === 4);

    dumbCacheInstance.remove(3);                   // Remove an object from the cache
    assert(dumbCacheInstance.size() === 3);

    objE = dumbCacheInstance.get(4);               // Get an object from the cache
    assert(objE.id === 4);
    assert(objE.name === "Anna");
    assert(objE.id === objC.id);
    assert(objE !== objC);                         // Objects are deep cloned!

    assert(dumbCacheInstance.contains(1));         // Check whether the cache contains an object with unique key

    dumbCacheInstance.clear();                     // Reset the cache
    assert(dumbCacheInstance.size() === 0);
    
API
---


Maybe some day:
---------------
* Specify whether comparisons should be made using === or ==.
* Specify whether objects should be cloned.

