import {
  authenticatedRequest,
  unAuthenticatedRequest
} from "../utils/requestUtils";

export const base = "http://localhost:3000/";

const url = require("url");

const r = route => url.resolve(base, route);

export const serverRequests = {
  getCurrentUserApi: async () =>
    authenticatedRequest(r("/users/logged_in_user_info"), {}),

  getUserFriendsApi: async () =>
    authenticatedRequest(r("/users/getcontacts"), {}),

  createUserApi: async (token, userName, firstName, lastName, email) => {
    const postBodyParams = {
      authToken: token,
      email: email,
      firstName: firstName,
      userName: userName,
      lastName: lastName
    };
    return unAuthenticatedRequest(r("/users/create"), postBodyParams);
  },

  getUsersLoopsApi: async () => authenticatedRequest(r("/loops"), {}),

  getUserPosts: async () =>
    authenticatedRequest(r("/posts/get_recent_posts"), {}),

  //TODO: fix input
  updateLoopApi: async (loopId, params) =>
    authenticatedRequest(r(`/loops/${loopId}/update_loop`), params),

  addFriendToUserApi: async params =>
    authenticatedRequest(r("/users/add_friend"), params),

  createLoopApi: async loopName => {
    const postBodyParams = {
      loopName: loopName
    };
    return authenticatedRequest(r("/users/create_loop"), postBodyParams);
  },

  getChatHistoryApi: async _friendId => {
    const postBodyParams = {
      friendID: _friendId
    };
    return authenticatedRequest(r("/users/get_chat_history"), postBodyParams);
  },

  createMessageApi:  async (receivingUserId, messageType, messageContent) => {
    return authenticatedRequest(r("/users/create_message"), {
      receivingUserId,
      messageType,
      messageContent
    });
  }
};
