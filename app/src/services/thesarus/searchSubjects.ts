// BiblioKeia Services
import { solr } from "@/services/solr";

// import { useProgress } from "@/providers/progress";

// interface Facet {
//   name: string;
//   count: number;
// }

function TransformFacet(facets: any) { 
    
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

export function SearchSubjects(
  params: URLSearchParams,
  setRows: Function,
  setRowCount:Function,
  setFacetType: Function
) {
  if (params.getAll('fq').includes("isMemberOfMADSCollection:names")) {
    params.delete("fq", "isMemberOfMADSCollection:names")
  }

  if (!params.getAll('fq').includes("isMemberOfMADSCollection:subjects")) {
    params.append("fq", "isMemberOfMADSCollection:subjects"); 
    // console.log("prb:", params.getAll('fq'))

  }
  

  solr.get("authority/query?", {params: params})
    .then(function (response) { 
      console.log("RESub:", response.data)
      const docs = response.data.response.docs;
      setRowCount(response.data.response.numFound)
      const r = docs.map((doc: any, index: number) => {
        return { id: doc.id, authority: doc.authority[0], type: doc.type };
      });
      setRows(r);
      // Facets
      const fType = TransformFacet(
        response.data.facet_counts.facet_fields.type
      );
      setFacetType(fType);
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