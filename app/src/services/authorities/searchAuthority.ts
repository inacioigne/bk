// BiblioKeia Services
import { solr } from "@/services/solr";

// import { useProgress } from "@/providers/progress";

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

function ParserDoc(docs: any) {
  const r = docs.map((doc: any, index: number) => {
    let id = doc.id.split('#')[1]
    let [authority] = doc.authority
    let [isMemberOfMADSCollection] = doc.isMemberOfMADSCollection

    // console.log(doc)
    return { 
      id: id, 
      authority: `${authority}#${id}`, 
      type: doc.type,
      isMemberOfMADSCollection: isMemberOfMADSCollection
    };
  });
  return r

}

export function SearchAuthority(
  params: URLSearchParams,
  setRows: Function,
  setRowCount:Function,
  setFacet: Function
) {
  // console.log(params.toString())

  // params.getAll('fq').includes("isMemberOfMADSCollection:subjects") && params.delete("fq", "isMemberOfMADSCollection:subjects")

  // if (!params.getAll('fq').includes("isMemberOfMADSCollection:names")) {
  //   params.append("fq", "isMemberOfMADSCollection:names");    
  // }

  solr.get("authority/query?", {params: params})
    .then(function (response) { 
      console.log("RES:", response.data.response)
      const docs = response.data.response.docs;
      let numFound = response.data.response.numFound
      const facets = response.data.facets

      setRowCount(numFound)
      if (numFound > 0) {
        facets.type.buckets.shift()
      }      
      setFacet(facets)
      
      
      let r = ParserDoc(docs)
      // console.log("RES:", response.data)
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