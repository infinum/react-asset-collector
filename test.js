const {expect} = require('chai');
const {describe, it} = require('mocha');

const {Component} = require('react');

const {withAssets, getAssets} = require('./index');

describe('react-asset-collector', function() {
  it('should pass assets for one component', function() {
    class TestA extends Component {}
    withAssets({foo: 1}, [2, 3])(TestA);

    expect(getAssets([TestA])).to.eql({
      css: {foo: 1},
      files: [2, 3]
    });
  });

  it('should pass assets for one component if multiple used', function() {
    class TestA extends Component {}
    withAssets({foo: 1}, [2, 3])(TestA);

    class TestB extends Component {}

    expect(getAssets([TestA, TestB])).to.eql({
      css: {foo: 1},
      files: [2, 3]
    });
  });

  it('should pass assets for multiple components', function() {
    class TestA extends Component {}
    withAssets({foo: 1}, [2, 3])(TestA);

    class TestB extends Component {}
    withAssets([{bar: 2, baz: 3}])(TestB);

    class TestC extends Component {}
    withAssets({foobar: 4, foo: 5}, [6, 7, 2])(TestC);

    const assets = getAssets([TestA, TestB, TestC]);
    expect(assets.css).to.eql({foo: 5, bar: 2, baz: 3, foobar: 4});
    expect(assets.files).to.contain.all.members([2, 3, 6, 7]);
  });
});
