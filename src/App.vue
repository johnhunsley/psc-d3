<template>
  <div>
    <div class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">PSC Graph</a>
        </div>
        <div class="navbar-collapse collapse" id="searchbar">
          <ul class="nav navbar-nav navbar-right">
            <li v-if="!authenticated">
              <a href="#logout" data-prevent="" @click="login()">Log In</a>
            </li>
            <li id="userPage">
              <router-link :to="'/home'">Home</router-link>
            </li>
            <li v-if="authenticated"><a href="#logout" data-prevent="" @click="logout()">Logout</a></li>
          </ul>
          <ul v-if="authenticated" class="nav navbar-nav navbar-right">
              <li><a href="" data-prevent="" @click="showComplete()">Graph</a></li>
          </ul>

          <form class="navbar-form">
            <div class="form-group" style="display:inline;">
              <div class="input-group" style="display:table;">
                <span class="input-group-addon" style="width:1%;">
                    <span class="glyphicon glyphicon-search">
                    </span>
                </span>
                <input class="form-control" v-model="searchtext" name="search" placeholder="Search" autocomplete="off" autofocus="autofocus" type="text">
              </div>
            </div>
          </form>
        </div><!--/.nav-collapse -->
      </div>
    </div>

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
</style>
