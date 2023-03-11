export const emailValidator = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
  if (reg.test(text) == false) {
    return false
  } else {
    return true
  }
}

export const passwordValidator = (pass) => {
  let length = pass.length
  if (length >= 8) {
    return true
  } else {
    return false
  }
}
