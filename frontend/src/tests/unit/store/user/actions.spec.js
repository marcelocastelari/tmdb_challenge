import actions from '../../../../main/store/user/actions'; 
import axios from 'axios';

jest.mock('axios');

describe('actions', () => {
  let commit;

  beforeEach(() => {
    commit = jest.fn();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('login commits setLogged and setUserDetails mutations on successful login', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const token = 'dummy-token';
    const user = { id: 1, name: 'Test User' };
    const response = { status: 200, data: { token, user } };

    axios.post.mockResolvedValueOnce(response);

    const result = await actions.login({ commit }, { email, password });

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/auth/login', { email, password });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
    expect(commit).toHaveBeenCalledWith('setLogged', true);
    expect(commit).toHaveBeenCalledWith('setUserDetails', user);
    expect(result).toBe(true);
  });

  it('login commits setLogged false on failed login', async () => {
    const email = 'test@example.com';
    const password = 'password';

    axios.post.mockRejectedValueOnce(new Error('Error'));

    const result = await actions.login({ commit }, { email, password });

    expect(result).toBe(false);
    expect(commit).toHaveBeenCalledWith('setLogged', false);
  });

  it('logout commits setLogged false and removes token from localStorage', () => {
    actions.logout({ commit });

    expect(commit).toHaveBeenCalledWith('setLogged', false);
    expect(commit).toHaveBeenCalledWith('setUserDetails', null);
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
