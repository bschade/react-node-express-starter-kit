import React from 'react/addons';
import BaseComponent from './BaseComponent';
import FooStore from '../stores/FooStore';
import FooActionCreators from '../actions/FooActionCreators'

class Foo extends BaseComponent {

  constructor() {
    super();
    this._bind('_handleClick','_onStoreChange');
  }

  componentDidMount() {

  }

  componentWillMount() {
    FooStore.addChangeListener(this._onStoreChange);
    this._onStoreChange();
  }

  _onStoreChange() {
    this.setState({
      counter: FooStore.getCounter()
    });
  }

  _handleClick() {
    FooActionCreators.increaseCounter();
  }

  render() {
    return (
      <div>
        <p>Server time on page load: { this.props.serverTime }</p>
        <p className='linked' onClick={ this._handleClick } onTouchStart={ this._handleClick } >Counter, click to increase: { this.state.counter }</p>
      </div>
    );
  }
}

export default Foo;

