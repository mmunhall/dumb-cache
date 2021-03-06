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
    var objA = {id: 10000, name: "Mike"},
        objB = {id: 12000, name: "Dorrie"},
        objC = {id: 15000, name: "Anna"},
        objE, // will be defined later in the example
        objF, // will be defined later in the example
        dumbCacheInstance = new DumbCache("id", [objA, objB]); // create an instance with an existing array of objects

    assert(dumbCacheInstance.size() === 2);            // Get the size of the cache

    dumbCacheInstance.add({id: 19000, name: "Henry"}); // Add an object to the cache
    dumbCacheInstance.add(objC);                       // Add another object
    assert(dumbCacheInstance.size() === 4);

    dumbCacheInstance.add([                            // Add an array of objects to the cache
        {id: 21000, name: "Cash"},
        {id: 22000, name: "Simon"}
    ]);
    assert(dumbCacheInstance.size() === 6);

    dumbCacheInstance.remove(19000);                   // Remove an object from the cache
    assert(dumbCacheInstance.size() === 5);

    objE = dumbCacheInstance.get(15000);               // Get an object from the cache
    assert(objE.id === 15000);
    assert(objE.name === "Anna");
    assert(objE.id === objC.id);
    assert(objE !== objC);                             // Objects are deep cloned!

    objF = dumbCacheInstance.findByProperty("name", "Anna"); // Objects can be retrieved by property
    assert(objF.id === 15000);
    assert(objF.name === "Anna");

    objF = dumbCacheInstance.findByProperty("name", "ANNA", function (el) { // Objects can be retrieved by property,
        return el.toLowerCase();                                            // providing an optional transformation
    });                                                                     // function.
    assert(objF.id === 15000);
    assert(objF.name === "Anna");

    assert(dumbCacheInstance.contains(10000));         // Check whether the cache contains an object with unique key

    dumbCacheInstance.clear();                         // Reset the cache
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

If `object` is a plain object, `add()` adds the plain object to the cache. if `object` is an array, each object in the
array is added to the cache. If another object in the cache contains the same value for the property specified by
`uniqueKeyName` then the object is not added. If the object does not contain a property `uniqueKeyName`, then the object
is not added.
 
**.remove(key)**

Removes the object whose value for the property specified by `uniqueKeyName` matches `key` if an object is found in
the cache.

**.get(key)**

Returns the object whose value for the property specified by `uniqueKeyName` matches `key` if an object is found in
the cache.

**.findByProperty(propertyName, value[, transformFn])**

Returns the first object in the cache whose property named `propertyName` has a value matching `value`, optionally
filtering both operands through a transformation function, `transformFn`. Returns undefined if no objects are found.

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
* Code coverage with Istanbul
* Bower

Maybe some day:
---------------
* Publish to npm
* Specify whether comparisons should be made using === or ==.
* Specify whether objects should be cloned.
* Config block for {overwriteOnAdd: true|false, deepClone: true|false, compareWithEqEqEq: true|false

