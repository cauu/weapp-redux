import warning from '../utils/warning.js';
import storeShape from '../utils/storeShape.js';

function Provider(store) {
  if(!storeShape(store)) {
    return ;
  }

  return (appConfig) => Object.assign({}, appConfig, { store });
}

export default Provider;
