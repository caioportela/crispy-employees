<template>
  <li class="flex items-center pl-1 pr-2 py-2 rounded-lg hover:bg-gray-200 border transition duration-300 border-teal-300 text-left mb-3">
    <div class="flex-shrink-0 mr-2 text-gray-500">
      <svg viewBox="0 0 20 20" fill="currentColor" class="user-circle w-16 h-16">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
      </svg>
    </div>

    <div class="flex-grow">
      <h6 class="text-lg">{{user.name}}</h6>
      <h6 class="text-sm text-gray-700">{{user.username}}</h6>
    </div>

    <router-link :to="{ name: 'UserShow', params: { user_id: user.id }}" class="flex-shrink-0 text-teal-500 hover:text-gray-200 hover:bg-teal-500 transition duration-300 border-2 border-teal-500 rounded-full p-1" title="Details">
      <svg viewBox="0 0 20 20" fill="currentColor" class="eye w-6 h-6">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
      </svg>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'UserItem',
  props: ['user']
}
</script>
