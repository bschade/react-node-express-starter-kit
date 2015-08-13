import Dispatcher from '../dispatcher/Dispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from '../constants/FooConstants';
import 'babel/polyfill';

var CHANGE_EVENT = 'change';

var _data = {
  counter: 0
};

var _processData = (data)=> {
  _data.counter++;
};

var FooStore = Object.assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCounter: function() {
    return _data.counter;
  }

});

FooStore.dispatchToken = Dispatcher.register((action)=> {

  switch(action.type) {

    case ActionTypes.INCREASE_COUNTER:
      _processData(action.data);
      FooStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = FooStore;

