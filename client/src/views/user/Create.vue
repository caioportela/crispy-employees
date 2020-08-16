<template>
  <UserForm v-bind:user="user"/>
</template>

<script>
import UserForm from '@/components/UserForm'

export default {
  name: 'UserCreate',
  components: { UserForm },
  data: function() {
    return {
      user: {}
    }
  }
}
</script>
