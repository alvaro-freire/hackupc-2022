import { getCookie } from 'cookies-next'

function checkAuth({ res, req }) {
  return getCookie('username', { res, req })
}

export default checkAuth