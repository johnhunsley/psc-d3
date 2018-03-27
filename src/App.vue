<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header form-horizontal">
          <a class="navbar-brand" href="#"></a>

          <router-link :to="'/'"
            class="btn btn-info btn-margin">
              Home
          </router-link>

          <button
            class="btn btn-info btn-margin"
            v-if="!authenticated"
            @click="login()">
              Log In
          </button>

          <router-link :to="'/graph'" v-if="authenticated"
            class="btn btn-info btn-margin">
            Graph
          </router-link>

          <button
            class="btn btn-info btn-margin"
            v-if="authenticated"
            @click="logout()">
              Log Out
          </button>

          <span class="form-inline" v-if="authenticated">
            <input type="text" class="form-control" id="searchtext" placeholder="Search">
            <button class="btn btn-info btn-margin btn-sm" @click="search()">Search</button>
          </span>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-view
        :auth="auth"
        :authenticated="authenticated"
        :admin="admin">
      </router-view>
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
    logout,
    search: function () {
      console.log('clicked search')
    }
  }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';

.btn-margin {
  margin-top: 7px
}
</style>
