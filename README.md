# UI Combobox [![Build Status](https://travis-ci.org/ui-combobox/ui-combobox.svg?branch=master)](https://travis-ci.org/ui-combobox/ui-combobox) [![Join the chat at https://gitter.im/ui-combobox/ui-combobox](https://badges.gitter.im/ui-combobox/ui-combobox.svg)](https://gitter.im/ui-combobox/ui-combobox?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Bower](https://img.shields.io/bower/v/ui-combobox.svg?style=flat)](https://github.com/ui-combobox/ui-combobox) [![NPM](https://img.shields.io/npm/v/ui-combobox.svg?style=flat)](https://www.npmjs.com/package/ui-combobox)
Angular JS-native combo box

## Installation
[![NPM](https://nodei.co/npm/ui-combobox.svg?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ui-combobox/)

- Node: `npm install --save ui-combobox`
- Bower: `bower install --save ui-combobox`

## Documentation

#### uiComboboxConfig
Global configuration object to easily set options as needed. All configuration settings have matching attributes, with precedence given to the attributes.

Name | Type | Description | Default
-----|------|-------------|--------
appendToBody* | Boolean | Appends the dropdown to the body in order to fix overflow issues. | `false`
closeOnSelect | Boolean | Close the dropdown upon selection. | `true`
dropdownPosition* | String | The position the dropdown will be rendered when opened. Accepted values are `'top'`, `'bottom'`, and `'auto'` | `'auto'`
forceSelection | Boolean | Force a matching selection to be made. This is to be used when manual entry is not accepted. | `false`
openOnFocus | Boolean | Open the dropdown on input focus. | `false`

Note: `*` denotes not yet implemented.

## Development

Clone the repository, and get yourself setup:

- Install [Node.js](https://nodejs.org/) and NPM.
- `npm install -g gulp` - Installs all global dependencies (currently only `gulp`).
- `npm install` - Installs all project dependencies.
- `npm run setup` or `gulp setup` - Runs necessary one time workspace setup.

Run watch, to automatically build changes:

- `npm run watch` or `gulp watch`

Run lint, to lint your code (will happen automatically on commit):

- `npm run lint` or `gulp lint`

Run tests:

- `npm test` or `gulp test`

Deploy code:

- `npm run deploy` or `gulp deploy`

Note: Only important tasks are documented above, but there also exists a number of small/reusable tasks. If you wish to investigate, or use any of them, refer to `Gulpfile.js`.
