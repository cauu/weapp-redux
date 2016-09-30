import wrapActionCreators from '../utils/wrapActionCreators.js';
import shallowEqual from '../utils/shallowEqual.js';

const defaultMapStateToData = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToData = dispatch => ({ dispatch })

export default function connect(mapStateToData, mapDispatchToData, options={}) {
  const shouldSubscribe = Boolean(mapStateToData);
  const mapState = mapStateToData || defaultMapStateToData;

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
        this.unsubscribe = app.store.subscribe(handleChange.bind(this));
        handleChange.apply(this);
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

      console.log(mappedState, typeof this.setData);
      
      this.setData(mappedState);
    }

    function onLoad(options) {
      if(!app.store) {
        warning('Could not find store!' +
          'Please wrap app.js in Provider.');
      }

      trySubscribe.apply(this);

      pageConfig.onLoad.apply(this);
    }

    function onUnload() {
      tryUnsubscribe.apply(this);

      pageConfig.onUnload.apply(this);
    }

    return Object.assign({}, pageConfig, mapDispatch(app.store.dispatch), { onLoad, onUnload });
  }
}
