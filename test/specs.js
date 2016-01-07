
'use strict';
var assert = require('assert');
var copyText = require('copy-text');
var copyTextPlugin = require('../fluxible-plugin-copy-text');

describe('copy-text-fluxible-plugin', function () {
    var plugs;
    beforeEach(function () {
        plugs = copyTextPlugin.plugContext();
    });
    it('should plug each type of context with same extending function', function () {
        ['plugComponentContext', 'plugActionContext', 'plugStoreContext']
            .forEach(function(ctx) {
                assert(typeof plugs[ctx] === 'function');
            });
        assert(plugs.plugComponentContext === plugs.plugActionContext 
            && plugs.plugActionContext === plugs.plugStoreContext);
    });
    it('should be able to get globally set copy', function () {
        var context = {};
        copyText.addGlobalCopy({ copyKey: 'someCopy' });
        plugs.plugActionContext(context);
        assert(context.getCopy('copyKey') === 'someCopy');
    });
    it('should be able to extend copy for a given context', function () {
        var actionContext = {};
        var componentContext = {};
        plugs.plugActionContext(actionContext);
        plugs.plugComponentContext(componentContext);
        actionContext.extendCopy({ copyKeyTwo: 'moreCopy' });
        assert(actionContext.getCopy('copyKeyTwo') === 'moreCopy');
        assert(componentContext.getCopy('copyKeyTwo') === 'copyKeyTwo');
    });
});
