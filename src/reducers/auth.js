export default function auth(state=null, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      console.log("current action: ", action)
      return action.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

