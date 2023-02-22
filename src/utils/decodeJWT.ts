import jwt_decode from "jwt-decode";

export function decodeJWT(jwtToken: string | undefined): string | undefined {
  if (jwtToken == null) {
    return undefined;
  }
  return jwt_decode(jwtToken);
}
