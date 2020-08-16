<template>
  <div v-bind:class="color" class="flex items-center justify-center rounded-t-lg text-gray-200">
    <svg viewBox="0 0 20 20" fill="currentColor" class="user-circle w-48 h-48">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
    </svg>
  </div>
</template>

<script>
const color = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink']

const pickRandom = (items) => {
  const index = Math.floor(Math.random() * items.length)
  return items[index]
}

export default {
  name: 'Avatar',
  computed: {
    color: function() {
      return `bg-${pickRandom(color)}-500`
    }
  }
}
</script>
