import { bkapi } from "@/services/api";

export async function CheckLoc(arrLoc: any) {
  let arr = await arrLoc.map(async (e: any) => {
    let uri = e.authority.value;
    let aUri = uri.split("/");
    let identifiersLccn = aUri[aUri.length - 1];

    try {
      const response = await bkapi.get(
        `/thesarus/loc/exist/${identifiersLccn}`
      );
      if (response.data.exist) {
        // console.log(response.data)
        let obj = {authority :{
          value: response.data.uri,
          label: response.data.label,
          base: response.data.base,
        }};
        return obj;
      } else {
        return e;
      }
    } catch (error) {
      console.error(error);
    }
  });
  return arr;
}
