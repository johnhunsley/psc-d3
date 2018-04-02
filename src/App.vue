<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
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

          <button
            class="btn btn-info btn-margin"
            v-if="authenticated"
                @click="showComplete()">
                Graph
          </button>

          <button
            class="btn btn-info btn-margin"
            v-if="authenticated"
            @click="logout()">
              Log Out
          </button>

          <span class="form-inline" v-if="authenticated">
            <input v-model="searchtext" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="searchtext">
            <button class="btn btn-info btn-margin btn-sm" @click="search()">Search</button>
          </span>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-view
        :auth="auth"
        :authenticated="authenticated"
        :admin="admin"
        :searchtext="searchtext">
      </router-view>
    </div>
  </div>
</template>

<script>
import AuthService from './auth/AuthService'
import router from './router'

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
      admin,
      searchtext: ''
    }
  },
  methods: {
    login,
    logout,
    search: function () {
      console.log('searching for ' + this.searchtext)
      router.push({name: 'Graph', params: {searchtext: this.searchtext}})
    },
    showComplete: function () {
      console.log('showing complete graph')
      router.push({name: 'Graph', params: {showcomplete: true}})
    }
  }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';

.btn-margin {
  margin-top: 7px
}
.search-box {
  width: 250px
}
</style>
