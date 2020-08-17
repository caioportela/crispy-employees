<template>
  <div class="flex flex-col xl:w-1/4 md:2/3 h-full relative">
    <router-link v-if="sessionUser.admin" to="/" class="absolute text-gray-200 top-0 left-0 mt-2 ml-2 p-3" title="Home">
      <svg viewBox="0 0 20 20" fill="currentColor" class="home w-6 h-6">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
      </svg>
    </router-link>

    <Avatar/>

    <div class="absolute top-0 right-0 flex items-center mr-3 mt-3">
      <router-link :to="{ name: 'UserEdit', params: { user_id: user.id } }" class="text-gray-200 p-2 inline-block" title="Edit">
        <svg viewBox="0 0 20 20" fill="currentColor" class="pencil-alt w-6 h-6">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
          <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
        </svg>
      </router-link>

      <button v-on:click="remove" v-if="sessionUser.admin" type="button" class="text-gray-300 p-2 focus:outline-none focus:shadow-none" title="Remove">
        <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>

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
    ...mapActions(['getUser', 'deleteUser']),

    remove: async function() {
      const { value } = await this.$swal.fire({
        icon: 'question',
        title: 'Remove user?',
        showConfirmButton: true,
        showCancelButton: true
      })

      if(value !== undefined) {
        this.deleteUser(this.user)
        this.$router.push({ path: '/' })
      }
    }
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
