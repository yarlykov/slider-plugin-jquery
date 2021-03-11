function rootReducer(state, action) {
  console.log('rootReducerState:', state);
  switch (action.type) {
    case 'SLIDER_POSITION_CHANGE':
      return { ...state, sliderPositionState: action.data };
    default: return state;
  }
}

export default rootReducer;
