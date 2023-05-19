import { getRequest } from "../../request";
import { type ILocationList } from "./types";
import { locationList } from "./urls";

export async function fetchLocationList(): Promise<ILocationList[]> {
  return await getRequest({ url: locationList() });
}
