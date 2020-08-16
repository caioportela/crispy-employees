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
      <ul class="flex flex-col divide-y h-full scrollbar-track-gray-lighter">
        <li class="flex flex-col items-center justify-center h-full">
          <h6 class="mb-3">No employees found</h6>

          <router-link to="/user/create" class="bg-transparent hover:bg-teal-600 text-teal-600 hover:text-white rounded-full border border-teal-500 transition duration-300 py-1 px-3 focus:outline-none focus:shadow-none" title="Add contact">
            <div class="flex items-center pr-1">
              <svg viewBox="0 0 20 20" fill="currentColor" class="plus w-6 h-6">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
              </svg>

              Add contacts
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="text-center">
      <SignOut/>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import SignOut from '@/components/SignOut'

export default {
  name: 'Home',
  components: {
    SignOut
  },
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
