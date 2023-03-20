import { postRequestAuth } from "../request";
import { type ICreateAuthMutationParams, type ICreateToken } from "./types";
import { oauthToken } from "./urls";

export async function createToken({
  body,
}: ICreateAuthMutationParams): Promise<ICreateToken> {
  return await postRequestAuth<ICreateToken>({ body, url: oauthToken });
}
