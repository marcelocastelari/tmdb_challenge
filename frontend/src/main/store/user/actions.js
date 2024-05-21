import axios from 'axios';


export default {
  async register({ commit }, { email, password }) {
    try {
        const response = await axios.post('http://localhost:8000/auth/register', {
            email,
            password
        });
        commit('setUserDetails', response.data.user);

        if (response.status === 201) {
            return true;
        } 

        return false;
    } catch (error) {
        if (error.response.status === 409) {
            throw new Error('Usuário já existe!');
        } else {
            throw new Error('Erro na tentativa de registro!');
        }
    }
  },
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