<template>
<div>
    <div class="left" v-if="authenticated">
        <d3-network :net-nodes="nodes" :net-links="links" :options="options">
        </d3-network>
    </div>
</div>
</template>
<script>
  import D3Network from 'vue-d3-network'
  import {API_CONF} from './api-variables.js'

  export default {
    name: 'home',
    props: ['auth', 'authenticated', 'admin'],
    components: {
      D3Network
    },
    mounted () {
      this.getCompleteGraph()
    },
    methods: {
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
        options:
        {
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
    }
  }
</script>

<style>

</style>