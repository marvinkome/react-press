import * as RequestActions from './requests';
import * as AfterRequestsAdmin from './afterAdminRequests';
import * as AfterRequestPost from './afterPostRequest';
import * as AfterRequests from './afterRequests';
import * as AfterAuthRequests from './afterAuthRequests';
import * as Sockets from './sockets';

export const sendClap = RequestActions.sendClap;
export const sendComment = RequestActions.sendComment;
export const sendLoginRequest = RequestActions.sendLoginRequest;
export const sendRequest = RequestActions.sendRequest;

export const requestCreateTagsFinished = AfterRequestsAdmin.requestCreateTagsFinished;
export const requestCreatePostsFinished = AfterRequestsAdmin.requestCreatePostsFinished;
export const requestEditPostFinished = AfterRequestsAdmin.requestEditPostFinished;
export const requestDeletePostFinished = AfterRequestsAdmin.requestDeletePostFinished;
export const requestUpdateUserFinished = AfterRequestsAdmin.requestUpdateUserFinished;

export const requestCommentFinished = AfterRequestPost.requestCommentFinished;
export const requestCommentReplyFinished = AfterRequestPost.requestCommentReplyFinished;
export const requestClapFinished = AfterRequestPost.requestClapFinished;
export const requestViewPageFinished = AfterRequestPost.requestViewPageFinished;

export const recieveArticles = AfterRequests.recieveArticles;
export const recieveMoreArticles = AfterRequests.recieveMoreArticles;
export const recieveUserProfile = AfterRequests.recieveUserProfile;

export const recieveUserData = AfterAuthRequests.recieveUserData;
export const loginUser = AfterAuthRequests.loginUser;
export const logoutUser = AfterAuthRequests.logoutUser;

export const onNotification = Sockets.onNotification;
export const readAllNotifications = Sockets.readAllNotifications;
export const setupNotification = Sockets.setupNotification;
