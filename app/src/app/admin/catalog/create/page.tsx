"use client"
import {
    Container,
    Box,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    TextField,
    InputAdornment,
    IconButton,
    Divider,
    Button,
    Typography,
    Alert
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";


// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import FormBibframeWork from "@/components/catalog/forms/formBibframeWork"

// React Icons
import { FcHome, FcCancel } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";
import { IoIosSave } from "react-icons/io";


// React-Hook-Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ZodWork } from "@/schema/bibframe/zodWork"
import { Bibframe } from "@/schema/bibframe"

// React Hooks
import { useEffect, useState } from "react";


import Link from "next/link";

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

export default function Create() {
    const [field, setField] = useState("");
    const [open, setOpen] = useState(false);

    type SchemaCreateWork = z.infer<typeof ZodWork>; 
    let defaultValues = {
        "type": "Text",
        "title": {
            "type": "http://id.loc.gov/ontologies/bibframe/Title",
            "mainTitle": "Plants.CREATE",
            "label": {
                "@value": "Plants."
            }
        },
        "content": {
            "label": "text",
            "uri": "http://id.loc.gov/vocabulary/contentTypes/txt",
            "type": "http://id.loc.gov/ontologies/bibframe/Content"
        },
        "language": {
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
        getValues 
    } = useForm<SchemaCreateWork>({
        resolver: zodResolver(ZodWork),
        defaultValues,
    });

    console.log("E: ", errors)

    function CreateWork(data: any) {
        console.log("CR: ", data)

        // setProgress(true)
        // let formData = ParserData(data)
    
        // let obj = {
        //   identifiersLocal: String(id),
        //   adminMetadata: {
        //     status: {
        //       label: "novo", 
        //       value: "n"
        //     },
        //   },
        //   isMemberOfMADSCollection: "names",
        //   authoritativeLabel: data.birthYearDate ?
        //     `${data.elementList[0].elementValue.value}, ${data.birthYearDate}` : data.elementList[0].elementValue.value,
        // }
        
    
        // const request = { ...obj, ...formData };
        // // 
    
        // bkapi
        //   .post("/thesarus/create", request, {
        //     headers: headers,
        //   })
        //   .then(function (response) {
        //     if (response.status === 201) {
        //       // console.log(response);
        //       setMessage("Registro criado com sucesso!")
        //       router.push(`/admin/authority/names/${response.data.id}`);
        //     }
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   })
        //   .finally(function () {
        //     setProgress(false)
        //     setOpenSnack(true)
        //   });
    
      }
    return (
        <Container maxWidth="xl" sx={{ py: "1rem" }}>
            <BreadcrumbsBK
                previousPaths={previousPaths}
                currentPath="Catálogo"
            />
            <Divider sx={{ mt: "10px" }} />
            <Paper elevation={3} sx={{ p: "15px", mt: "10px", height: 500 }}>
                <form onSubmit={handleSubmit(CreateWork)}
                >
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
                        // errors={errors}
                        // getValues={getValues}
                        // setValue={setValue}
                        // setOpen={setOpen}
                        setField={setField} />

                </form>
            </Paper>
        </Container>
    )
}