const UserReducer = (User = {}, action: any) => {
  switch (action.type) {
    case 'setUser':
      return action.payload
    case 'removeUser':
      return {}
    default:
      return User
  }
}
export default UserReducer
