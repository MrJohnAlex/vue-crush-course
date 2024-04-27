export default {
  async addRequest({ commit }, { email, message, coachId }) {
    const newRequest = {
      coachId,
      email,
      message,
    };
    const response = await fetch(
      `https://vue-http-demo-1859f-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message);
      throw error;
    }
    newRequest.id = responseData.name;
    commit('storeRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://vue-http-demo-1859f-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json?auth=` +
        token
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message);
      throw error;
    }
    const loadedRequests = [];
    for (const key in responseData) {
      loadedRequests.push({
        id: key,
        coachId: coachId,
        email: responseData[key].email,
        message: responseData[key].message,
      });
    }
    context.commit('setRequests', loadedRequests);
  },
};
