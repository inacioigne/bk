import {
    // Container,
    Box,
    Divider,
    Button,
    Typography,
} from "@mui/material";

// React-Hook-Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema
import { ZodWork } from "@/schema/bibframe/zodWork"

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// React Hooks
import { useEffect, useState } from "react";

import { bkapi } from "@/services/api";

// React Icons
import { FcHome, FcCancel } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";
import { IoIosSave } from "react-icons/io";
import FormBibframeWork from "@/components/catalog/forms/formBibframeWork";

import ModalThesarusNames from "@/components/thesaurus/modal/modalThesarusNames";
import ModalThesarus from "@/components/thesaurus/modal/modalThesarus";

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

interface Props {
    setOpenName: Function,
    setOpenSubject: Function,
    defaultValues: any,
    setField: Function,
    setValue: Function
}

export default function FormCreateWork() {

    type SchemaCreateWork = z.infer<typeof ZodWork>;
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const [id, setId] = useState(null);
    const [openName, setOpenName] = useState(false);
    const [openSubject, setOpenSubject] = useState(false);
    const [field, setField] = useState("");


    let defaultValues = {
        "contribution": [
            {
                "agent": "",
                "label": "",
                "role": "http://id.loc.gov/vocabulary/relators/aut",
                "roleLabel": "Autor"
            }
        ],
        "subject": [
            {
                label: "",
                lang: "por",
                uri: "",
                type: "Topic"
            }
        ],
        "type": "Text",
        "content": {
            "label": "Texto",
            "uri": "http://id.loc.gov/vocabulary/contentTypes/txt",
        },
        "language": [{
            "label": "por",
            "uri": "http://id.loc.gov/vocabulary/languages/por",
            // "type": ""
        }]

    }
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm<SchemaCreateWork>({
        resolver: zodResolver(ZodWork),
        defaultValues,
    });

    useEffect(() => {
        bkapi
            .get("/catalog/next_id")
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

    function CreateWork(data: any) {

        let obj = {
            identifiersLocal: String(id),
            adminMetadata: {
                status: {
                    label: "novo",
                    value: "n"
                },
            },
            isPartOf: "https://bibliokeia.com/catalog/works",
        }

        const request = { ...obj, ...data };
        console.log("CR: ", request)
        setProgress(true)
        bkapi
            .post("/catalog/work/create", request, {
                headers: headers,
            })
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    setMessage("Registro criado com sucesso!")
                    //   router.push(`/admin/authority/names/${response.data.id}`);
                }
            })
            .catch(function (error) {
                if (error.response.status === 409) {
                    setTypeAlert("error")
                    setMessage("Este registro já existe")
                    console.error("ER:", error);
                }
            })
            .finally(function () {
                setProgress(false)
                setOpenSnack(true)
            });

    }

    return (
        <>
            <form onSubmit={handleSubmit(CreateWork)} >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h4" gutterBottom>
                        Criar Obra - {id}
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <Button
                            type="submit"
                            sx={{ textTransform: "none" }}
                            variant="outlined"
                            startIcon={<FcCancel />}
                        // onClick={() => { setForm(false) }}
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
                    errors={errors}
                    setValue={setValue}
                    setOpenName={setOpenName}
                    setOpenSubject={setOpenSubject}
                    setField={setField} />
            </form>
            <ModalThesarusNames
                setOpen={setOpenName}
                open={openName}
                defaultValues={defaultValues}
                field={field}
                setValue={setValue} />

            <ModalThesarus
                setOpen={setOpenSubject}
                open={openSubject}
                defaultValues={defaultValues}
                field={field}
                setValue={setValue} />
        </>

    )
}