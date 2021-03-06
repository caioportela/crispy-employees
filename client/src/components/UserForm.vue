<template>
  <div class="flex flex-col xl:w-1/4 md:2/3 h-full relative">
    <router-link to="/" class="absolute text-gray-200 top-0 left-0 mt-2 ml-2 p-3" title="Home">
      <svg viewBox="0 0 20 20" fill="currentColor" class="home w-6 h-6">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
      </svg>
    </router-link>

    <Avatar/>

    <form v-on:submit.prevent="save" class="flex flex-col h-full rounded-b-lg shadow-lg px-6 py-4 bg-gray-100">
      <div class="mb-4">
        <label for="name" class="ml-4">Name</label>
        <input v-model="user.name" id="name" type="text" class="w-full transition duration-300 rounded-full py-2 px-3 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Name" autocomplete="off">
      </div>

      <div class="mb-4">
        <label for="username" class="ml-4">Username</label>
        <input v-model="user.username" id="username" type="text" class="w-full transition duration-300 rounded-full py-2 px-3 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Username" autocomplete="off">
      </div>

      <div v-if="showPassword" class="mb-4">
        <label for="password" class="ml-4">Password</label>
        <input v-model="user.password" id="password" type="password" class="w-full transition duration-300 rounded-full py-2 px-3 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Password" autocomplete="off">
      </div>

      <div v-if="showPassword" class="mb-4">
        <label for="confirm-password" class="ml-4">Confirm password</label>
        <input v-model="user.confirmPassword" id="confirm-password" type="password" class="w-full transition duration-300 rounded-full py-2 px-3 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Confirm password" autocomplete="off">
      </div>

      <div v-if="sessionUser.admin" class="mb-4">
        <label class="inline-flex items-center ml-4">
          <input v-model="user.admin" type="checkbox" class="form-checkbox text-teal-400 text-2xl border-teal-500 focus:shadow-sm">
          <span class="ml-2">Admin</span>
        </label>
      </div>

      <div class="flex-grow flex items-end justify-center">
        <button v-on:click="back" type="button" class="text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-gray-200 transition duration-300 p-1 rounded-full mx-2 focus:outline-none focus:shadow-none" title="Cancel">
          <svg viewBox="0 0 20 20" fill="currentColor" class="x w-8 h-8">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>

        <button type="submit" class="text-teal-500 border-2 border-teal-500 hover:bg-teal-500 hover:text-gray-200 transition duration-300 p-1 rounded-full mx-2 focus:outline-none focus:shadow-none" title="Done">
          <svg viewBox="0 0 20 20" fill="currentColor" class="check w-8 h-8">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </form>

    <div class="text-center">
      <SignOut/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Avatar from '@/components/Avatar'
import SignOut from '@/components/SignOut'

export default {
  name: 'UserForm',
  props: ['user'],
  components: {
    Avatar,
    SignOut
  },
  computed: {
    ...mapGetters(['sessionUser']),

    showPassword: function() {
      return !this.user.id || (this.sessionUser.id === this.user.id)
    }
  },
  methods: {
    ...mapActions(['saveUser']),

    back: function() {
      if(this.user.id) {
        this.$router.push({
          name: 'UserShow',
          params: { user_id: this.user.id }
        })
      } else {
        this.$router.push({ path: '/' })
      }
    },

    save: async function() {
      const { confirmPassword, ...user } = this.user

      // Check for password warning
      let message = document.getElementById('password-error')
      if(message) {
        message.remove()
      }

      // Check if password match with confirmation
      if((user.id || user.password) && (user.password === confirmPassword)) {
        try {
          await this.saveUser(user)
          this.$router.push({ path: '/' })
        } catch(e) {
          this.$swal.fire('Error', e, 'error')
        }
      } else if(!user.id) {
        // Add warning about password
        message = document.createElement('small')
        message.id = 'password-error'
        message.classList.add('text-red-600', 'ml-4')
        message.innerHTML = "Password doesn't match"

        const input = document.getElementById('confirm-password')
        input.parentNode.appendChild(message)
      }
    }
  }
}
</script>
