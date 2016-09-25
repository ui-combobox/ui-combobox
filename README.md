# UI Combobox [![Build Status](https://travis-ci.org/ui-combobox/ui-combobox.svg?branch=master)](https://travis-ci.org/ui-combobox/ui-combobox) [![Join the chat at https://gitter.im/ui-combobox/ui-combobox](https://badges.gitter.im/ui-combobox/ui-combobox.svg)](https://gitter.im/ui-combobox/ui-combobox?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Angular JS-native combo box

## Installation

- Node: `npm install --save ui-combobox`
- Bower: `bower install --save ui-combobox`

## Documentation

#### uiComboboxConfig
Global configuration object to easily set options as needed. All configuration settings have matching attributes, with precedence given to the attributes.

- **appendToBody*** - Appends the dropdown to the body in order to fix overflow issues. Defaults to `false`.
- **closeOnSelect*** - Close the dropdown upon selection. Defaults to `true`.
- **dropdownPosition*** - The position the dropdown will be rendered when opened. Accepted values are `'top'`, `'bottom'`, and `'auto'`. Defaults to `'auto'`.
- **forceSelection*** - Force a matching selection to be made. This is to be used when manually entry is not accepted. Defaults to `false`.
- **openOnFocus** - Open the dropdown on input focus. Defaults to `false`.

Note: `*` denotes not yet implemented.

## Development

Clone the repository, and get yourself setup:

- Install [Node.js](https://nodejs.org/) and NPM.
- `npm install -g gulp` - Installs all global dependencies (currently only `gulp`).
- `npm install` - Installs all project dependencies.
- `npm run setup` or `gulp setup` - Runs necessary one time workspace setup.

When needed, lint your code (will happen automatically on commit):

- `npm run lint` or `gulp lint`

Run tests:

- `npm test` or `gulp test`

Deploy code:

- `npm run deploy` or `gulp deploy`
