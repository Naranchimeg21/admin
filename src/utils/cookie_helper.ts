import Cookie from 'js-cookie'

const setAccessToken = (accessToken: string): void => {
  Cookie.set('access-token', accessToken)
}

const getAccessToken = (): string | boolean => {
  let cookie = Cookie.get('access-token')

  if (cookie && cookie !== undefined) {
    return cookie
  }

  return false
}

const destroyAccessToken = (): void => {
  Cookie.remove('access-token')
}

export { setAccessToken, getAccessToken, destroyAccessToken }
