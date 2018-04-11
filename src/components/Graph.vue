<template>
<div>
    <div v-if="authenticated">
        <d3-network :net-nodes="nodes" :net-links="links" :options="options">
        </d3-network>
    </div>
</div>
</template>
<script>
  import D3Network from 'vue-d3-network'
  import {API_CONF} from './api-variables.js'

  export default {
    name: 'graph',
    props: {
      auth: Object,
      authenticated: Boolean,
      admin: Boolean,
      searchtext: Array
    },
    components: {
      D3Network
    },
    methods: {
      getGraph: function (searchtext) {
        if (searchtext) {
          this.$http.get(API_CONF.baseUrl + '/api/relatedNodes/' + searchtext, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}}).then(function (response) {
            console.log(response)
            this.nodes = response.data.nodes
            this.links = response.data.links
          }, function (response) {
            console.log(response)
          })
        } else {
          this.getCompleteGraph()
        }
      },
      getCompleteGraph: function () {
        this.$http.get(API_CONF.baseUrl + '/api/allEdges', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}}).then(function (response) {
          console.log(response)
          this.nodes = response.data.nodes
          this.links = response.data.links
        }, function (response) {
          console.log(response)
        })
      },
      getShortestPath: function (val) {
        this.$http.get(API_CONF.baseUrl + '/api/path/' + this.searchtext[0].name + '/' + this.searchtext[1].name, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}}).then(function (response) {
          console.log(response)
          this.nodes = response.data.nodes
          this.links = response.data.links
        }, function (response) {
          console.log(response)
        })
      }
    },
    data () {
      return {
        nodes: [],
        links: [],
        options: {
          force: 3000,
          nodeSize: 10,
          nodeLabels: true,
          linkWidth: 0.5,
          size: {
            w: 1130,
            h: 830
          }
        }
      }
    },
    watch: {
      searchtext: function (val) {
        console.log('Searching for ' + val)
        this.getShortestPath(val)
      }
    },
    mounted () {
      this.getCompleteGraph()
    }
  }
</script>

<style>

</style>