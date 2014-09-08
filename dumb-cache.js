/*global findWhere:true */

var find = require('lodash').find,
    cloneDeep = require('lodash').cloneDeep;

function DumbCache(uniqueKeyName, initData) {
    "use strict";

    this.cachedData = initData || [];
    this.uniqueKeyName = uniqueKeyName;
}

DumbCache.prototype.add = function (obj) {
    "use strict";

    var self = this;

    if (find(this.cachedData, function (item) {
            return item[self.uniqueKeyName] === obj[self.uniqueKeyName];
        })) {
        return;
    }

    this.cachedData.push(cloneDeep(obj));
};

DumbCache.prototype.get = function (key) {
    "use strict";

    return "Implement Me";
};

DumbCache.prototype.remove = function (key) {
    "use strict";

    return "Implement Me";
};

module.exports = DumbCache;