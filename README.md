dumb-cache.js
=============

Dumb Cache is a quick and dirty implementation of a set, using a specified property as the unique key for all objects
stored in the set. Objects stored are deep cloned and comparisons on the unique key are performed using ===. Because of
these two facts, only primitives should be used as the unique key.

Dumb Cache was developed to solve a particular caching problem and is not likely to be meet everyone's needs. There are
certainly better caching libraries out there. If you need something very simple and each of your objects contains a
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

### Constructor

**DumbCache(uniqueKeyName)**

Constructs an instance of DumbCache using uniqueKeyName as the name of the property used to identify the object. The
cached is initialized as an empty array.

**DumbCache(uniqueKeyName, object)**

Constructs an instance of DumbCache using uniqueKeyName as the name of the property used to identify the object and
object as the only item in the cache.

**DumbCache(uniqueKeyName, array)**

Constructs an instance of DumbCache using uniqueKeyName as the name of the property used to identify the object and
all with all the objects in array as the items in the cache. Objects are added in the order they are stored in the
array. See the notes `add()` method for information about how objects are added and which are ignored.

### Methods

**.add(object)**

Adds an object to the cache. If another object in the cache contains the same value for the property specified by
`uniqueKeyName` then the object is not added. If the object does not contain a property `uniqueKeyName`, then the object
 is not added.
 
**.remove(key)**

Removes the object whose value for the property specified by `uniqueKeyName` matches `key` if an object is found in
the cache.

**.get(key)**

Returns the object whose value for the property specified by `uniqueKeyName` matches `key` if an object is found in
the cache.

**.clear()**

Removes all objects from the cache.

**.contains(key)**

Returns a boolean indicating whether an object with a value of `key` for the property specified by `uniqueKeyName`
exists in the cache.

**.size()**

Returns the number of objects in the cache.

TODO
----

* Change to Creative Commons license
* Update README with install notes
* Minify version
* Version number in built files
* Code coverage with Istanbul
* Bower
* Put src in a IIFI
* Make IDs 10000+ (looks like ordinals)


Maybe some day:
---------------
* Publish to npm
* Specify whether comparisons should be made using === or ==.
* Specify whether objects should be cloned.
* Config block for {overwriteOnAdd: true|false, deepClone: true|false, compareWithEqEqEq: true|false

