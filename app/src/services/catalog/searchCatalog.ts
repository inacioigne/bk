// BiblioKeia Services
import { solr } from "@/services/solr";
import { SolrCatalog } from "@/types/solrCatalog";

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

function ParserDoc(docs: SolrCatalog[]) {
  const r = docs.map((doc, index) => {
    let [title] = doc.mainTitle
    // let title = {mainTitle: doc.mainTitle, subtitle: doc.subtitle}
    let [firstInstance] = doc.hasInstance
    // console.log(doc.contribution)
    

    return { 
      id: doc.id.split("#")[1], 
      cover: firstInstance.image,
      title: title, 
      authors: doc.contribution,
      subjects: doc.subject,
      hasInstance: doc.hasInstance };
  });
  return r

}

export function SearchCatalog(
  params: URLSearchParams,
  setRows: Function,
  setRowCount:Function,
  // setFacetType: Function
) {
  // console.log(params.toString())

  // params.getAll('fq').includes("isMemberOfMADSCollection:subjects") && params.delete("fq", "isMemberOfMADSCollection:subjects")

  // if (!params.getAll('fq').includes("isMemberOfMADSCollection:names")) {
  //   params.append("fq", "isMemberOfMADSCollection:names");    
  // }

  solr.get("catalog/query?", {params: params})
    .then(function (response) { 
      const docs = response.data.response.docs;
      setRowCount(response.data.response.numFound)
      console.log("RES:", response.data)
      let r = ParserDoc(docs)
      

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