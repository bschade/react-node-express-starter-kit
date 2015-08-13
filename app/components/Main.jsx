import 'babel/polyfill';
import React from 'react';
import Foo from './Foo';
import $ from 'jquery';

var component = $('#react-component');
var props = component.data('props');

React.render(
  <Foo {...props} />,
  component[0]
);

