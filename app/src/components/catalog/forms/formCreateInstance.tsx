import {
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
import { ZodInstance } from "@/schema/bibframe/zodInstance"

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// React Hooks
import { useEffect, useState } from "react";

import { bkapi } from "@/services/api";

// React Icons
import { FcHome, FcCancel } from "react-icons/fc";
import { IoIosSave } from "react-icons/io";
import FormBibframeInstance from "@/components/catalog/forms/formBibframeInstance";

import ModalThesarusNames from "@/components/thesaurus/modal/modalThesarusNames";
import ModalThesarus from "@/components/thesaurus/modal/modalThesarus";

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

interface Props {
    setInstance: Function
    work: any
}

export default function FormCreateInstance(
    { setInstance, work }: Props
    ) {
        console.log("I:", work)

    type SchemaCreateInstance = z.infer<typeof ZodInstance>;
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const [id, setId] = useState(null);
    const [openName, setOpenName] = useState(false);
    const [openSubject, setOpenSubject] = useState(false);
    const [field, setField] = useState("");


    let defaultValues = {
        "type": "Print",
        "media": {
            "label": "Não mediado",
            "uri": "http://id.loc.gov/vocabulary/mediaTypes/n",
        },
        title: work?.title,
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
    } = useForm<SchemaCreateInstance>({
        resolver: zodResolver(ZodInstance),
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

    function CreateInstance(data: any) {

        let obj = {
            identifiersLocal: String(id),
            adminMetadata: {
                status: {
                    label: "novo",
                    value: "n"
                },
            },
            isPartOf: "https://bibliokeia.com/catalog/instances",
        }

        const request = { ...obj, ...data };
        console.log("CR: ", request)
        setProgress(true)
        // setOpen(true)

        // bkapi
        //     .post("/catalog/work/create", request, {
        //         headers: headers,
        //     })
        //     .then(function (response) {
        //         if (response.status === 201) {
        //             console.log(response);
        //             setMessage("Registro criado com sucesso!")
        //             //   router.push(`/admin/authority/names/${response.data.id}`);
        //         }
        //     })
        //     .catch(function (error) {
        //         if (error.response.status === 409) {
        //             setTypeAlert("error")
        //             setMessage("Este registro já existe")
        //             console.error("ER:", error);
        //         }
        //     })
        //     .finally(function () {
        //         setProgress(false)
        //         setOpenSnack(true)
        //     });

    }

    return (
        <>
            <form onSubmit={handleSubmit(CreateInstance)} >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h4" gutterBottom>
                        Criar Instância - {id}
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
                <FormBibframeInstance
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