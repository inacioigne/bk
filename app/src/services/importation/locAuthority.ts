import axios from "axios";

// import { schemaMads, schemaAffiliation } from "@/schema/authority";
import { ParserData } from "@/services/importation/parserData"

// const mads = "http://www.loc.gov/mads/rdf/v1#";


export async function LocAuthority(setHit: Function, uri: string) {
  const url = `${uri}.json`;

  try {
    const response = await axios.get(url);
    const a = await ParserData(response, uri);
    setHit(a);
    // console.log("TS", a);
  } catch (error) {
    console.error(error);
  }

}