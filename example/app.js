const Redux = require('./libs/redux.js');
const WeappRedux = require('./libs/weapp-redux.js');

const rootReducer = require('./reducers/index.js');

const createStore = Redux.createStore;
const Provider = WeappRedux.Provider;

const store = createStore(rootReducer);

App(Provider(store)({
  onLaunch: function() {
  }
}));
