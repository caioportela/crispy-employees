<template>
  <li class="flex items-center px-1 py-2 rounded-lg hover:bg-gray-200 border border-teal-300 text-left mb-3">
    <div class="flex-shrink-0 mr-2 text-gray-500">
      <svg viewBox="0 0 20 20" fill="currentColor" class="user-circle w-16 h-16">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
      </svg>
    </div>

    <div class="flex-grow">
      <h6 class="text-lg">{{user.name}}</h6>
      <h6 class="text-sm text-gray-700">{{user.username}}</h6>
    </div>
  </li>
</template>

<script>
export default {
  name: 'UserItem',
  props: ['user']
}
</script>
