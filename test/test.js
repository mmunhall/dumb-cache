/*global require:true, describe:true, beforeEach:true, done:true, it:true */

var DumbCache = require("../src/dumb-cache"),
    assert = require('assert'),
    should = require('should');

describe("Dumb Cache", function () {
    "use strict";

    describe('Constructor', function () {
        it("should accept a string as the only parameter", function () {
            var dc = new DumbCache("id");
            dc.should.have.ownProperty("uniqueKeyName").equal("id");
            dc.size().should.be.exactly(0);
        });

        it("should accept a string as the only parameter", function () {
            var dc = new DumbCache("id");
            dc.should.have.ownProperty("uniqueKeyName").equal("id");
            dc.size().should.be.exactly(0);
        });

        it("should throw error if a string is not passed as first parameter", function () {
            (function () {
                var dc = new DumbCache(1);
            }).should.throw("First parameter, uniqueKeyName, must be a string.");
        });

        it("should accept a single object as second parameter", function () {
            var dc = new DumbCache("id", {id: 1, name: "Mike"});
            dc.size().should.be.exactly(1);
        });

        it("should accept an array of objects as second parameter", function () {
            var dc = new DumbCache("id", [{id: 1, name: "Mike"}, {id: 2, name: "Dorrie"}]);
            dc.size().should.be.exactly(2);
        });
    });

    describe("#add()", function () {
        var dc = new DumbCache("id");

        beforeEach(function () {
            dc.clear();
            dc.add({id: 1, name: "Mike"});
        });

        describe('add()', function () {
            it("should add objects when the key values are unique", function () {
                dc.add({id: 2, name: "Dorrie"});
                dc.size().should.exactly(2);
            });

            it("should not add objects when the key values are not unique", function () {
                dc.add({id: 1, name: "Dorrie"});
                dc.size().should.exactly(1);
            });

            it("should not add objects without a unique key property", function () {
                dc.add({ID: 1, name: "Dorrie"});
                dc.add({name: "Dorrie"});
                dc.size().should.exactly(1);
            });

            it("should store a deep copy of the object provided", function () {
                var objA = {id: 2, name: "Dorrie"},
                    objB;

                dc.add(objA);
                objB = dc.get(2);
                objA.should.not.equal(objB);
            });
        });
    });

    describe("#remove()", function () {
        var dc = new DumbCache("id");

        beforeEach(function () {
            dc.clear();
            dc.add({id: 1, name: "Mike"});
        });

        it("should remove object when found", function () {
            dc.size().should.be.exactly(1);
            dc.remove(1);
            dc.size().should.be.exactly(0);
        });

        it("should not remove object when not found", function () {
            dc.size().should.be.exactly(1);
            dc.remove(999);
            dc.size().should.be.exactly(1);
        });
    });

    describe("#clear()", function () {
        it("should reset cachedData array when called", function () {
            var dc = new DumbCache("id", {id: 1, name: "Mike"});
            dc.size().should.be.exactly(1);
            dc.clear();
            dc.size().should.be.exactly(0);
        });
    });

    describe("#get()", function () {
        it("should return the object identified by key", function () {
            var dc = new DumbCache("id", {id: 1, name: "Mike"}),
                objA = dc.get(1),
                objB = dc.get(2);

            objA.id.should.be.exactly(1);
            objA.name.should.be.exactly("Mike");
            assert(objB === undefined);
        });
    });

    describe("#contains()", function () {
        it("should return true if object is found using ===", function () {
            var dc = new DumbCache("id", {id: 1, name: "Mike"});

            dc.contains(1).should.be.true;
            dc.contains(1.0).should.be.true;
            dc.contains(999).should.be.false;
            dc.contains("abc").should.be.false;
            dc.contains("1").should.be.false;
        });
    });

    describe("#size()", function () {
        it("should give size of cacheData object", function () {
            var dc = new DumbCache("id", {id: 1, name: "Mike"});

            dc.size().should.be.exactly(1);
            dc.add({id: 2, name: "Dorrie"});
            dc.size().should.be.exactly(2);
            dc.remove(1);
            dc.size().should.be.exactly(1);
            dc.clear();
            dc.size().should.be.exactly(0);
        });
    });

    describe("README Example", function () {
        it("should pass all assertions", function () {
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
        });
    });
});