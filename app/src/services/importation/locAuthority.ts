import axios from "axios";

import { ParserData } from "@/services/importation/parserData"

export async function LocAuthority(setHit: Function, uri: string) {
  const url = `${uri}.json`;

  try {
    const response = await axios.get(url);
    const a = await ParserData(response, uri);
    setHit(a);
  } catch (error) {
    console.error(error);
  }
}