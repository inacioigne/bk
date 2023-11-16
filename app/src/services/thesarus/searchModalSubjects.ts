// BiblioKeia Services
import { solr } from "@/services/solr";

export function SearchModalSubjects(type: String, search: String, setDocs: Function) {
  const params = new URLSearchParams();
  params.set("q", `search_general:${search}*`);
  params.set("fq", `type:${type}`);
  params.set("fl", "*,[child]");


  solr.get("authority/query?", { params: params })
    .then(function (response) {
      console.log("RESub:", response.data)
      const docs = response.data.response.docs;
      setDocs(docs)
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
      // setProgress(false)
    });
}