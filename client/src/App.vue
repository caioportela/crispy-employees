<template>
  <div class="min-h-screen h-screen flex flex-col items-center text-gray-700 bg-gray-300 py-8 px-12">
    <h6 class="font-serif text-teal-600 text-4xl">
      <span v-if="showCompany">{{company.name}}</span>
      <span v-else>Crispy</span>
    </h6>

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
