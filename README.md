# react-asset-collector
Collect assets from react components so you can do HTTP2 push

[![Build Status](https://travis-ci.org/infinum/react-asset-collector.svg?branch=master)](https://travis-ci.org/infinum/react-asset-collector)
[![Dependency Status](https://david-dm.org/infinum/react-asset-collector.svg)](https://david-dm.org/infinum/react-asset-collector)
[![devDependency Status](https://david-dm.org/infinum/react-asset-collector/dev-status.svg)](https://david-dm.org/infinum/react-asset-collector#info=devDependencies)

## Installation

    npm install react-asset-collector

## withAssets(css = [], files = [])
* Receives two arguments: array of CSS modules and array of file paths
* Returns a function which receives one argument: The component we want to decorate

### Examples

With decorators (e.g. [transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) + webpack)

    import {Component} from 'react';
    import {withAssets} from 'react-asset-collector';

    import styles from 'styles.css';
    import photo from 'photo.jpg';
    import icon from 'icon.png';

    @withAssets([styles], [photo, icon])
    export default class MyComponent extends Component {}

Without decorators

    const React = require('react');
    const {withAssets} = require('react-asset-collector');

    class MyComponent extends Component {}
    module.exports = withAssets([], ['photo.jpg', 'icon.png'])(MyComponent);

## getAssets(components = [])
* Receives list of components that will be rendered (e.g. from a react-router)
* Returns an object with ``css`` (object with all used classes) and ``files`` (list of URL-s)

### Examples

With react-router and SSR

    const {getAssets} = require('react-asset-collector');

    match({location: req.url, routes: routes}, function(error, redirect, renderProps) {
      const assets = getAssets(renderProps.components);

      // Push assets to the client
    });

## Requirements
* Should work on all versions of Node.js
* Should work in all browsers (not sure if usefull there)
* Dev requirement: Node.js 6.3+

## TODO
* Adding assets from inside of the class (e.g. in the render method)

## License
[MIT License](LICENSE)
