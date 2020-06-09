import {
  CREDENTIAL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../constants";

export const validateUsername = (username: string) => {
  const usernameRegexp = new RegExp(/[^\u00C0-\u017F0-9a-zA-Z-_.+@]/g);
  if (username.length > CREDENTIAL_MAX_LENGTH) {
    return new Error(
      `username too long - maximum length is ${CREDENTIAL_MAX_LENGTH}`
    );
  }
  if (usernameRegexp.test(username)) {
    return new Error(
      `username contains invalid characters - allowed characters are a-Z, -. + . @`
    );
  }
  return undefined;
};

export const validatePassword = (password: string) => {
  const passwordRegexp = new RegExp(/[^\u00C0-\u017F0-9a-zA-Z-_+@#()]/g);
  if (password.length < PASSWORD_MIN_LENGTH) {
    return new Error(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
    );
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return new Error(
      `Password cannot be longer than ${PASSWORD_MAX_LENGTH} characters.`
    );
  }
  if (passwordRegexp.test(password)) {
    return new Error(
      `Password contains disallowed characters. Allowed characters are a-Z, ö, å, ä. +, _, @, #, (, )`
    );
  }

  return undefined;
};

export const validateCredentials = (username: string, password: string) => {
  return validateUsername(username) || validatePassword(password) || undefined;
};
