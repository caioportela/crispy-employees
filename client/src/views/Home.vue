<template>
  <div class="flex flex-col w-1/4 h-full">
    <div class="flex-shrink-0 overflow-hidden text-center rounded-t-lg shadow-lg px-10 pt-5 bg-gray-100">
      <h6 class="text-2xl text-teal-500 text-center">Employees</h6>

      <div class="relative flex w-full items-center overflow-hidden mb-4">
        <span class="absolute inset-y-0 left-0 flex items-center text-gray-600 pl-2">
          <svg viewBox="0 0 20 20" fill="currentColor" class="search w-6 h-6">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
        </span>

        <input type="text" class="w-full transition duration-300 rounded-full py-2 pl-10 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Search..." autocomplete="off">
      </div>
    </div>

    <hr class="border-2">

    <div class="flex-grow overflow-hidden text-center rounded-b-lg shadow-lg px-10 py-5 bg-gray-100">

    </div>

    <div class="text-center">
      <button v-on:click="signOut" type="button" class=" text-lg text-teal-500 hover:text-teal-700 mt-4 focus:outline-none focus:shadow-none">
        <svg viewBox="0 0 20 20" fill="currentColor" class="login w-6 h-6 inline align-middle mr-2">
          <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>

        <span class="align-middle">Sign out</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Home',
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
