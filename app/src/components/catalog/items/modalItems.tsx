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
    // defaultValues: any
    // field: string
}
// Schema
import { ZodItem } from "@/schema/bibframe/zodItem"

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


export default function ModalItems({ setOpen, open }: Props) {
    const [type, setType] = useState("*");
    const [search, setSearch] = useState("");
    const [docs, setDocs] = useState<schemaAuthorityDoc[]>([])
    const [doc, setDoc] = useState<schemaAuthorityDoc | null>(null)

    const { control, register } = useForm<SchemaCreateItem>({
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

    const handleSubmit = (e: any) => {
        e.preventDefault()
        SearchModalSubjects(type, search, setDocs)
        // console.log(type, search)

    };

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
                Criar Items
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {fields.map((field, index) => (
                                    <Box key={index} sx={{display: "flex"}}>
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
                        </form>
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
        </Dialog>
    )

}