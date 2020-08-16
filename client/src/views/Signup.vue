<template>
  <div class="self-center mt-10">
    <div class="max-w-md w-full overflow-hidden text-center rounded-lg shadow-lg px-10 py-5 bg-gray-100">
      <h6 class="text-3xl text-teal-500 mb-4">Sign up</h6>

      <form v-on:submit.prevent="signUp" class="mb-4">
        <div class="relative flex w-full items-center overflow-hidden mb-4">
          <span class="absolute inset-y-0 left-0 flex items-center text-gray-600 pl-2">
            <svg viewBox="0 0 20 20" fill="currentColor" class="home w-6 h-6">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
          </span>

          <input v-model="company.name" type="text" class="w-full transition duration-300 rounded-full py-2 pl-10 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Company" autocomplete="off">
        </div>

        <div class="relative flex w-full items-center overflow-hidden mb-4">
          <span class="absolute inset-y-0 left-0 flex items-center text-gray-600 pl-2">
            <svg viewBox="0 0 20 20" fill="currentColor" class="identification w-6 h-6">
              <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>
          </span>

          <input v-model="user.name" type="text" class="w-full transition duration-300 rounded-full py-2 pl-10 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Name" autocomplete="off">
        </div>

        <div class="relative flex w-full items-center overflow-hidden mb-4">
          <span class="absolute inset-y-0 left-0 flex items-center text-gray-600 pl-2">
            <svg viewBox="0 0 20 20" fill="currentColor" class="user w-6 h-6">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
          </span>

          <input v-model="user.username" type="text" class="w-full transition duration-300 rounded-full py-2 pl-10 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Username" autocomplete="off">
        </div>

        <div class="relative flex w-full items-center overflow-hidden mb-4">
          <span class="absolute inset-y-0 left-0 flex items-center text-gray-600 pl-2">
            <svg viewBox="0 0 20 20" fill="currentColor" class="key w-6 h-6">
              <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd"></path>
            </svg>
          </span>

          <input v-model="user.password" type="password" class="w-full transition duration-300 rounded-full py-2 pl-10 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Password" autocomplete="off">
        </div>

        <button type="submit" class="bg-teal-400 hover:bg-teal-600 transition duration-300 focus:outline-none focus:shadow-none text-lg rounded-full px-10 py-1 text-white">Register</button>
      </form>

      <router-link to="/signin" class="text-teal-500 hover:text-teal-600">Sign in</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  methods: {
    signUp: async function() {
      try {
        await this.$store.dispatch('signUp', {
          company: this.company,
          user: this.user
        })

        this.$router.push({ path: '/' })
      } catch (e) {

      }
    }
  },
  data: function() {
    return {
      company: {},
      user: {}
    }
  }
}
</script>
