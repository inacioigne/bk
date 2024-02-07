"use client"
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
import { FcCancel } from "react-icons/fc";
import { IoIosSave } from "react-icons/io";
import FormBibframeInstance from "@/components/catalog/forms/formBibframeInstance";


import ModalItems from "@/components/catalog/items/modalFormItems"

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

interface Props {
    // setOpenInstance: Function
    work: any
}

export default function FormCreateInstance(
    { work }: Props
) {

    type SchemaCreateInstance = z.infer<typeof ZodInstance>;
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const [instance, setInstance] = useState(null);
    const [openName, setOpenName] = useState(false);
    const [openSubject, setOpenSubject] = useState(false);
    const [openItems, setOpenItems] = useState(false);

    const [field, setField] = useState("");

    
    const ttitle = {
        mainTitle: work.mainTitle[0],
        subtitle: work?.subtitle
    }
    console.log("W: ", ttitle)


    let defaultValues = {
        type: "Print",
        media: {
            label: "Não mediado",
            uri: "http://id.loc.gov/vocabulary/mediaTypes/n",
        },
        issuance: {
            label: "Monografia",
            uri: "http://id.loc.gov/vocabulary/issuance/mono"
        },
        carrier: {
            label: "Volume",
            uri: "http://id.loc.gov/vocabulary/carriers/nc"
        },
        title: ttitle,
        publication: {

        },
        language: [{
            "label": "por",
            "uri": "http://id.loc.gov/vocabulary/languages/por",
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

    // useEffect(() => {
    //     bkapi
    //         .get("/catalog/instance/next_id")
    //         .then(function (response) {
    //             setId(response.data);
    //             // console.log(response.data);
    //         })
    //         .catch(function (error) {
    //             // manipula erros da requisição
    //             console.error(error);
    //         })
    //         .finally(function () {
    //             // setProgress(false)
    //         });
    // }, [String(id)]);

    function CreateInstance(data: any) {

        let obj = {
            // identifiersLocal: String(id),
            adminMetadata: {
                status: {
                    label: "novo",
                    value: "n"
                },
            },
            instanceOf: {
                uri: `https://bibliokeia.com/catalog/work/${work.identifiersLocal}`,
                label: work.title.mainTitle
            },
            isPartOf: `https://bibliokeia.com/catalog/instance`,
        }

        const request = { ...obj, ...data };
        // console.log("IN:", request)

        setProgress(true)

        bkapi
            .post("catalog/instance/create", request, {
                headers: headers,
            })
            .then(function (response) {
                if (response.status === 201) {
                    request.id = response.data.id
                    setInstance(request)
                    setMessage("Registro criado com sucesso!")
                    setOpenItems(true)
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
        // setOpenItems(true)

    }

    return (
        <>
            <form onSubmit={handleSubmit(CreateInstance)} >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h4" gutterBottom>
                        Criar Instância
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <Button
                            type="submit"
                            sx={{ textTransform: "none" }}
                            variant="outlined"
                            startIcon={<FcCancel />}
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
            {instance &&
                <ModalItems
                    setOpen={setOpenItems}
                    open={openItems}
                    work={work.identifiersLocal}
                    instance={instance} />
            }

        </>

    )
}