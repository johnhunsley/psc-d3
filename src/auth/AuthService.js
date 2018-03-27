import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'
import decode from 'jwt-decode'
import router from './../router'

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()
  admin = this.isAdmin()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.isAdmin = this.isAdmin.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiUrl,
    responseType: 'token id_token',
    scope: 'openid profile'
  })

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('home')
      } else if (err) {
        router.replace('home')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true, admin: this.isAdmin() })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace('home')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getRole () {
    const namespace = AUTH_CONFIG.namespace
    const idToken = localStorage.getItem('id_token')
    if (idToken) {
      var role = decode(idToken)[`${namespace}/role`] || null
      console.log(role)
      return role
    }
  }

  getMemberId () {
    const namespace = AUTH_CONFIG.namespace
    const idToken = localStorage.getItem('id_token')
    if (idToken) {
      var memberid = decode(idToken)[`${namespace}/memberid`] || null
      console.log(memberid)
      return memberid
    }
  }

  getNickName () {
    const namespace = AUTH_CONFIG.namespace
    const idToken = localStorage.getItem('id_token')
    if (idToken) {
      var nick = decode(idToken)[`${namespace}/nickname`] || null
      console.log(nick)
      return nick
    }
  }

  isAdmin () {
    return this.getRole() === AUTH_CONFIG.adminRole
  }
}
