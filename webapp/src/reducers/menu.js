export const SHOW_MENU = 'SHOW_MENU'
export const CLOSE_MENU = 'CLOSE_MENU'

const initialState = { isActive: false }

function menu (state = initialState, action) {
  switch (action.type) {
    case SHOW_MENU:
      return Object.assign({}, state, { isActive: true })
    case CLOSE_MENU:
      return Object.assign({}, state, { isActive: false })
    default:
      return state
  }
}

export function closeMenu () {
  return { type: CLOSE_MENU }
}

export function showMenu () {
  return { type: SHOW_MENU }
}

export default menu
