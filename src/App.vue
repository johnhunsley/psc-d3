<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#"></a>

          <router-link :to="'/'"
            class="btn btn-primary btn-margin">
              Home
          </router-link>

          <button
            class="btn btn-primary btn-margin"
            v-if="!authenticated"
            @click="login()">
              Log In
          </button>

          <router-link :to="'/authenticated'" v-if="authenticated"
            class="btn btn-primary btn-margin">
            Authenitcated Area
          </router-link>

          <router-link :to="'/admin'" v-if="authenticated && admin"
          class="btn btn-primary btn-margin">
            Admin Area
          </router-link>

          <button
            class="btn btn-primary btn-margin"
            v-if="authenticated"
            @click="logout()">
              Log Out
          </button>

        </div>
      </div>
    </nav>

    <div class="container">
      <router-view
        :auth="auth"
        :authenticated="authenticated"
        :admin="admin">
      </router-view>
      <simplert></simplert>
    </div>
  </div>
</template>

<script>
import AuthService from './auth/AuthService'

const auth = new AuthService()

const { login, logout, authenticated, admin, authNotifier } = auth

export default {
  name: 'app',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
      this.admin = authState.admin
    })
    return {
      auth,
      authenticated,
      admin
    }
  },
  methods: {
    login,
    logout
  }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';

.btn-margin {
  margin-top: 7px
}
</style>
