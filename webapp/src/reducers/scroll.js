export const ASSIGN_SCROLL = 'ASSIGN_SCROLL'

const initialState = { isAtTop: false }


export default (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_SCROLL:
      return { ...state, ...action.patch }
    default:
      return state
  }
}


export const assignScroll = patch => ({ patch, type: ASSIGN_SCROLL })
