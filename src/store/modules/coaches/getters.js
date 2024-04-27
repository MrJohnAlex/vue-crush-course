export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches.length > 0 && state.coaches;
  },
  isCoach(_, getters, _2, rootGetters) {
    return getters.coaches.some((coach) => coach.id === rootGetters.userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) return false;
    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetch) / 1000 > 60;
  },
};
