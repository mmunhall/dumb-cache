/*global require:true, findWhere:true, module:true */

var _ = require('lodash');

function DumbCache(uniqueKeyName, initData) {
    "use strict";

    this.cachedData = [];

    if (typeof uniqueKeyName !== "string") {
        throw new Error("First parameter, uniqueKeyName, must be a string.");
    }

    this.uniqueKeyName = uniqueKeyName;

    if (_.isPlainObject(initData)) {
        this.add(initData);
    } else if (_.isArray(initData)) {
        _.each(initData, this.add, this);
    }
}

DumbCache.prototype.add = function (obj) {
    "use strict";

    var self = this,
        newObjKey = obj[this.uniqueKeyName],
        newObjHasKey = newObjKey !== undefined,
        isUniqueObj = _.find(this.cachedData, function (item) { return item[self.uniqueKeyName] === newObjKey; }) === undefined;

    if (newObjHasKey && isUniqueObj) {
        this.cachedData.push(_.cloneDeep(obj));
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

DumbCache.prototype.clear = function (key) {
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