/*global require:true, describe:true, beforeEach:true, done:true, it:true */

var DumbCache = require("../dumb-cache"),
    should = require('should');

describe("Dumb Cache", function () {
    "use strict";

    describe('Constructor', function () {
        it("should throw error if a string is not passed as first parameter", function () {
            throw ("not implemented");
        });

        it("should accept a single object as second parameter", function () {
            throw ("not implemented");
        });

        it("should accept an array of objects as second parameter", function () {
            throw ("not implemented");
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
        });
    });

    describe("#remove()", function () {
        var dc = new DumbCache("id");

        beforeEach(function () {
            dc.clear();
            dc.add({id: 1, name: "Mike"});
        });

        it("should remove object when found", function () {
            throw ("not implemented");
        });

        it("should not remove object when not found", function () {
            throw ("not implemented");
        });

        it("should not do anything if unique key property is not found", function () {
            throw ("not implemented");
        });
    });

    describe("#clear()", function () {
        var dc = new DumbCache("id", {id: 1, name: "Mike"});

        it("should reset cachedData array when called", function () {
            throw ("not implemented");
        });
    });

    describe("#size()", function () {
        var dc = new DumbCache("id", {id: 1, name: "Mike"});

        it("should give size of cacheData object", function () {
            throw ("not implemented");
        });
    });
});