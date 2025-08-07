import jwt_decode from "jwt-decode";

export interface IDecodedIdToken {
  aud: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sid: string;
  sub: string;
  updated_at: string;
}

export interface IDecodedAccessToken {
  email: string;
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}

export function decodeJWT<T>(jwtToken: string | undefined): T | undefined {
  if (jwtToken == null) {
    return undefined;
  }
  return jwt_decode(jwtToken);
}
