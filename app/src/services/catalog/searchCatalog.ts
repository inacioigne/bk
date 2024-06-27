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
    let [mainTitle] = doc.mainTitle;
    let id = doc.id.split("#")[1];
    let title = {
      id: id,
      mainTitle: mainTitle,
      subtitle: doc?.subtitle ? doc.subtitle[0]: false,
    };
    let hasInstance = doc?.hasInstance ? doc.hasInstance : false;


    return {
      id: doc.id.split("#")[1],
      cover: hasInstance ? hasInstance[0].image : false,
      title: title,
      authors: doc.contribution,
      subjects: doc.subject,
      hasInstance: hasInstance,
    };
  });
  return r;
}

export function SearchCatalog(
  params: URLSearchParams,
  setRows: Function,
  setRowCount: Function,
  setFacet: Function
) {
  solr
    .get("catalog/query?", { params: params })
    .then(function (response) {
      const docs = response.data.response.docs;
      const facets = response.data.facets
      setFacet(facets)
      setRowCount(response.data.response.numFound);
      // console.log("RES:", facets)
      let r = ParserDoc(docs);
      setRows(r);
      // params.delete('fq')
      // params.set("fq", "isPartOf:Work");
    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error(error);
    })
    .finally(function () {
      // setProgress(false)
    });
}
