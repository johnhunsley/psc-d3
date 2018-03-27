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
        nodes: [
          { id: 1, name: 'my node 1', _color: '#59b5f2' },
          { id: 2, name: 'my node 2', _color: 'orange' },
          { id: 3, _color: 'orange' },
          { id: 4, _color: 'orange' },
          { id: 5, _color: '#59b5f2' },
          { id: 6, _color: 'orange' },
          { id: 7, _color: 'orange' },
          { id: 8, _color: '#59b5f2' },
          { id: 9, _color: '#59b5f2' },
          { id: 10, _color: '#59b5f2' },
          { id: 11, _color: 'orange' },
          { id: 12, _color: '#59b5f2' },
          { id: 13, _color: '#59b5f2' },
          { id: 14, _color: '#59b5f2' }
        ],
        links: [
          { sid: 1, tid: 2, _color: '#f25e59' },
          { sid: 2, tid: 8, _color: '#f25e59' },
          { sid: 3, tid: 4, _color: '#f25e59' },
          { sid: 4, tid: 5, _color: '#90c6cc' },
          { sid: 5, tid: 6, _color: '#90c6cc' },
          { sid: 7, tid: 8, _color: '#90c6cc' },
          { sid: 6, tid: 8, _color: '#90c6cc' },
          { sid: 3, tid: 8, _color: '#f25e59' },
          { sid: 7, tid: 9, _color: '#90c6cc' },
          { sid: 5, tid: 10, _color: '#90c6cc' },
          { sid: 10, tid: 11, _color: '#90c6cc' },
          { sid: 4, tid: 11, _color: '#f25e59' },
          { sid: 10, tid: 9, _color: '#90c6cc' },
          { sid: 3, tid: 9, _color: '#90c6cc' },
          { sid: 3, tid: 6, _color: '#90c6cc' },
          { sid: 6, tid: 9, _color: '#90c6cc' },
          { sid: 2, tid: 12, _color: '#90c6cc' },
          { sid: 2, tid: 13, _color: '#90c6cc' },
          { sid: 2, tid: 14, _color: '#90c6cc' }
        ],
        options:
        {
          force: 3000,
          nodeSize: 10,
          nodeLabels: true,
          linkWidth: 1,
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