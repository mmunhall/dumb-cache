/*global require:true, findWhere:true */

var find = require('lodash').find,
    cloneDeep = require('lodash').cloneDeep;

function DumbCache(uniqueKeyName, initData) {
    "use strict";

    if (typeof uniqueKeyName !== "string") {
        throw new Error("First parameter, uniqueKeyName, must be a string.");
    }

    this.cachedData = initData || [];
    this.uniqueKeyName = uniqueKeyName;
}

DumbCache.prototype.add = function (obj) {
    "use strict";

    var self = this,
        newObjKey = obj[this.uniqueKeyName],
        newObjHasKey = newObjKey !== undefined,
        isUniqueObj = find(this.cachedData, function (item) { return item[self.uniqueKeyName] === newObjKey; }) === undefined;

    if (newObjHasKey && isUniqueObj) {
        this.cachedData.push(cloneDeep(obj));
    }
};

DumbCache.prototype.remove = function (key) {
    "use strict";

    return "Implement Me";
};

DumbCache.prototype.get = function (key) {
    "use strict";

    return "Implement Me";
};

DumbCache.prototype.clear = function (key) {
    "use strict";

    while (this.cachedData.length > 0) {
        this.cachedData.pop();
    }
};

DumbCache.prototype.size = function () {
    "use strict";

    return this.cachedData.length;
};

module.exports = DumbCache;