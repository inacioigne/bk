
import { schemaMads } from "@/schema/authority";

// Services BiblioKeia
import { ParserData } from "@/services/thesarus/parserData"
import { bkapi } from "@/services/api";

type Types = {
    data: any
    hit: schemaMads
    id: number
    setProgress: Function
    setMessage: Function
    setOpenSnack: Function
    router: any
}

const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
    };

export function CreateNames({data, hit, id, setProgress, setMessage, setOpenSnack, router} : Types) {
    let formData = ParserData(data)
    let obj = {
        type: hit?.type,
        identifiersLocal: String(id),
        identifiersLccn: hit?.identifiersLccn,
        adminMetadata: {
            status: {
                label: "novo",
                value: "n"
            },
        },
        authoritativeLabel: data.birthYearDate ?
            `${data.elementList[0].elementValue.value}, ${data.birthYearDate}` : data.elementList[0].elementValue.value,
    }
    let request = { ...obj, ...formData };
    // console.log("CR:", request)

    setProgress(true)
    bkapi.post("/thesarus/create", request, {
        headers: headers,
    })
        .then(function (response) {
            if (response.status === 201) {
                setMessage("Registro criado com sucesso!")
                router.push(`/admin/authority/${response.data.id}`);
            }
        })
        .catch(function (error) {
            console.error(error);
        })
        .finally(function () {
            setProgress(false)
            setOpenSnack(true)
        });
}