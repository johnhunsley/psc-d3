<template>
  <div>
      <div v-if="authenticated">
          <d3-network :net-nodes="nodes" :net-links="links" :options="options" :link-cb="lcb">
          </d3-network>
      </div>
      <svg>
        <defs>
          <marker id="m-end" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth" >
            <path d="M0,0 L0,6 L9,3 z"></path>
          </marker>
        </defs>
      </svg>
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
      getGraph: function (searchObject) {
        if (searchObject) {
          this.$http.get(API_CONF.baseUrl + '/api/relatedNodes/' + searchObject.name, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}}).then(function (response) {
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
        this.$http.get(API_CONF.baseUrl + '/api/path/' + val[0].name + '/' + val[1].name + '/2', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}}).then(function (response) {
          console.log(response)
          this.nodes = response.data.nodes
          this.links = response.data.links
        }, function (response) {
          console.log(response)
        })
      },
      lcb: function (link) {
        link._svgAttrs = {'marker-end': 'url(#m-end)'}
        return link
      }
    },
    data () {
      return {
        nodes: [],
        links: [],
        options: {
          force: 600,
          nodeSize: 7,
          nodeLabels: true,
          linkWidth: 1.0,
          size: {
            w: 1130,
            h: 830
          }
        }
      }
    },
    watch: {
      searchtext: function (val) {
        switch (val.length) {
          case 0:
            this.getCompleteGraph()
            break
          case 1:
            this.getGraph(val[0])
            break
          case 2:
            this.getShortestPath(val)
            break
        }
      }
    },
    mounted () {
      this.getCompleteGraph()
    }
  }
</script>

<style>
#m-end path {
  fill: #90c6cc;
}
</style>