const getOperatingSystemByUA = userAgent => {
  if (/windows phone/i.test(userAgent)) {
    // Windows Phone must come first because its UA also contains "Android"
    return 'windows_phone'
  }
  if (/android/i.test(userAgent)) {
    return 'android'
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    return 'ios'
  }
  return 'unknown'
}

const getMobileOperatingSystem = () => {
  const isDefined = typeof window !== 'undefined' && typeof navigator !== 'undefined'
  if (!isDefined) return 'unknown'
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return getOperatingSystemByUA(userAgent)
}

export const MOBILE_OS = getMobileOperatingSystem()

const keyboardWillShow = () => {
  console.log('Keyboard show')
  document.body.className += ' softkeyboard'
}

const keyboardWillHide = () => {
  console.log('Keyboard Hide')
  document.body.className = document.body.className
    .split(' ')
    .filter(c => c !== 'softkeyboard')
    .join(' ')
}

export const getMobileRootPath = () => {
  let rootPath = ''

  if (typeof window !== 'undefined' && window.cordova) {
    document.body.className += ' cordova'
    if (MOBILE_OS === 'android') {
      rootPath = 'file:///android_asset/www'
      document.body.className += ' cordova-android'
    } else if (MOBILE_OS === 'ios') {
      document.body.className += ' cordova-ios'
      rootPath = window.location.href.match(/file:\/\/(.*)\/www/)[0]
    }
    window.addEventListener('keyboardWillShow', keyboardWillShow)
    window.addEventListener('keyboardWillHide', keyboardWillHide)
  } else if (typeof window !== 'undefined') {
    document.body.className += ' web'
    rootPath = `${window.location.protocol}//${document.location.host}`
  }

  return rootPath
}
