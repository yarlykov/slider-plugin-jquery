function rootReducer(state, action) {
  let prevState;
  switch (action.type) {
    case 'SLIDER_POSITION_CHANGE':
      prevState = state.sliderPositionState || {};
      prevState[action.data.id] = action.data.value;
      return { ...state, sliderPositionState: action.data };
    default: return state;
  }
}

export default rootReducer;
