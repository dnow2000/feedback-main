export const isAtTopFromWindow = () => window.scrollY < 50


export const scrollToInput = inputName => {
  const element = document.querySelector(`input[name=${inputName}]`)
  if (!element) {
    console.warn('NO ELEMENT FOUND FOR ', inputName)
    return
  }
  const errorPosition = element.offsetTop
  setTimeout(() => window.scrollTo(0, errorPosition - 20))
}
