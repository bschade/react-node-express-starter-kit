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

    expect(/Server time on page load/.test(p[0].getDOMNode().textContent)).toBeTruthy();
    expect(/Counter, click to increase/.test(p[1].getDOMNode().textContent)).toBeTruthy();
  });

});

