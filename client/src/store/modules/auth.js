const SERVER = 'http://localhost:3000'

const state = {
  company: {},
  token: localStorage.getItem('user-token') || '',
  user: {}
}

const getters = {
  isAuthenticated: (state) => Boolean(state.token)
}

const actions = {
  signIn: async ({ commit }, data) => {
    const res = await fetch(`${SERVER}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if(res.ok) {
      const data = await res.json()
      commit('authorize', data)
    }
  },

  signUp: async ({ commit }, { company, user }) => {
    const res = await fetch(`${SERVER}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, user })
    })

    if(res.ok) {
      const data = await res.json()
      commit('authorize', data)
    }
  }
}

const mutations = {
  authorize: (state, data) => {
    localStorage.setItem('user-token', data.token)

    state.company = data.company
    state.token = data.token
    state.user = data.user
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}
