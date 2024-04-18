import { CheckLoc } from "@/services/importation/checkLoc";
import { schemaMads, schemaAffiliation } from "@/schema/authority";
import { ParserUri } from "@/services/importation/parserUri";
import madsrdf from "@/share/mads/mads.json"

const mads = "http://www.loc.gov/mads/rdf/v1#";

export async function ParserData(response: any, uri: string) {
  const data = response.data;

  const [a] = data.filter(function (elemento: any) {
    return elemento["@id"] === uri;
  });
  //

  // Type
  const [type] = a["@type"].filter(function (elemento: any) {
    return elemento !== `${mads}Authority`;
  });

  // identifiersLccn
  let uriArray = uri.split("/");
  let identifiersLccn = uriArray[uriArray.length - 1];
  let collection = uriArray[4];

  // authoritativeLabel
  let [authoritativeLabel] = a[`${mads}authoritativeLabel`];

  // elementList
  let [elementList] = a[`${mads}elementList`];
  let obj = elementList["@list"].map((e: any) => {
    let [metadado] = data.filter(function (elemento: any) {
      return elemento["@id"] === e["@id"];
    });
    const [type] = metadado["@type"];
    const [value] = metadado[`${mads}elementValue`];
    const obj = {
      type: type,
      value: value["@value"], 
      lang: value["@language"] ? value["@language"] : "" ,
    };
    return obj;
  });

  const authority: any = {
    type: type.split("#")[1],
    identifiersLccn: identifiersLccn,
    // authoritativeLabel: authoritativeLabel["@value"],
    // elementList: obj,
    adminMetadata: {
      status: {
        value: "http://id.loc.gov/vocabulary/mstatus/n",
        label: "Novo",
      },
      descriptionConventions: {
        value: "http://id.loc.gov/vocabulary/descriptionConventions/aacr",
        label: "AACr",
      },
    },
    resourceType: [
      {
        value: "Authority",
        label: "Authority",
      },
      {
        value: type.split("#")[1],
        label: type.split("#")[1],
      },
    ],
    isMemberOfMADSCollection: [
      {
        value: "",
        label: "",
      },
    ],
    authoritativeLabel: {
      label: authoritativeLabel["@value"]
    },
    elementList: [
      {
          "type": "http://www.loc.gov/mads/rdf/v1#FullNameElement",
          label: "FullNameElement",
          "value": "Borges, Jorge Luis,",
          "lang": ""
      },
      {
          "type": "http://www.loc.gov/mads/rdf/v1#DateNameElement",
          label: "DateNameElement",
          "value": "1899-1986",
          "lang": ""
      }
  ],
    

    
  };
  console.log(obj)
  // hasBroaderAuthority
  if (a.hasOwnProperty(`${mads}hasBroaderAuthority`)) {
    let uris = ParserUri(a, data, "hasBroaderAuthority");
    let arrCheck = await CheckLoc(uris);
    let hasBroaderAuthority = await Promise.all(arrCheck);
    authority["hasBroaderAuthority"] = hasBroaderAuthority;
  }
  // Narrower Terms
  if (a.hasOwnProperty(`${mads}hasNarrowerAuthority`)) {
    let uris = ParserUri(a, data, "hasNarrowerAuthority");
    let arrCheck = await CheckLoc(uris);
    let hasNarrowerAuthority = await Promise.all(arrCheck);
    authority["hasNarrowerAuthority"] = hasNarrowerAuthority;
  }
  // hasReciprocalAuthority
  if (a.hasOwnProperty(`${mads}hasReciprocalAuthority`)) {
    let uris = ParserUri(a, data, "hasReciprocalAuthority");
    let arrCheck = await CheckLoc(uris);
    let hasReciprocalAuthority = await Promise.all(arrCheck);
    authority["hasReciprocalAuthority"] = hasReciprocalAuthority;
  }
  // fullerName
  if (a.hasOwnProperty(`${mads}fullerName`)) {
    let [name] = a[`${mads}fullerName`];
    let [metadado] = data.filter(function (elemento: any) {
      return elemento["@id"] === name["@id"];
    });
    let [value] = metadado["http://www.w3.org/2000/01/rdf-schema#label"];
    authority["fullerName"] = value["@value"];
  }
  // hasVariant
  if (a.hasOwnProperty(`${mads}hasVariant`)) {
    let hv = a[`${mads}hasVariant`];
    
    let hasVariant = hv.map((e: any) => {
      let id = e["@id"];
      let [obj] = data.filter(function (e: any) {
        return e["@id"] === id;
      });
      
      let types = obj["@type"];
      let [type] = types.filter((e: string) => {
        return e !== `${mads}Variant`;
      });

      if (obj.hasOwnProperty(`${mads}elementList`)) {

        let [el] = obj[`${mads}elementList`];
        let elementList = el["@list"].map((e: any) => {
          let id = e["@id"];
          let [obj] = data.filter(function (e: any) {
            return e["@id"] === id;
          });
          let [type] = obj["@type"];
          let [elementValue] = obj[`${mads}elementValue`];
          let element = {
            // type: type.split("#")[1],
            type: type,
            // elementValue: { value: elementValue["@value"] },
            value: elementValue["@value"],
            lang: ""
          };
          return element;
        });
        let [variantLabel] = obj[`${mads}variantLabel`];
        let hasVariant = {
          typeVariant: type.split("#")[1],
          elementList: elementList,
          variantLabel: variantLabel["@value"],
        };
        return hasVariant;
      } else {
        let [list] = obj[`${mads}componentList`];
        let elementList = list["@list"].map((e: any) => {
          let id = e["@id"];
          let [obj] = data.filter(function (e: any) {
            return e["@id"] === id;
          });
          let [type] = obj["@type"];
          let [elementList] = obj[`${mads}elementList`];
          let [list] = elementList["@list"];
          let [objList] = data.filter(function (e: any) {
            return e["@id"] === list["@id"];
          });

          let [typeList] = objList["@type"];
          let [elementValue] = objList[`${mads}elementValue`];
          let element = {
            type: typeList.split("#")[1],
            elementValue: {
              value: elementValue["@value"],
              lang: elementValue["@language"],
            },
          };
          return element;
        });

        let [type] = obj["@type"];
        let [variantLabel] = obj[`${mads}variantLabel`];

        let hasVariant = {
          type: type.split("#")[1],
          elementList: elementList,
          variantLabel: variantLabel["@value"],
        };
        return hasVariant;
      }

    });
    

    authority["hasVariant"] = hasVariant;
    authority["variant"] = hasVariant
    
  }
  // hasCloseExternalAuthority
  if (a.hasOwnProperty(`${mads}hasCloseExternalAuthority`)) {
    let hca = a[`${mads}hasCloseExternalAuthority`];
    let hasCloseExternalAuthority = hca.map((e: any) => {
      let id = e["@id"];
      let [metadado] = data.filter(function (e: any) {
        return e["@id"] === id;
      });
      let [label] = metadado[`${mads}authoritativeLabel`];
      let uri = metadado["@id"];
      let base = uri.split("/")[2];
      let obj = { label: label["@value"], base: base, uri: uri };

      return obj;
    });
    authority["hasCloseExternalAuthority"] = hasCloseExternalAuthority;
  }
  // identifiesRWO
  if (a.hasOwnProperty(`${mads}identifiesRWO`)) {
    let identifiesRWO = a[`${mads}identifiesRWO`];

    let identifies = identifiesRWO.map((rwo: any) => {
      let base = rwo["@id"].split("/")[2];
      let obj = { uri: rwo["@id"], label: rwo["@id"], base: base };
      return obj;
    });
    authority["identifiesRWO"] = identifies;

    let [rwoLoc] = identifies.filter((e: any) => {
      let base = e.uri.split("/")[3];
      if (base === "rwo") {
        return e;
      }
    });
    let [metadado] = data.filter(function (e: any) {
      return e["@id"] === rwoLoc.uri;
    });

    // Field of Activity
    if (metadado.hasOwnProperty(`${mads}fieldOfActivity`)) {
      let foa = metadado[`${mads}fieldOfActivity`];
      let fields = foa.filter((e: any) => e["@id"].startsWith("http"));

      let fieldOfActivity = fields.map((e: any) => {
        let id = e["@id"];
        if (!id.includes("_:")) {
          let [obj] = data.filter(function (e: any) {
            return e["@id"] === id;
          });
          let [label] = obj[`${mads}authoritativeLabel`];
          let uri = { label: label["@value"], base: "loc", uri: obj["@id"] };
          return uri;
        }
      });
      // console.log(fieldOfActivity)

      let arrCheck = await CheckLoc(fieldOfActivity);
      let uris = await Promise.all(arrCheck);
      authority["fieldOfActivity"] = uris;
    }

    authority["birth"] = {
      month: { value: ""},
    };

    // birthPlace
    if (metadado.hasOwnProperty(`${mads}birthPlace`)) {
      let [bp] = metadado[`${mads}birthPlace`];
      let [birthPlace] = data.filter(function (elemento: any) {
        return elemento["@id"] === bp["@id"];
      });
      // console.log(birthPlace)
      let [label] = birthPlace["http://www.w3.org/2000/01/rdf-schema#label"];
      authority["birthPlace"] = label["@value"];
      authority.birth['place'] = label["@value"]
    }
    // birthDate
    let months = madsrdf.commonTypes.month
    if (metadado.hasOwnProperty(`${mads}birthDate`)) {
      let [bd] = metadado[`${mads}birthDate`];
      let date = bd["@value"].split("-");
      if (date.length === 1) {
        let [year] = date;
        authority["birthYearDate"] = year;
        authority["birthDate"] = {
          month: { value: ""},
          year: year
        };
        authority.birth['year'] = year
      } else if (date.length === 3) {
        authority["birthYearDate"] = date[0];
        authority["birthMonthDate"] = date[1];
        let [month] = months.filter((e) => e.value === date[1] )
        // console.log(month)
        authority["birthDayDate"] = date[2];
        // authority["birthDate"] = `${date[2]}-${date[1]}-${date[0]}`;
        authority["birthDate"] =  {
          day: date[2],
          month:month,
          year: date[0]
        }
        authority.birth['day'] = date[2]
        authority.birth['month'] = month
        authority.birth['year'] = date[0]
        
      }
    }
    // deathPlace
    if (metadado.hasOwnProperty(`${mads}deathPlace`)) {
      let [dp] = metadado[`${mads}deathPlace`];
    }
    // deathDate
    if (metadado.hasOwnProperty(`${mads}deathDate`)) {
      let [dd] = metadado[`${mads}deathDate`];
      let date = dd["@value"].split("-");
      if (date.length === 1) {
        let [year] = date;
        authority["deathYearDate"] = year;
        authority["deathDate"] = {
          month: { value: ""},
          year: year
        };
        authority["death"] = {
          month: { value: ""},
          year: year
        };
      } else if (date.length === 3) {
        authority["deathYearDate"] = date[0];
        authority["deathMonthDate"] = date[1];
        authority["deathDayDate"] = date[2];
        // authority["deathDate"] = `${date[2]}-${date[1]}-${date[0]}`;
        let [deathMonth] = months.filter((e) => e.value === date[1] )
        authority["deathDate"] = {
          day: date[2],
          month: { "value": date[1]},
          year: date[0]
        }
        authority["death"] = {
          day: date[2],
          month:deathMonth,
          year: date[0]
        }
      }
    }
    // hasAffiliation
    if (metadado.hasOwnProperty(`${mads}hasAffiliation`)) {
      let hasAffiliation = metadado[`${mads}hasAffiliation`];

      let affiliations = hasAffiliation.map((affiliation: any) => {
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
        const objOrg: any = { base: "loc" };

        if (uri.includes("http://")) {
          let [label] = organization[`${mads}authoritativeLabel`];
          objOrg["uri"] = uri;
          objOrg["label"] = label["@value"];
        } else {
          let [label] = organization[
            "http://www.w3.org/2000/01/rdf-schema#label"
          ];
          objOrg["label"] = label["@value"];
        }

        let objA: schemaAffiliation = {
          organization: objOrg,
        };

        // affiliationStart
        if (metadado.hasOwnProperty(`${mads}affiliationStart`)) {
          let [start] = metadado[`${mads}affiliationStart`];
          objA["affiliationStart"] = start["@value"];
        }
        // affiliationEnd
        if (metadado.hasOwnProperty(`${mads}affiliationEnd`)) {
          let [end] = metadado[`${mads}affiliationEnd`];
          objA["affiliationEnd"] = end["@value"];
        }
        return objA;
      });

      authority["hasAffiliation"] = affiliations;
    }
    // occupation
    if (metadado.hasOwnProperty(`${mads}occupation`)) {
      let occ = metadado[`${mads}occupation`];
      let occupation = occ.map((e: any) => {
        let id = e["@id"];
        let [obj] = data.filter(function (e: any) {
          return e["@id"] === id;
        });

        if (id.includes("http://")) {
          let [label] = obj[`${mads}authoritativeLabel`];
          let objOcc: any = {
            label: label["@value"],
            base: "loc",
            uri: obj["@id"],
          };
          return objOcc;
        } else {
          let [label] = obj["http://www.w3.org/2000/01/rdf-schema#label"];
          let objOcc: any = {
            label: label["@value"],
            base: "loc",
          };
          return objOcc;
        }
      });
      authority["occupation"] = occupation;
    }
  }
  
  
  return authority;
}
