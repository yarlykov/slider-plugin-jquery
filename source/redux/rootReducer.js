function rootReducer(state, action) {
  switch (action.type) {
    case 'SLIDER_POSITION_CHANGE':
      return { ...state, sliderPositionState: {} };
    default: return state;
  }
}

export default rootReducer;
