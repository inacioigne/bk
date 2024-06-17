import Affiliation from "@/components/facets/affiliations";
import { CheckLoc } from "@/services/importation/checkLoc";
import { ParserUri } from "@/services/importation/parserUri";
import madsrdf from "@/share/mads/madsNames.json";
import { ParserAffiliation } from "./parserAffiliation";

const mads = "http://www.loc.gov/mads/rdf/v1#";

export async function ParserData(response: any, uri: string) {
  const data = response.data;

  const [a] = data.filter(function (elemento: any) {
    return elemento["@id"] === uri;
  });

  // Type
  const [type] = a["@type"].filter(function (elemento: any) {
    return elemento !== `${mads}Authority`;
  });

  // identifiersLccn
  let uriArray = uri.split("/");
  let identifiersLccn = uriArray[uriArray.length - 1];
  let collection: string = uriArray[4];
  type ObjCollection = {
    names: string;
    subjects: string;
  };
  let objCollection: ObjCollection = {
    names: "Nomes",
    subjects: "Assuntos",
  };
  let objLanguage = {
    en: "Inglês",
  };

  // authoritativeLabel
  let [authoritativeLabel] = a[`${mads}authoritativeLabel`];

  // elementList
  let [elementList] = a[`${mads}elementList`];
  let objElementList = elementList["@list"].map((e: any) => {
    let [metadado] = data.filter(function (elemento: any) {
      return elemento["@id"] === e["@id"];
    });
    const [type] = metadado["@type"];
    const [value] = metadado[`${mads}elementValue`];
    const obj = {
      elementType: {
        value: type,
        label: type.split("#")[1],
      },
      elementValue: value["@value"],
      elementLang: value["@language"]
        ? {
            value: value["@language"],
            label: objLanguage[`${value["@language"]}`],
          }
        : { value: "", label: "" },
    };
    return obj;
  });

  const authority: any = {
    type: type.split("#")[1],
    identifiersLccn: identifiersLccn,

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
    resource: [
      {
        type: {
          value: "http://www.loc.gov/mads/rdf/v1#Authority",
          label: "Authority",
        },
      },
      {
        type: {
          value: type,
          label: type.split("#")[1],
        },
      },
    ],
    isMemberOfMADSCollection: [
      {
        collection: {
          value: collection,
          label: objCollection[`${collection}`],
        },
      },
    ],
    authoritativeLabel: {
      value: authoritativeLabel["@value"],
    },
    elementList: objElementList,
  };

  // hasBroaderAuthority
  if (a.hasOwnProperty(`${mads}hasBroaderAuthority`)) {
    let uris = ParserUri(a, data, "hasBroaderAuthority", objLanguage);
    let arrCheck = await CheckLoc(uris);
    let hasBroaderAuthority = await Promise.all(arrCheck);
    authority["hasBroaderAuthority"] = hasBroaderAuthority;
  } else {
    authority["hasBroaderAuthority"] = [
      {
        authority: {
          value: "",
          type: "",
          label: "",
          base: "",
        },
      },
    ];
  }

  // Narrower Terms
  if (a.hasOwnProperty(`${mads}hasNarrowerAuthority`)) {
    let uris = ParserUri(a, data, "hasNarrowerAuthority", objLanguage);
    let arrCheck = await CheckLoc(uris);
    let hasNarrowerAuthority = await Promise.all(arrCheck);
    authority["hasNarrowerAuthority"] = hasNarrowerAuthority;
  } else {
    authority["hasNarrowerAuthority"] = [
      {
        authority: {
          value: "",
          type: "",
          label: "",
          base: "",
        },
      },
    ];
  }
  // hasReciprocalAuthority
  if (a.hasOwnProperty(`${mads}hasReciprocalAuthority`)) {
    let uris = ParserUri(a, data, "hasReciprocalAuthority", objLanguage);
    let arrCheck = await CheckLoc(uris);
    let hasReciprocalAuthority = await Promise.all(arrCheck);

    authority["hasReciprocalAuthority"] = hasReciprocalAuthority;
  } else {
    authority["hasReciprocalAuthority"] = [
      {
        authority: {
          value: "",
          type: "",
          label: "",
          base: "",
        },
      },
    ];
  }
  // fullerName
  if (a.hasOwnProperty(`${mads}fullerName`)) {
    let [name] = a[`${mads}fullerName`];
    let [metadado] = data.filter(function (elemento: any) {
      return elemento["@id"] === name["@id"];
    });
    let [value] = metadado["http://www.w3.org/2000/01/rdf-schema#label"];
    authority["fullerName"] = { value: value["@value"] };
  } else {
    authority["fullerName"] = { value: "" };
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
            elementType: {
              value: type,
              label: type.split("#")[1],
            },
            elementValue: elementValue["@value"],
          };
          if (elementValue.hasOwnProperty("@language")) {
            let elementLang = {
              value: elementValue["@language"],
              label: objLanguage[`${elementValue["@language"]}`],
            };
            element["elementLang"] = elementLang;
          } else {
            element["elementLang"] = {
              value: "",
              label: "",
            };
          }
          return element;
        });
        let [variantLabel] = obj[`${mads}variantLabel`];
        let hasVariant = {
          typeVariant: {
            value: type,
            label: type.split("#")[1],
          },
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

          let [elementValue] = objList[`${mads}elementValue`];
          let element = {
            elementType: {
              value: type,
              label: type.split("#")[1],
            },
            elementValue: elementValue["@value"],
            elementLang: {
              value: elementValue["@language"],
              label: objLanguage[`${elementValue["@language"]}`],
            },
          };
          return element;
        });
        let [type] = obj["@type"];
        let [variantLabel] = obj[`${mads}variantLabel`];

        let hasVariant = {
          typeVariant: {
            value: type,
            label: type.split("#")[1],
          },
          elementList: elementList,
          variantLabel: variantLabel["@value"],
        };
        return hasVariant;
      }
    });
    authority["hasVariant"] = hasVariant;
  } else {
    authority["hasVariant"] = [
      {
        typeVariant: {
          value: "",
          label: "",
        },
        elementList: [
          {
            elementType: {
              value: "",
              label: "",
            },
            elementValue: "",
            elementLang: {
              value: "",
              label: "",
            },
          },
        ],
      },
    ];
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
  } else {
    authority["hasCloseExternalAuthority"] = [
      {
        uri: "",
        base: "",
        label: ""
      }
    ] 
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
          let uri = {
            authority: { label: label["@value"], base: "loc", value: obj["@id"] },
          };
          return uri;
        }
      });

      let arrCheck = await CheckLoc(fieldOfActivity);
      let uris = await Promise.all(arrCheck);
      authority["fieldOfActivity"] = uris;
    } else {
      authority["fieldOfActivity"] = [
        {
          authority: {
            value: "",
            type: "",
            label: "",
            base: "",
          },
        },
      ];
    }

    authority["birth"] = {
      month: { value: "" },
    };

    // birthPlace
    if (metadado.hasOwnProperty(`${mads}birthPlace`)) {
      let [bp] = metadado[`${mads}birthPlace`];
      let [birthPlace] = data.filter(function (elemento: any) {
        return elemento["@id"] === bp["@id"];
      });
      let [label] = birthPlace["http://www.w3.org/2000/01/rdf-schema#label"];
      authority["birthPlace"] = label["@value"];
      authority.birth["place"] = label["@value"];
    }
    // birthDate
    let months = madsrdf.commonTypes.month;
    if (metadado.hasOwnProperty(`${mads}birthDate`)) {
      let [bd] = metadado[`${mads}birthDate`];
      let date = bd["@value"].split("-");
      if (date.length === 1) {
        let [year] = date;
        // authority["birthYearDate"] = year;
        // authority["birthDate"] = {
        //   month: { value: "" },
        //   year: year,
        // };
        authority.birth["year"] = year;
      } else if (date.length === 3) {
        // authority["birthYearDate"] = date[0];
        // authority["birthMonthDate"] = date[1];
        let [month] = months.filter((e) => e.value === date[1]);
        // authority["birthDayDate"] = date[2];
        // authority["birthDate"] = {
        //   day: date[2],
        //   month: month,
        //   year: date[0],
        // };
        authority.birth["day"] = date[2];
        authority.birth["month"] = month;
        authority.birth["year"] = date[0];
      }
    } else {
      authority["birth"] = {
        day: "",
        month: { value: "", label: "" },
        year: "",
      };
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
        // authority["deathYearDate"] = year;
        // authority["deathDate"] = {
        //   month: { value: "" },
        //   year: year,
        // };
        authority["death"] = {
          month: { value: "" },
          year: year,
        };
      } else if (date.length === 3) {
        // authority["deathYearDate"] = date[0];
        // authority["deathMonthDate"] = date[1];
        // authority["deathDayDate"] = date[2];
        let [deathMonth] = months.filter((e) => e.value === date[1]);

        authority["death"] = {
          day: date[2],
          month: deathMonth,
          year: date[0],
        };
      }
    } else {
      authority["death"] = {
        day: "",
        month: { value: "", label: "" },
        year: "",
      };
    }
    // hasAffiliation
    if (metadado.hasOwnProperty(`${mads}hasAffiliation`)) {
      let affiliations = ParserAffiliation(metadado[`${mads}hasAffiliation`], data)
      authority["hasAffiliation"]  = affiliations
      // console.log(affiliations);
    } else {
      authority["hasAffiliation"] = [
        {
          authority: {
            base: "",
            value: "",
            label: "",
          },
          affiliationStart: "",
          affiliationEnd: "",
        },
      ];
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
            authority: {
              label: label["@value"],
              base: "loc",
              value: obj["@id"],
            },
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
    } else {
      authority["occupation"] = [
        {
          authority: {
            value: "",
            type: "",
            label: "",
            base: "",
          },
        },
      ];
    }
  }

  return authority;
}
