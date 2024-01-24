"use client";
// MUI
import {
    Box,
    Grid,
    TextField,
    IconButton,
    DialogContent,
    DialogTitle,
    Dialog,
    InputAdornment,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Avatar,
    ListItemText,
    ListItemButton,
    Paper,
    Alert
} from "@mui/material";

// React
import { Fragment, useEffect, useState } from "react";

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { IoIosSave } from "react-icons/io";


import { FcSearch } from "react-icons/fc";

// Services BiblioKeia
import { SearchModalSubjects } from "@/services/thesarus/searchModalSubjects"
// import CardBkTheasaurs from "@/components/cards/cardBkThesaurus";

import { schemaAuthorityDoc } from "@/schema/solr"

// React-Hook-Form
import { useForm } from "react-hook-form";
import { useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
    setOpen: Function;
    open: boolean;
    instance: number
}

// Schema
import { ZodItem } from "@/schema/bibframe/zodItem"

import { bkapi } from "@/services/api";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

type SchemaCreateItem = z.infer<typeof ZodItem>;

const defaultValues = {
    items: [{
        cdd: "",
        cutter: "",
        year: "",
        collection: "",
        shelf: "",
        barcode: "",
    }],
}

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};


export default function ModalItems({ setOpen, open, work, instance }: Props) {
    const [type, setType] = useState("*");
    const [search, setSearch] = useState("");
    const [docs, setDocs] = useState<schemaAuthorityDoc[]>([])
    const [doc, setDoc] = useState<schemaAuthorityDoc | null>(null)
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const { setProgress } = useProgress();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SchemaCreateItem>({
        resolver: zodResolver(ZodItem),
        defaultValues,
    });

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "items",
    });

    const handleClose = () => {
        setOpen(false);
    };

    const addField = () => {
        append({
            cdd: "",
            cutter: "",
            year: "",
            collection: "",
            shelf: "",
            barcode: "",
        });
    };
    // console.log('E:', errors)

    function CreateItems(data: any) {

        let items = data.items.map((item: any) => {
            item['adminMetadata'] = {
                label: "novo",
                value: "n"
            }
            return item
        })
        let request = {
            "itemOf": instance,
            "instanceOf": work,
            "items": items
        }

        bkapi
            .post("catalog/items/create", request, {
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
                setOpen(false)
            });

        // console.log("I:", request)

    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={"lg"}
        >
            <DialogTitle id="alert-dialog-title">
                Criar Items {instance}
            </DialogTitle>
            <Divider />
            <form onSubmit={handleSubmit(CreateItems)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {fields.map((field, index) => (
                                    <Box key={index} sx={{ display: "flex" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="CDD"
                                                size="small"
                                                {...register(`items.${index}.cdd`)}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Cutter"
                                                size="small"
                                                {...register(`items.${index}.cutter`)}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Ano"
                                                size="small"
                                                {...register(`items.${index}.year`)}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Coleção"
                                                size="small"
                                                {...register(`items.${index}.collection`)}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Localização"
                                                size="small"
                                                {...register(`items.${index}.shelf`)}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Registro"
                                                size="small"
                                                {...register(`items.${index}.barcode`)}
                                            />
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <IconButton
                                                aria-label="add"
                                                onClick={addField}
                                                color="primary"
                                            >
                                                <IoAddOutline />
                                            </IconButton>
                                            <IconButton
                                                aria-label="add"
                                                onClick={() => {
                                                    remove(index);
                                                }}
                                                color="primary"
                                            >
                                                <IoRemove />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: "flex", gap: "10px", alignItems: "center", pb: "10px", pr: "10px" }}>
                        <Button
                            type="submit"
                            sx={{ textTransform: "none" }}
                            variant="outlined"
                            size="small"
                            onClick={handleClose}
                            startIcon={<FcCancel />}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            sx={{ textTransform: "none" }}
                            variant="outlined"
                            size="small"
                            startIcon={<IoIosSave />}
                        >
                            Salvar
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    )

}