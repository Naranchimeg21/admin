import jwt_decode from 'jwt-decode'

const getDecodedAccessToken = (token: string) => {
  return jwt_decode(token)
}

const checkAcessTokenIsExpired = (token: string): boolean => {
  let decodedToken: any = getDecodedAccessToken(token)

  if (decodedToken.exp < Date.now() / 1000) {
    return false
  }

  return true
}

export { getDecodedAccessToken, checkAcessTokenIsExpired }
