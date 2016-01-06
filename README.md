# fluxible-plugin-copy-text

A fluxible plugin that adds the additional methods: `getCopy` and `extendCopy` to the contexts: `ComponentContext`, `ActionContext`, and `StoreContext` (**note:** not on FluxibleContext).

This allows easy access to copy for react components, actions, and stores without having to painfully pass it down through props and payloads.

## Installation
```javascript
npm install fluxible-plugin-copy-text
```

## Usage
Adding the plugin to the app
```javascript
var app = new Fluxible();
app.plug(require('fluxible-plugin-copy-text'));
var context = app.createContext();
```

Fluxible has an addon called `provideContext(Component, customContextTypes)` that gives `Component` access to context outside of props so within the context of `Component`, you could do `this.context.<someContextType>`.
Well if you plan to be using this plugin within `Component` or within any of its children, you'd have to define `customContextTypes` every time like:
```javascript
var PropTypes = require('react').PropTypes;
var Component = require('./Component');
var provideContext = require('fluxible-addons-react/provideContext');
Component = provideContext(Component, {
    getCopy: PropTypes.func.isRequired,
    extendCopy: PropTypes.func.isRequired
});
```

Or alternatively, you could use a helper that comes with this plugin...
```javascript
var PropTypes = require('react').PropTypes;
var Component = require('./Component');
var provideContext = require('fluxible-plugin-copy-text/helpers/provideContextWithCopy');
Component = provideContext(Component);
```

**Note:** the helper can still take `customContextTypes` as a second parameter and will add those context types as well as the copy context types.

To add global copy or server-vars paths, you can just do so using the actual `copy-text` module...
```javascript
var app = new Fluxible();
app.plug(require('fluxible-plugin-copy-text'));
var context = app.createContext();
require('copy-text').addGlobalCopy({ copyKey: 'somecopy' });
context.getComponentContext().getCopy('copyKey'); // 'somecopy'
```

Also, don't forget to define `contextTypes` for your React components. We don't provide a helper for that (define ONLY what you're going to actually use).
```javascript
// ...
Component.contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getCopy: PropTypes.func.isRequired
};
// ...
```


## Documentation
#### `context.getCopy(copyKey)`
Retrieves copy for the given key. Synonomous with `copyText.get('someKey')`
#### `context.extendCopy(copyObj)`
Extends copy with the `copyObj`. Synonomous with `copyText.extend({ someKey: 'someCopy' })`
**Note:** extending copy for a specific context (i.e. `ComponentContext`) means all components using `ComponentContext` will have access to it. (TODO: confirm this)

## Notes
If you are not within a fluxible component (React component, action, or store) but something else (i.e. Backbone view) you should use `copyText` as normally, both have access to the same global copy.

## Testing
To test run
```
npm test
```
