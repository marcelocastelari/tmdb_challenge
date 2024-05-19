export default {
    setLogged(state, payload) {
        state.isLogged = payload;
    },
    setUserDetails(state, payload) {
        state.userDetails = payload;
    }
}