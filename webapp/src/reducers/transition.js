export const ASSIGN_TRANSITION = 'ASSIGN_TRANSITION'


const initialState = {
  classNames: 'fade',
  timeout: {
    enter: 300,
    exit: 0
  }
}


export default (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_TRANSITION:
      return {...state, ...action.patch}
    default:
      return state
  }
}


export const assignTransition = patch => ({
  patch,
  type: ASSIGN_TRANSITION
})
