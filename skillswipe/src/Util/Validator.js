export const emailValidator = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
  if (reg.test(text) == false) {
    return false
  } else {
    return true
  }
}
