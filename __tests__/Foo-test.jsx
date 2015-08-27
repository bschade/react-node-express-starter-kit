jest.dontMock('../app/components/Foo');
jest.dontMock('../app/components/BaseComponent');
jest.dontMock('babel/polyfill');

require('babel/polyfill');
var React =  require('react/addons');
var Foo = require('../app/components/Foo');
var TestUtils = React.addons.TestUtils;

describe('Foo', () => {

  it('renders initial Foo component', () => {
    var foo = TestUtils.renderIntoDocument(
      <Foo serverTime="bar" />
    );
    var p = TestUtils.scryRenderedDOMComponentsWithTag(foo, 'p');

    expect(p[0].getDOMNode().textContent).toContain('Server time on page load');
    expect(p[1].getDOMNode().textContent).toContain('Counter, click to increase');
  });

});

