// Global auth manager for handling authentication across the app
let authContext = null;

export const setAuthContext = (context) => {
  authContext = context;
};

export const getAuthContext = () => {
  return authContext;
};

export const forceLogoutGlobal = () => {
  if (authContext && authContext.forceLogout) {
    authContext.forceLogout();
  }
};
