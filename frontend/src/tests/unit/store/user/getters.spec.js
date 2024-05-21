import getters from '../../../../main/store/user/getters';
describe('auth module getters', () => {
  const state = {
    isLogged: true,
    userDetails: { id: 1, name: 'Test User' }
  };

  it('isLoggedIn returns the isLogged state', () => {
    const result = getters.isLoggedIn(state);
    expect(result).toBe(true);
  });

  it('getUserDetails returns the userDetails state', () => {
    const result = getters.getUserDetails(state);
    expect(result).toEqual({ id: 1, name: 'Test User' });
  });
});
