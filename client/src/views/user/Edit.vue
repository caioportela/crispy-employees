<template>
  <UserForm v-bind:user="user"/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserForm from '@/components/UserForm'

export default {
  name: 'UserEdit',
  components: { UserForm },
  computed: {
    ...mapGetters(['user'])
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
