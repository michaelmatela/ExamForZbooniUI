interface AuthState {
    isLoggedIn: boolean;
    user: string | null;
  }
  
  const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
  };
  
  type AuthAction =
    | { type: 'LOGIN'; payload: string }
    | { type: 'LOGOUT' };
  
  const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;