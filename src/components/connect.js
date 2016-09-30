import wrapActionCreators from '../utils/wrapActionCreators.js';
import shallowEqual from '../utils/shallowEqual.js';

const defaultMapStateToData = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToData = dispatch => ({ dispatch })

export default function connect(mapStateToData, mapDispatchToData, options={}) {
  const shouldSubscribe = Boolean(mapStateToProps);
  const mapState = mapStateToData || defaultMapStateToProps;

  let mapDispatch;

  if (typeof mapDispatchToData=== 'function') {
    mapDispatch = mapDispatchToData;
  } else if (!mapDispatchToData) {
    mapDispatch = defaultMapDispatchToData;
  } else {
    mapDispatch = wrapActionCreators(mapDispatchToData);
  }

  return function wrapWithConnect(pageConfig) {
    const app = getApp();

    function trySubscribe() {
      if(shouldSubscribe && !this.unsubscribe) {
        this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
        this.handleChange.apply(this);
      }
    }

    function tryUnsubscribe() {
      if(!!this.unsubscribe && typeof this.unsubscribe === 'function') {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }

    function handleChange() {
      if(!this.unsubscribe) {
        return ;
      }

      const state = app.store.getState();

      const mappedState = mapState(state);

      if(shallowEqual(this.data, mappedState)) {
        return ;
      }

      this.setData(mappedState);
    }

    function onLoad(options) {
      if(!app.store) {
        warning('Could not find store!' +
          'Please wrap app.js in Provider.');
      }

      trySubscribe.apply(this);

      pageConfig.onLoad();
    }

    function onUnload() {
      tryUnsubscribe.apply(this);

      pageConfig.onUnload();
    }

    return Object.assign({}, pageConfig, mapDispatch(app.store.dispatch), { onLoad, onUnload });
  }
}
