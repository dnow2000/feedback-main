export const isAtTopFromWindow = () => window.scrollY < 50


export const scrollToError = errorId => {
  const element = document.querySelector(`input[name=${errorId}]`)
  if (!element) {
    console.warn('NO ELEMENT FOUND FOR ', errorId)
    return
  }
  const errorPosition = element.offsetTop
  setTimeout(() => window.scrollTo(0, errorPosition - 20))
}
