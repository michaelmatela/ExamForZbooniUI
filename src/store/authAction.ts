export const loginAction = (token: string) => {
    return {
      type: 'LOGIN',
      payload: token,
    };
  };
  
  export const logoutAction = () => {
    return {
      type: 'LOGOUT',
    };
  };