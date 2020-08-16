<template>
  <div class="self-center mt-10">
    <div class="max-w-md w-full overflow-hidden text-center rounded-lg shadow-lg px-10 py-5 bg-gray-100">
      <h6 class="text-3xl text-teal-500 mb-4">Sign in</h6>

      <div class="flex justify-center mb-6">
        <span class="flex items-center justify-center border-4 border-gray-500 rounded-full w-24 h-24 text-gray-500">
          <svg viewBox="0 0 20 20" fill="currentColor" class="user w-20 h-20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
          </svg>
        </span>
      </div>

      <form class="mb-4">
        <div class="relative flex w-full items-center overflow-hidden mb-4">
          <span class="absolute inset-y-0 left-0 flex items-center text-gray-600 pl-2">
            <svg viewBox="0 0 20 20" fill="currentColor" class="user w-6 h-6">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
          </span>

          <input type="text" class="w-full transition duration-300 rounded-full py-2 pl-10 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Username" autocomplete="off">
        </div>

        <div class="relative flex w-full items-center overflow-hidden mb-4">
          <span class="absolute inset-y-0 left-0 flex items-center text-gray-600 pl-2">
            <svg viewBox="0 0 20 20" fill="currentColor" class="key w-6 h-6">
              <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd"></path>
            </svg>
          </span>

          <input type="password" class="w-full transition duration-300 rounded-full py-2 pl-10 text-sm bg-gray-200 border-2 appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-teal-300 focus:text-gray-900 focus:shadow-outline-blue" placeholder="Password" autocomplete="off">
        </div>

        <button type="button" class="bg-teal-400 hover:bg-teal-600 transition duration-300 focus:outline-none focus:shadow-none text-lg rounded-full px-10 py-1 text-white">Login</button>
      </form>

      <router-link to="/signup" class="text-teal-500 hover:text-teal-600">Create an account</router-link>
    </div>
  </div>
</template>
