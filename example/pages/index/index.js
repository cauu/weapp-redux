require('../../libs/weapp-redux.js');

let loadTest = require('../../actions/index.js').loadTest;

const connect = WeappRedux.connect;

const app = getApp();

const mapStateToData = state => {
  test: state.test
};

const pageConfig = connect(mapStateToData, { loadTest })({
  data: {
    test: 'default'
  },

  onLoad: () => {
  },

  onClick: () => {
    this.loadTest();
  }
});

Page(pageConfig);
