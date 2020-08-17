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

  deleteUser: async ({ commit, rootGetters }, user) => {
    try {
      await fetch(`${SERVER}/users/${user.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${rootGetters.token}` }
      })

      Vue.swal.fire({
        ...toast,
        icon: 'success',
        text: 'User removed'
      })
    } catch(e) {
      Vue.swal.fire('Error', e.message, 'error')
    }
  },

  getUser: async ({ commit, rootGetters }, userId) => {
    const res = await fetch(`${SERVER}/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${rootGetters.token}`,
        'Content-Type': 'application/json'
      }
    })

    if(res.ok) {
      const data = await res.json()
      commit('setUser', data.user)
    } else {
      throw await res.text()
    }
  },

  getUsers: async ({ commit, rootGetters }, term = '') => {
    if(term) {
      term = `?term=${term}`
    }

    const res = await fetch(`${SERVER}/users${term}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${rootGetters.token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json()
    commit('setUsers', data.users)
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

    const action = user.id ? 'updateUser' : 'createUser'
    const text = user.id ? 'User updated' : 'User added'

    await dispatch(action, user)

    Vue.swal.fire({
      ...toast,
      text,
      icon: 'success'
    })
  },

  updateUser: async ({ commit, dispatch, rootGetters }, user) => {
    const res = await fetch(`${SERVER}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${rootGetters.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    })

    const data = await res.json()
    if(res.ok === false) { throw data }
  }
}

const getters = {
  users: (state) => state.users,
  user: (state) => state.user
}

const mutations = {
  setUser: (state, user) => {
    Vue.set(state, 'user', user)
  },

  setUsers: (state, users) => {
    Vue.set(state, 'users', users)
  }
}

const state = {
  user: {},
  users: []
}

export default {
  actions,
  getters,
  mutations,
  state
}
