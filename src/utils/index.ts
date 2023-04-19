const TOKEN_KEY: string = 'a99057e6562702d02dfc7cf24aa2a362'; // is-logged-in token

export const login = () => {
  localStorage.setItem(TOKEN_KEY, "1");
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
}
