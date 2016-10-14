const defaultState = {
  test: ''
}

function rootReducer(state=defaultState, action) {
  switch(action.type) {
    case 'DEFAULT':
      return {
        test: 'hello'
      }
    default: 
      return state;
  }
}

module.exports = rootReducer;
