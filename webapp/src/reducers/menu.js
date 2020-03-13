export const SHOW_MENU = 'SHOW_MENU'
export const CLOSE_MENU = 'CLOSE_MENU'

const initialState = { isActive: false }


export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MENU:
      return { ...state, isActive: true }
    case CLOSE_MENU:
      return { ...state, isActive: false }
    default:
      return state
  }
}


export const closeMenu = () => ({ type: CLOSE_MENU })


export const showMenu = () => ({ type: SHOW_MENU })
