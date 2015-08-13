import Dispatcher from '../dispatcher/Dispatcher';
import {ActionTypes} from '../constants/FooConstants';

module.exports = {

  increaseCounter: () => {
    Dispatcher.dispatch({type: ActionTypes.INCREASE_COUNTER, data: null});
  }

};
