export default {
  allRequests(state, _, _2, rootGetters) {
    return state.requests.filter((req) => req.coachId === rootGetters.userId);
  },
  hasRequests(_, getters) {
    return getters.allRequests.length > 0 && getters.allRequests;
  },
};
