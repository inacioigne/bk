// BiblioKeia Services
import { solr } from "@/services/solr";

// Types BiblioKeia
// import Facet from "@/utils/types"

import { useProgress } from "@/providers/progress";

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

function ParserDoc(docs: any) {
  const r = docs.map((doc: any, index: number) => {
    let title = {mainTitle: doc.mainTitle, subtitle: doc.subtitle}
    // let authors = {name: doc.contribution}
    return { 
      id: doc.id, 
      title: title, 
      authors: doc.contribution,
      type: doc.type };
  });
  return r

}

export function SearchCatalog(
  params: URLSearchParams,
  setRows: Function,
  setRowCount:Function,
  // setFacetType: Function
) {
  console.log(params.toString())

  // params.getAll('fq').includes("isMemberOfMADSCollection:subjects") && params.delete("fq", "isMemberOfMADSCollection:subjects")

  // if (!params.getAll('fq').includes("isMemberOfMADSCollection:names")) {
  //   params.append("fq", "isMemberOfMADSCollection:names");    
  // }

  solr.get("catalog/query?", {params: params})
    .then(function (response) { 
      const docs = response.data.response.docs;
      setRowCount(response.data.response.numFound)
      let r = ParserDoc(docs)
     
      console.log("RES:", response.data)

      setRows(r);
    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error(error);
    })
    .finally(function () {
      // setProgress(false)
    });
}