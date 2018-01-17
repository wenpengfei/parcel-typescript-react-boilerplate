import * as Cookies from 'js-cookie'

const userIdKey = 'userId'
const tokenKey = 'token'

const setLoginCookie = (userId, token) => {
  Cookies.set(userIdKey, userId)
  Cookies.set(tokenKey, token)
}

const removeLoginCookie = () => {
  Cookies.remove(userIdKey)
  Cookies.remove(tokenKey)
}

const getLoginCookie = () => {
  const userId = Cookies.get(userIdKey)
  const token = Cookies.get(tokenKey)
  return { userId, token }
}

export default { setLoginCookie, removeLoginCookie, getLoginCookie }
