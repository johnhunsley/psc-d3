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
    props: ['auth', 'authenticated', 'admin', 'searchtext'],
    components: {
      D3Network
    },
    mounted () {
      console.log('mounted and searching for ' + this.searchtext)
      this.getGraph(this.searchtext)
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
          linkWidth: 0.3,
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
        this.getGraph(val)
      }
    }
  }
</script>

<style>

</style>