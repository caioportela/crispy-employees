const SERVER = 'http://localhost:3000'

const state = {
  session: JSON.parse(localStorage.getItem('crispy-session') || '{}')
}

const getters = {
  company: (state) => state.session.company,
  isAuthenticated: (state) => Boolean(state.session.token),
  token: (state) => state.session.token,
  user: (state) => state.session.user
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
    localStorage.setItem('crispy-session', JSON.stringify(data || {}))
    state.session = data || {}
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}
