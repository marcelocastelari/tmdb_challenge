import mutations from '../../../../main/store/user/mutations';
describe('auth module mutations', () => {
  it('setLogged sets isLogged state', () => {
    const state = { isLogged: false };
    const payload = true;
    mutations.setLogged(state, payload);
    expect(state.isLogged).toBe(true);
  });

  it('setUserDetails sets userDetails state', () => {
    const state = { userDetails: null };
    const payload = { id: 1, name: 'Test User' };
    mutations.setUserDetails(state, payload);
    expect(state.userDetails).toEqual({ id: 1, name: 'Test User' });
  });
});
