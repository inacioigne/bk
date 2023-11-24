import { Box, Divider, Typography, Button } from "@mui/material";

// BiblioKeia Components
import FormBibframeWork from "@/components/catalog/forms/formBibframeWork"
import ModalThesarus from "@/components/thesaurus/modal/modalThesarus";

// React-Hook-Form
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import { ZodWork } from "@/schema/bibframe/zodWork"
import { Bibframe } from "@/schema/bibframe"


// MUI Icons
import { IoIosSave } from "react-icons/io";
import { FcCancel } from "react-icons/fc";

// Services BiblioKeia
import { ParserData } from "@/services/catalog/parserData"
import { bkapi } from "@/services/api";

// React Hooks
import { useEffect, useState } from "react";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// Nextjs
import { useRouter } from 'next/navigation'


type SchemaCreateWork = z.infer<typeof ZodWork>;

interface Props {
    hit: Bibframe | null;
    setForm: Function;
}

const headers = {
    accept: "application/json",
    "Content-Type": "application/json", 
};

function GetValue(hit: any) {

    let obj = {
        "type": "Text",
        "title": {
            "type": "http://id.loc.gov/ontologies/bibframe/Title",
            "mainTitle": "Plants.",
            "label": {
                "@value": "Plants."
            }
        },
        "content": {
            "label": "text",
            "uri": "http://id.loc.gov/vocabulary/contentTypes/txt",
            "type": "http://id.loc.gov/ontologies/bibframe/Content"
        },
        "language": [
            {
                "label": "English",
                "lang": "en",
                "uri": "http://id.loc.gov/vocabulary/languages/eng",
                "type": "http://id.loc.gov/ontologies/bibframe/Language"
            }
        ]
    }
    console.log("loc", obj);
    return obj

}

export default function FormLocWork({ hit, setForm }: Props) {
    const router = useRouter()
    const { setProgress } = useProgress();
    const [id, setId] = useState(null);
    const [open, setOpen] = useState(false);
    const [field, setField] = useState("");
    const { setOpenSnack, setMessage } = useAlert();
    // console.log("H: ", hit)

    useEffect(() => {
        bkapi
            .get(`/thesarus/next_id`)
            .then(function (response) {
                setId(response.data);
                // console.log(response.data);
            })
            .catch(function (error) {
                // manipula erros da requisição
                console.error(error);
            })
            .finally(function () {
                // setProgress(false)
            });
    }, [String(id)]);

    // let defaultValues = GetValue(hit)
    let defaultValues = {
        "type": "Text",
        "title": {
            "type": "http://id.loc.gov/ontologies/bibframe/Title",
            "mainTitle": "Teste IMPORT.",
            "label": {
                "@value": "Plants."
            }
        },
        "content": {
            "label": "text",
            "uri": "http://id.loc.gov/vocabulary/contentTypes/txt",
            "type": "http://id.loc.gov/ontologies/bibframe/Content"
        },
       
    }


    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<SchemaCreateWork>({
        resolver: zodResolver(ZodWork),
        defaultValues: hit
    });

    console.log(errors) 
    function CreateWork(data: any) {
        


        // let formData = ParserData(data)

        function RemoveNull(obj: any) {
            const formData = Object.keys(obj).reduce((acc: any, key) => {
                // if (typeof obj[key] === 'object') {
                //     let tmp = RemoveNull(obj[key]);
                //     obj[key] = tmp
                // }
                if (obj[key] !== "") {
                    acc[key] = obj[key];
                }
                return acc;
            }, {});
            return formData;
        }
        //   console.log(data)
        let formData = RemoveNull(data);
        console.log("IR:", formData)
        // let obj = {
        //     identifiersLocal: String(id),
        //     adminMetadata: {
        //         status: {
        //             label: "novo",
        //             value: "n"
        //         },
        //     },
        //     isPartOf: 'https://bibliokeia.com/catalog/works'
        // }
        // let request = { ...obj, ...formData };
        // console.log("CR:", request)




        // setProgress(true)
        // bkapi.post("/catalog/work/create", request, {
        //     headers: headers,
        // })
        //     .then(function (response) {
        //         if (response.status === 201) {
        //             setMessage("Registro criado com sucesso!")
        //             // router.push(`/admin/authority/names/${response.data.id}`);
        //         }
        //     })
        //     .catch(function (error) {
        //         console.error(error);
        //     })
        //     .finally(function () {
        //         setProgress(false)
        //         setOpenSnack(true)
        //     });
    }

    return (
        <Box sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit(CreateWork)}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h4" gutterBottom>
                        Criar Obra - Work
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <Button
                            type="submit"
                            sx={{ textTransform: "none" }}
                            variant="outlined"
                            startIcon={<FcCancel />}
                            onClick={() => { setForm(false) }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            sx={{ textTransform: "none" }}
                            variant="outlined"
                            startIcon={<IoIosSave />}
                        >
                            Salvar
                        </Button>
                    </Box>
                </Box>
                <Divider />
                <FormBibframeWork
                        control={control}
                        register={register}
                        // errors={errors}
                        // getValues={getValues}
                        // setValue={setValue}
                        // setOpen={setOpen}
                        setField={setField} />
            </form>
            {/* <ModalThesarus setOpen={setOpen} open={open} defaultValues={defaultValues} field={field} setValue={setValue} /> */}

        </Box>
    );
}