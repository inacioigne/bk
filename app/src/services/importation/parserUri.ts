import { CheckLoc } from "@/services/importation/checkLoc"
import { bkapi } from "@/services/api"

const mads = "http://www.loc.gov/mads/rdf/v1#";

export function ParserUri(authority: any, data: any, metadado: string) {
    let items = authority[`${mads}${metadado}`];

    let arr = items.map((item: any) => {
        let [meta] = data.filter(function (elemento: any) {
            return elemento["@id"] === item["@id"];
        });
        let [type] = meta["@type"];
        let [authoritativeLabel] = meta[`${mads}authoritativeLabel`];
        let uri = meta["@id"]

        let obj = {
            uri: meta["@id"],
            type: type.split("#")[1],
            label: authoritativeLabel["@value"],
            lang: authoritativeLabel["@language"],
            base: "loc",
        };
        return obj;
    });
    return arr;
}