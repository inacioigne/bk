import axios from "axios";

import { ParserResources } from "@/services/importation/parserResources"

export async function LocResources(setHit: Function, uri: string) {
  const url = `${uri}.json`;

  try {
    const response = await axios.get(url);
    const resources = await ParserResources(response, uri);
    // setHit(a);
    // console.log("TS", resources);
  } catch (error) {
    console.error(error);
  }
}