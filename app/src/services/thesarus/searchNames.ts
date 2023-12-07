// BiblioKeia Services
import { solr } from "@/services/solr";

// Types BiblioKeia
// import Facet from "@/utils/types"

import { useProgress } from "@/providers/progress";

interface Facet {
  name: string;
  count: number;
}

function TransformFacet(facets: any) { 
  // console.log("F: ", facets)
    
  const listFacets = [];
  for (let i = 0; i < facets.length; i += 2) {
    const chave = facets[i];
    const valor = facets[i + 1];
    
    if (valor > 0) {
      listFacets.push({ name: chave, count: valor });
    }
  }
  return listFacets;
}

export function SearchNames(
  params: URLSearchParams,
  setRows: Function,
  setRowCount:Function,
  setFacetType: Function,
  setFacetAffiliation: Function,
  setOccupation: Function
) {

  params.getAll('fq').includes("isMemberOfMADSCollection:subjects") && params.delete("fq", "isMemberOfMADSCollection:subjects")

  if (!params.getAll('fq').includes("isMemberOfMADSCollection:names")) {
    params.append("fq", "isMemberOfMADSCollection:names");    
  }

  solr.get("authority/query?", {params: params})
    .then(function (response) { 
      // console.log("RES:", response.data)
      const docs = response.data.response.docs;
      setRowCount(response.data.response.numFound)
      const r = docs.map((doc: any, index: number) => {
        return { id: doc.id, authority: doc.authority[0], type: doc.type };
      });
      setRows(r);
      // Facet Type
      const fType = TransformFacet(
        response.data.facet_counts.facet_fields.type
      );
      setFacetType(fType); 
      // Facet fAffiliation
      // const fAffiliation = TransformFacet(
      //   response.data.facet_counts.facet_fields.affiliation_str
      // );
      // setFacetAffiliation(fAffiliation);
      // const fOccupation = TransformFacet(
      //   response.data.facet_counts.facet_fields.occupation_str
      // );
      // setOccupation(fOccupation)
    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error(error);
    })
    .finally(function () {
      // setProgress(false)
    });
}