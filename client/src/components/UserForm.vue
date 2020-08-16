<template>
  <div class="flex flex-col w-1/4 h-full relative">
    <router-link to="/" class="absolute text-gray-200 top-0 left-0 mt-2 ml-2 p-3" title="Home">
      <svg viewBox="0 0 20 20" fill="currentColor" class="arrow-left w-6 h-6">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
      </svg>
    </router-link>

    <Avatar/>

    <form class="flex flex-col h-full rounded-b-lg shadow-lg px-6 py-4 bg-gray-100">
      <div class="mb-4">
        <label for="name" class="ml-4">Name</label>
        <input id="name" type="text" class="w-full transition duration-300 rounded-full py-2 px-3 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Name" autocomplete="off">
      </div>

      <div class="mb-4">
        <label for="password" class="ml-4">Password</label>
        <input id="password" type="password" class="w-full transition duration-300 rounded-full py-2 px-3 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Password" autocomplete="off">
      </div>

      <div class="mb-4">
        <label for="confirm-password" class="ml-4">Confirm password</label>
        <input id="confirm-password" type="password" class="w-full transition duration-300 rounded-full py-2 px-3 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Confirm password" autocomplete="off">
      </div>

      <div class="flex-grow flex items-end justify-center">
        <button type="button" class="text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-gray-200 transition duration-300 p-1 rounded-full mx-2 focus:outline-none focus:shadow-none" title="Cancel">
          <svg viewBox="0 0 20 20" fill="currentColor" class="x w-8 h-8">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>

        <button type="button" class="text-teal-500 border-2 border-teal-500 hover:bg-teal-500 hover:text-gray-200 transition duration-300 p-1 rounded-full mx-2 focus:outline-none focus:shadow-none" title="Done">
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
import Avatar from '@/components/Avatar'
import SignOut from '@/components/SignOut'

export default {
  name: 'UserForm',
  components: {
    Avatar,
    SignOut
  }
}
</script>
