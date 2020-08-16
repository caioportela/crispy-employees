<template>
  <button v-on:click="signOut" type="button" class=" text-lg text-teal-500 hover:text-teal-700 mt-4 focus:outline-none focus:shadow-none">
    <svg viewBox="0 0 20 20" fill="currentColor" class="login w-6 h-6 inline align-middle mr-2">
      <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    </svg>

    <span class="align-middle">Sign out</span>
  </button>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'SignOut',
  methods: {
    ...mapMutations(['setSession']),

    signOut: function() {
      const emptySession = {}

      this.setSession(emptySession)
      this.$router.push({ path: '/signin' })
    }
  }
}
</script>
