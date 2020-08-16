const state = {
  token: localStorage.getItem('user-token') || '',
  status: ''
}

const getters = {
  isAuthenticated: (state) => Boolean(state.token)
}

export default {
  getters,
  state
}
