'use strict';
var PropTypes = require('react').PropTypes;
var provideContext = require('fluxible-addons-react/provideContext');
var assign = require('lodash.assign');
module.exports = function (Component, customContextTypes) {
    customContextTypes = customContextTypes || {};
    return provideContext(Component, assign(customContextTypes, {
        getCopy: PropTypes.func.isRequired,
        extendCopy: PropTypes.func.isRequired
    }));
};
