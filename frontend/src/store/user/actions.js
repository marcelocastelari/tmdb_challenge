import axios from 'axios';

export default {
    async login({ commit }, { email, password }) {
        try {
          const response = await axios.post('http://localhost:8000/auth/login', {
            email,
            password
          });
    
          if (response.status !== 200) {
            throw new Error('Error');
          }
          
          const token = response.data.token;
          localStorage.setItem('token', token);

    
          commit('setLogged', true);
          commit('setUserDetails', response.data.user);
          return true;
        } catch (error) {
          commit('setLogged', false);
          return false;
        }
    },
    logout({ commit }) {
        commit('setLogged', false);
        commit('setUserDetails', null);

        localStorage.removeItem('token');
    }
}