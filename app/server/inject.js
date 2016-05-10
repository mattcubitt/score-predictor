'use strict';

module.exports = function(controller, action, factory) {
    return function *() {
        var wildcardController = new (require(controller))(this);

        if(factory === undefined) {
            yield wildcardController[action]();
        } else {
            yield wildcardController[action](factory(this));
        }
    };
};