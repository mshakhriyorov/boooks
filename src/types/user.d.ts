export interface USER_SIGN_IN {
  email: string;
  password: string;
}

export interface USER_SIGN_UP extends USER_SIGN_IN {
  name: string;
  surname: string;
}

export interface USER extends USER_SIGN_UP {
  id: number | null;
  token: string;
}
