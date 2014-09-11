(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global require:true, findWhere:true, module:true */

var _ = require('lodash');

function DumbCache(uniqueKeyName, initData) {
    "use strict";

    initData = initData || [];

    if (typeof uniqueKeyName !== "string") {
        throw new Error("First parameter, uniqueKeyName, must be a string.");
    }
    if (!_.isPlainObject(initData) && !_.isArray(initData)) {
        throw new Error("Second parameter, initData, must be an array or a plain object.");
    }

    this.cachedData = [];
    this.uniqueKeyName = uniqueKeyName;
    this.add(initData);
}

DumbCache.prototype.add = function (obj) {
    "use strict";

    var self = this;

    function _add(obj) {
        var newObjKey = obj[self.uniqueKeyName],
            newObjHasKey = newObjKey !== undefined,
            isUniqueObj = _.find(self.cachedData, function (item) { return item[self.uniqueKeyName] === newObjKey; }) === undefined;

        if (newObjHasKey && isUniqueObj) {
            self.cachedData.push(_.cloneDeep(obj));
        }
    }

    if (_.isPlainObject(obj)) {
        _add(obj);
    } else if (_.isArray(obj)) {
        _.each(obj, _add, this);
    }
};

DumbCache.prototype.remove = function (key) {
    "use strict";

    var self = this;

    _.remove(this.cachedData, function (item) {
        return item[self.uniqueKeyName] === key;
    });
};

DumbCache.prototype.get = function (key) {
    "use strict";

    var self = this;

    return _.find(self.cachedData, function (item) {
        return item[self.uniqueKeyName] === key;
    });
};

DumbCache.prototype.findByProperty = function (propertyName, value) {
    "use strict";

    return _.find(this.cachedData, function (item) {
        return item[propertyName] === value;
    });
};

DumbCache.prototype.clear = function () {
    "use strict";

    while (this.cachedData.length > 0) {
        this.cachedData.pop();
    }
};

DumbCache.prototype.contains = function (key) {
    "use strict";

    var self = this;

    return _.find(self.cachedData, function (item) {
        return item[self.uniqueKeyName] === key;
    }) !== undefined;
};

DumbCache.prototype.size = function () {
    "use strict";

    return this.cachedData.length;
};

module.exports = DumbCache;
},{"lodash":"Gn9pFN"}]},{},[1])