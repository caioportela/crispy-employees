<template>
  <div class="flex flex-col xl:w-1/4 md:2/3 h-full relative">
    <router-link v-if="sessionUser.admin" to="/" class="absolute text-gray-200 top-0 left-0 mt-2 ml-2 p-3" title="Home">
      <svg viewBox="0 0 20 20" fill="currentColor" class="arrow-left w-6 h-6">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
      </svg>
    </router-link>

    <Avatar/>

    <div class="flex flex-col h-full rounded-b-lg shadow-lg px-6 py-4 bg-gray-100">
      <div class="px-4">
        <label for="name" class="text-sm text-teal-500">Name</label>
        <h6>{{user.name}}</h6>
      </div>

      <div class="px-4 my-4">
        <label for="username" class="text-sm text-teal-500">Username</label>
        <h6>{{user.username}}</h6>
      </div>

      <div v-if="user.admin" class="px-4">
        <svg viewBox="0 0 20 20" fill="currentColor" class="check w-6 h-6 inline text-teal-500 mr-2">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>

        <span class="align-middle">Admin</span>
      </div>
    </div>

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
  name: 'UserShow',
  components: {
    Avatar,
    SignOut
  },
  computed: {
    ...mapGetters(['user', 'sessionUser'])
  },
  methods: {
    ...mapActions(['getUser'])
  },

  beforeMount: function() {
    this.getUser(this.$route.params.user_id)
  },

  beforeRouteUpdate: function(to, from, next) {
    this.getUser(to.params.user_id)
    next()
  }
}
</script>
