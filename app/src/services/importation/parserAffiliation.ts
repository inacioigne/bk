const mads = "http://www.loc.gov/mads/rdf/v1#";

export function ParserAffiliation(hasAffiliation: any, data: any) {
  let hasAffiliationFilter = hasAffiliation.filter((affiliation: any) => {
    let id = affiliation["@id"];
    let [metaAffiliation] = data.filter(function (elemento: any) {
      return elemento["@id"] === id;
    });
    if (metaAffiliation.hasOwnProperty(`${mads}organization`)) {
      return affiliation;
    }
  });
  let affiliations = hasAffiliationFilter.map((affiliation: any) => {
    let id = affiliation["@id"];
    let [metadado] = data.filter(function (elemento: any) {
      return elemento["@id"] === id;
    });

    let [org] = metadado[`${mads}organization`];
    let orgId = org["@id"];
    let [organization] = data.filter(function (elemento: any) {
      return elemento["@id"] === orgId;
    });
    let uri = organization["@id"];
    const objOrg: any = {};
    if (uri.includes("http://")) {
      const authority: any = { base: "loc" };
      let [label] = organization[`${mads}authoritativeLabel`];
      authority["value"] = uri;
      authority["label"] = label["@value"];
      objOrg["authority"] = authority;

      // affiliationStart
      if (metadado.hasOwnProperty(`${mads}affiliationStart`)) {
        let [start] = metadado[`${mads}affiliationStart`];
        objOrg["affiliationStart"] = start["@value"];
      } else {
        objOrg["affiliationStart"] = "";
      }
      // affiliationEnd
      if (metadado.hasOwnProperty(`${mads}affiliationEnd`)) {
        let [end] = metadado[`${mads}affiliationEnd`];
        objOrg["affiliationEnd"] = end["@value"];
      } else {
        objOrg["affiliationEnd"] = "";
      }
    } else {
      // let [label] = organization["http://www.w3.org/2000/01/rdf-schema#label"];
      // objOrg["label"] = label["@value"];
      objOrg["authority"] = {
        base: "",
        value: "",
        label: "",
      };
      objOrg["affiliationStart"] = "";
      objOrg["affiliationEnd"] = "";
    }

    return objOrg;
  });
  return affiliations;
}
