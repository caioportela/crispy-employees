<template>
  <div class="flex items-center h-full">
    <div class="max-w-md w-full overflow-hidden text-center rounded-lg shadow-lg px-10 py-5 bg-gray-100">
      <h6 class="text-3xl text-teal-500">Sign in</h6>

      <div class="flex justify-center text-gray-500">
        <svg viewBox="0 0 20 20" fill="currentColor" class="user-circle w-32 h-32">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
        </svg>
      </div>

      <form v-on:submit.prevent="login" class="mb-8">
        <div class="relative flex items-center mb-4">
          <span class="absolute left-0 text-gray-600 pl-2">
            <svg viewBox="0 0 20 20" fill="currentColor" class="user w-6 h-6">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
          </span>

          <input v-model="username" type="text" class="w-full transition duration-300 rounded-full py-2 pl-10 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Username" autocomplete="off">
        </div>

        <div class="relative flex items-center mb-4">
          <span class="absolute left-0 text-gray-600 pl-2">
            <svg viewBox="0 0 20 20" fill="currentColor" class="key w-6 h-6">
              <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd"></path>
            </svg>
          </span>

          <input v-model="password" id="password" type="password" class="w-full transition duration-300 rounded-full py-2 pl-10 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Password" autocomplete="off">
        </div>

        <button type="submit" class="bg-teal-400 hover:bg-teal-600 transition duration-300 focus:outline-none focus:shadow-none text-lg rounded-full px-10 py-1 text-white">Login</button>
      </form>

      <div class="flex-shrink-0">
        <h6 class="text-sm">Don't have an account?</h6>

        <router-link to="/signup" class="text-teal-500 hover:text-teal-600">
          Sign up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Signin',
  methods: {
    ...mapActions(['signIn']),

    login: async function(evt) {
      // Check for signin warning
      let message = document.getElementById('signin-error')
      if(message) {
        message.remove()
      }

      try {
        await this.signIn({
          password: this.password,
          username: this.username
        })

        this.$router.push({ path: '/' })
      } catch(e) {
        // Add info about the error
        message = document.createElement('h6')
        message.id = 'signin-error'
        message.classList.add('text-red-600', 'text-center', 'mb-4', 'text-sm')
        message.innerHTML = e

        const button = evt.submitter
        button.parentNode.insertBefore(message, button)
      }
    }
  },
  data: function() {
    return {
      password: '',
      username: ''
    }
  }
}
</script>
