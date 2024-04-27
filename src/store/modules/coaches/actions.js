export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://vue-http-demo-1859f-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message);
      throw error;
    }
    context.commit('registerCoach', {
      ...payload,
      id: userId,
    });
  },
  async fetchCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      'https://vue-http-demo-1859f-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json'
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message) || 'Something went wrong';
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      coaches.push({
        id: key,
        ...responseData[key],
      });
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
