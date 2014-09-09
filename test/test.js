/*global require:true, describe:true, beforeEach:true, done:true, it:true */

var DumbCache = require("../dumb-cache"),
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
                throw new Error("implement me");
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
        var dc = new DumbCache("id", {id: 1, name: "Mike"});

        it("should return the object identified by key", function () {
            throw new Error("implement me");
        });
    });

    describe("#contains()", function () {
        var dc = new DumbCache("id", {id: 1, name: "Mike"});

        it("should return true if object is found using ===", function () {
            dc.contains(1).should.be.true;
            dc.contains(1.0).should.be.true;
            dc.contains(999).should.be.false;
            dc.contains("abc").should.be.false;
            dc.contains("1").should.be.false;
        });
    });

    describe("#size()", function () {
        var dc = new DumbCache("id", {id: 1, name: "Mike"});

        it("should give size of cacheData object", function () {
            dc.size().should.be.exactly(1);
            dc.add({id: 2, name: "Dorrie"});
            dc.size().should.be.exactly(2);
            dc.remove(1);
            dc.size().should.be.exactly(1);
            dc.clear();
            dc.size().should.be.exactly(0);
        });
    });
});