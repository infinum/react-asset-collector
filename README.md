# react-asset-collector
Collect assets from react components so you can do HTTP2 push

## withAssets(css = [], files = [])
* Receives two arguments: array of CSS modules and array of file paths
* Returns a function which receives one argument: The component we want to decorate

### Examples

With decorators (e.g. [transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) + webpack)

    import {Component} from 'react';

    import styles from 'styles.css';
    import photo from 'photo.jpg';
    import icon from 'icon.png';

    @withAssets([styles], [photo, icon])
    export default class MyComponent extends Component {}

Without decorators

    const React = require('react');

    class MyComponent extends Component {}
    module.exports = withAssets([], ['photo.jpg', 'icon.png'])(MyComponent);

## getAssets(components = [])
* Receives list of components that will be rendered (e.g. from a react-router)
* Returns an object with ``css`` (object with all used classes) and ``files`` (list of URL-s)

### Examples

With react-router and SSR

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
