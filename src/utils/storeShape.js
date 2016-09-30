import warning from './warning.js';

export default function storeShape(store) {
  const missingMethods = ['subscribe', 'dispatch', 'getState'].filter(m => !store.hasOwnProperty(m));

  if(missingMethods.length > 0) {
    warning(`Invalid Store.` + 
      `Missing methods: ${missingMethods.join(',')}`);

    return false;
  }

  return true;
}
