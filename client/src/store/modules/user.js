import Vue from 'vue'

const SERVER = 'http://localhost:3000'

const toast = {
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000
}

const actions = {
  createUser: async ({ commit, rootGetters }, user) => {
    const res = await fetch(`${SERVER}/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${rootGetters.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    })

    if(res.ok === false) {
      throw await res.text()
    }
  },

  saveUser: async ({ commit, dispatch }, user) => {
    const validations = []

    // Validate name attribute
    if(!user.name) {
      validations.push('Name is required')
    }

    // Validate username attribute
    if(!user.username) {
      validations.push('Username is required')
    }

    // Check if there is any validations
    if(validations.length !== 0) {
      const message = validations.join('<br>')

      return Vue.swal.fire({
        icon: 'warning',
        html: message
      })
    }

    let action = 'createUser'

    if(user.id) {
      action = 'updateUser'
    }

    await dispatch(action, user)

    Vue.swal.fire({
      ...toast,
      icon: 'success',
      text: 'User added'
    })
  }
}

const getters = {
  headers: (state) => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state}`
    }
  }
}

const mutations = {
}

const state = {
  user: {}
}

export default {
  actions,
  getters,
  mutations,
  state
}
