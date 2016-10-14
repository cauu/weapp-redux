const WeappRedux = require('../../libs/weapp-redux.js');

let loadTest = require('../../actions/index.js').loadTest;

const connect = WeappRedux.connect;

function mapStateToData(state) {
  return {
    test: state.test
  }
};

const pageConfig = connect(mapStateToData, { loadTest })({
  data: {
    test: 'default'
  },

  onLoad: function() {
  },

  onClick: function(e) {
    this.loadTest();
  }

});

Page(pageConfig);
