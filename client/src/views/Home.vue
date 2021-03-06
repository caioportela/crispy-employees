<template>
  <div class="flex flex-col xl:w-1/4 md:2/3 h-full">
    <div class="flex-shrink-0 overflow-hidden text-center rounded-t-lg shadow-lg px-6 pt-5 bg-gray-100">
      <div class="flex items-center">
        <div class="flex-grow relative flex items-center">
          <span class="absolute inset-y-0 left-0 flex items-center text-gray-600 pl-2">
            <svg viewBox="0 0 20 20" fill="currentColor" class="search w-6 h-6">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
            </svg>
          </span>

          <input v-on:input="search" type="text" class="w-full transition duration-300 rounded-full py-2 pl-10 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Search..." autocomplete="off">
        </div>

        <div class="flex-srink-0">
          <router-link to="/user/create" class="inline-block align-middle text-teal-500 border-2 border-teal-500 hover:bg-teal-500 hover:text-gray-200 transition duration-300 p-1 rounded-full ml-2" title="Add employee">
            <svg viewBox="0 0 20 20" fill="currentColor" class="user-add w-6 h-6">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <div class="flex-grow overflow-auto scrollbar scrolling-touch rounded-b-lg shadow-lg px-6 pt-3 bg-gray-100" style="max-height:73vh;">
      <ul class="flex flex-col h-full">
        <li v-if="users.length === 0" class="flex flex-col items-center justify-center h-full">
          <h6 class="mb-3">No employees found</h6>

          <router-link to="/user/create" class="bg-transparent hover:bg-teal-600 text-teal-600 hover:text-white rounded-full border border-teal-500 transition duration-300 py-1 px-3 focus:outline-none focus:shadow-none" title="Add contact">
            <div class="flex items-center pr-1">
              <svg viewBox="0 0 20 20" fill="currentColor" class="plus w-6 h-6">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
              </svg>

              Add employees
            </div>
          </router-link>
        </li>

        <UserItem v-for="user in users" v-bind:user="user" v-bind:key="user.id"/>
      </ul>
    </div>

    <div class="text-center">
      <SignOut/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import SignOut from '@/components/SignOut'
import UserItem from '@/components/UserItem'

export default {
  name: 'Home',
  components: {
    SignOut,
    UserItem
  },
  computed: {
    ...mapGetters(['users'])
  },
  methods: {
    ...mapActions(['getUsers']),
    ...mapMutations(['setSession']),

    signOut: function() {
      const emptySession = {}

      this.setSession(emptySession)
      this.$router.push({ path: '/signin' })
    },

    search: function(evt) {
      const term = evt.target.value
      this.getUsers(term)
    }
  },

  beforeMount: function() {
    this.getUsers()
  }
}
</script>

<style scoped>
  .scrollbar {
    scrollbar-width: thin;
  }

  .scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /* Track */
  .scrollbar::-webkit-scrollbar-track {
    background: #F1F1F1;
    border-radius: 10px;
  }

  /* Handle */
  .scrollbar::-webkit-scrollbar-thumb {
    background: #C1C2C1;
    border-radius: 10px;
  }

  /* Handle on hover */
  .scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
