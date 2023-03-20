import jwt_decode from "jwt-decode";

interface IDecodedIdToken {
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

export function decodeJWT(
  jwtToken: string | undefined
): IDecodedIdToken | undefined {
  if (jwtToken == null) {
    return undefined;
  }
  return jwt_decode(jwtToken);
}
