<template>
  <div class="min-h-screen h-screen flex flex-col items-center text-gray-700 bg-gray-300 py-8 px-12">
    <router-link to="/" class="font-serif text-teal-600 text-4xl" title="Home">
      <span v-if="showCompany">{{company.name}}</span>
      <span v-else>Crispy</span>
    </router-link>

    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['company']),

    showCompany: function() {
      return Boolean(this.company)
    }
  }
}
</script>
