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
import { ZodWork } from "@/schema/bibframe/zodWork"

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// React Hooks
import { useState } from "react";

// BiblioKeia Service
import { bkapi } from "@/services/api";

// React Icons
import { FcCancel } from "react-icons/fc";
import { IoIosSave } from "react-icons/io";
import FormBibframeWork from "@/components/catalog/forms/formBibframeWork";

// BiblioKeia Components
import ModalThesarusNames from "@/components/authorities/modal/modalThesarus";
import ModalThesarus from "@/components/authorities/modal/tmp-modalThesarus";

// Next
import Link from 'next/link'

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

interface Props {
    setWork: Function
    setOpenInstance: Function

}

export default function FormCreateWork(
    // { setWork, setOpenInstance }: Props
    ) {

    type SchemaCreateWork = z.infer<typeof ZodWork>;
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const [openName, setOpenName] = useState(false);
    const [openSubject, setOpenSubject] = useState(false);
    const [field, setField] = useState("");


    let defaultValues = {
        contribution: [
            {
                agent: "",
                label: "",
                role: "http://id.loc.gov/vocabulary/relators/aut",
                roleLabel: "Autor"
            }
        ],
        subject: [
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



    function CreateWork(data: any) {

        let obj = {
            // identifiersLocal: String(id),
            adminMetadata: {
                status: {
                    label: "novo",
                    value: "n"
                },
            },
            isPartOf: `${process.env.BASE_URL}/catalog/work`,
        }

        const request = { ...obj, ...data };
        console.log("WK", request)
        setProgress(true)

        // bkapi
        //     .post("/catalog/work/create", request, {
        //         headers: headers,
        //     })
        //     .then(function (response) {
        //         if (response.status === 201) {
        //             // console.log("RS", response.data);
        //             request.identifiersLocal = response.data.id
        //             setWork(request)
        //             setOpenInstance(true)

        //             setMessage("Registro criado com sucesso!")
        //             //   router.push(`/admin/authority/names/${response.data.id}`);
        //         }
        //     })
        //     .catch(function (error) {
        //         if (error.response.status === 409) {
        //             setTypeAlert("error")
        //             setMessage("Este registro já existe")
        //             // console.error("ER:", error);
        //         }
        //     })
        //     .finally(function () {
        //         setProgress(false)
        //         setOpenSnack(true)
        //     });

    }
    // console.log("ER:", errors)

    return (
        <>
            <form onSubmit={handleSubmit(CreateWork)} >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h4" gutterBottom>
                        Criar Obra
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <Link href={"/admin/catalog"}>
                            <Button
                                sx={{ textTransform: "none" }}
                                variant="outlined"
                                startIcon={<FcCancel />}
                            >
                                Cancelar
                            </Button>
                        </Link>

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