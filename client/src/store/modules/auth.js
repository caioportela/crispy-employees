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
  signUp: async ({ commit }, { company, user }) => {
    const res = await fetch(`${SERVER}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, user })
    })

    if(res.ok) {
      const data = await res.json()

      commit('setToken', data)
    }
  }
}

const mutations = {
  setToken: (state, data) => {
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
