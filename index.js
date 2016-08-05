var _ = require('lodash');

/**
 * Map assets to a React component (decorator)
 *
 * @param  {Object[]} [css=[]] - List of CSS selectors
 * @param  {String[]} [files=[]] - List of files
 * @return {Function} Function used to map the assets to React component
 */
function withAssets(css, files) {
  return function(componentClass) {
    componentClass.__inlineAssets__ = {
      css: [].concat(css) || [],
      files: [].concat(files) || []
    };
    return componentClass;
  };
}

/**
 * Get assets mapped to React Components
 *
 * @param  {Component[]} components - List of components to check
 * @return {LinkedAssets} Assets linked to components
 */
function getAssets(components) {
  const css = [];
  const files = [];

  for (var i = 0; i < components.length; i++) {
    var component = components[i];
    if (component.__inlineAssets__) {
      css.push.apply(css, component.__inlineAssets__.css);
      files.push.apply(files, component.__inlineAssets__.files);
    }
  }

  return {
    css: _.assign.apply(_, _.uniq(_.compact(css))),
    files: _.uniq(_.compact(files))
  };
}

module.exports = {
  withAssets: withAssets,
  getAssets: getAssets
}
