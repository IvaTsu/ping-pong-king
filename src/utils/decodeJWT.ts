import jwt_decode from "jwt-decode";

interface IUserPayload {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

export function decodeJWT(
  jwtToken: string | undefined
): IUserPayload | undefined {
  if (jwtToken == null) {
    return undefined;
  }
  return jwt_decode(jwtToken);
}
