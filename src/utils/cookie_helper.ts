import Cookie from 'js-cookie'

const setAccessToken = (accessToken: string): void => {
  Cookie.set('access-token', accessToken)
}

const getAccessToken = () => {
  return Cookie.get('access-token')
}

const destroyAccessToken = (): void => {
  Cookie.remove('access-token')
}

export { setAccessToken, getAccessToken, destroyAccessToken }
