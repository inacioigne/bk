import { loc } from "@/services/thesarus/loc"
export function SearchLCSH(
  params: URLSearchParams,
  setHits: Function
) {
    loc
      .get("authorities/suggest2/", {
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