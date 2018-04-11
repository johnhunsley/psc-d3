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
                <multiselect  v-model="selected" :max="2" :options="nodes" track-by="id" :multiple="true" :searchable="true" :loading="isLoading" @search-change="getAllNodes" label="name">
                  <template slot="clear" slot-scope="props">
                    <div class="multiselect__clear" v-if="selected.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
                  </template><span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                </multiselect>
              </div>
            </div>
          </form>
        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="container">
      <graph :auth="auth" :authenticated="authenticated" :admin="admin" :searchtext="selected"></graph>
    </div>
  </div>
</template>

<script>
import AuthService from './auth/AuthService'
import router from './router'
import Graph from '@/components/Graph'
import Multiselect from 'vue-multiselect'
import {API_CONF} from './components/api-variables.js'

const auth = new AuthService()

const { login, logout, authenticated, admin, authNotifier } = auth

export default {
  name: 'app',
  components: {
    Multiselect,
    Graph
  },
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
      this.admin = authState.admin
    })
    return {
      auth,
      authenticated,
      admin,
      selected: [],
      nodes: [],
      isLoading: false
    }
  },
  methods: {
    login,
    logout,
    search: function () {
      console.log(this.selected.length)
      router.push({name: 'Graph', params: {searchtext: this.selected}})
    },
    showComplete: function () {
      console.log('showing complete graph')
      router.push({name: 'Graph', params: {showcomplete: true}})
    },
    getAllNodes: function () {
      this.isLoading = true
      this.$http.get(API_CONF.baseUrl + '/api/allNodes', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}}).then(function (response) {
        console.log(response)
        var data = response.data.nodes

        for (var i = 0; i < data.length; i++) {
          this.nodes[i] = data[i]
        }
        this.isLoading = false
      }, function (response) {
        console.log(response)
        this.isLoading = false
      })
    },
    clearAll () {
      this.selected = []
    }
  },
  watch: {
    selected: function (val) {
      this.search()
    }
  }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css';

.btn-margin {
  margin-top: 7px
}
</style>
