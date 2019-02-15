export const SHOW_NAVIGATION = 'SHOW_NAVIGATION'
export const CLOSE_NAVIGATION = 'CLOSE_NAVIGATION'

const initialState = { isActive: false }

function navigation (state = initialState, action) {
  switch (action.type) {
    case SHOW_NAVIGATION:
      return Object.assign({}, state, { isActive: true })
    case CLOSE_NAVIGATION:
      return Object.assign({}, state, { isActive: false })
    default:
      return state
  }
}

export function closeNavigation () {
  return { type: CLOSE_NAVIGATION }
}

export function showNavigation () {
  return { type: SHOW_NAVIGATION }
}

export default navigation
