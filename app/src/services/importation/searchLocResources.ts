import { loc } from "@/services/thesarus/loc"
export function SearchLocResources(
  params: URLSearchParams,
  type: string,
  setHits: Function
) {
  // console.log("PR:", params.toString(), type)
  // let works = 'works'
    loc
      .get(`resources${type}suggest2/`, {
        params: params,
      })
      .then((response) => {
        setHits(response.data.hits);
        // console.log(response)
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      })
      .finally(function () {
        // setLoading(false);
      });
}