import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
const requestModule = {
  namespaced: true,
  state: {
    requests: [],
  },
  getters,
  mutations,
  actions,
};
export default requestModule;
