"use client"
import {
    Container,
    Box,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Divider,
    Button,
    Typography,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import ModalThesarusNames from "@/components/thesaurus/modal/modalThesarusNames";
import ModalThesarus from "@/components/thesaurus/modal/modalThesarus";

// React Icons
import { FcHome, FcCancel } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";

// React-Hook-Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ZodWork } from "@/schema/bibframe/zodWork"

// React Hooks
import { useEffect, useState } from "react";

import { bkapi } from "@/services/api";


// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";
import FormCreateWork from "@/components/catalog/forms/formCreateWork";

const previousPaths = [
    {
        link: "/admin",
        label: "Início",
        icon: <FcHome fontSize="small" />,
    },
    {
        link: "/admin/catalog",
        label: "Catálogo",
        icon: <GiBookshelf fontSize="small" />,
    },
];

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

export default function Create() {
    const [field, setField] = useState("");
    const [openName, setOpenName] = useState(false);
    const [openSubject, setOpenSubject] = useState(false);

    const [id, setId] = useState(null);
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();

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

    type SchemaCreateWork = z.infer<typeof ZodWork>;
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

    console.log("E: ", errors)

    // function CreateWork(data: any) {

    //     // setProgress(true)

    //     let obj = {
    //         identifiersLocal: String(id),
    //         adminMetadata: {
    //             status: {
    //                 label: "novo",
    //                 value: "n"
    //             },
    //         },
    //         isPartOf: "https://bibliokeia.com/catalog/works",
    //     }

    //     const request = { ...obj, ...data };
    //     console.log("CR: ", request)
    //     setProgress(true)
    //     bkapi
    //         .post("/catalog/work/create", request, {
    //             headers: headers,
    //         })
    //         .then(function (response) {
    //             if (response.status === 201) {
    //                 console.log(response);
    //                 setMessage("Registro criado com sucesso!")
    //                 //   router.push(`/admin/authority/names/${response.data.id}`);
    //             }
    //         })
    //         .catch(function (error) {
    //             if (error.response.status === 409) {
    //                 setTypeAlert("error")
    //                 setMessage("Este registro já existe")
    //                 console.error("ER:", error);
    //             }
    //         })
    //         .finally(function () {
    //             setProgress(false)
    //             setOpenSnack(true)
    //         });

    // }

    return (
        <Container maxWidth="xl" sx={{ py: "1rem" }}>
            <BreadcrumbsBK
                previousPaths={previousPaths}
                currentPath="Catálogo"
            />
            <Divider sx={{ mt: "10px" }} />
            <Paper elevation={3} sx={{
                p: "15px", mt: "10px"
            }}>
                <FormCreateWork
                    // defaultValues={defaultValues}
                    // setOpenName={setOpenName}
                    // setOpenSubject={setOpenSubject}
                    // setField={setField}
                    // setValue={setValue} 
                    />
                {/* <form onSubmit={handleSubmit(CreateWork)} >
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
                        // getValues={getValues}
                        setValue={setValue}
                        setOpenName={setOpenName}
                        setOpenSubject={setOpenSubject}
                        setField={setField} />
                </form> */}
                {/* <ModalThesarusNames
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
                    setValue={setValue} /> */}
            </Paper>
        </Container>
    )
}