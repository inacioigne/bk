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

import { useEffect, useState } from "react";

// React-Hook-Form
import { FcSearch } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";

import Link from "next/link";

// Services BiblioKeia
import { SearchModalNames } from "@/services/thesarus/searchModalNames"

// Components BiblioKeia
import CardBkNames from "@/components/cards/cardBkNames";
import ModalThesarusNamesCreate from "@/components/thesaurus/modal/modalThesarusNamesCreate"

import { schemaAuthorityDoc } from "@/schema/solr"
import ThesarusNames from "./thesarusNames";
import ThesarusSubjects from "./thesarusSubjects";
import SearchThesaurus from "./searchThesarus";

type Typethesaurus = {
    name: string | undefined;
    open: boolean;
}

interface Props {
    setOpen: Function;
    setValue: Function;
    thesaurus: Typethesaurus;
    defaultValues: any
    nameField: string
    nameSubField: string
}

export default function ModalThesarus({ setOpen, setValue, thesaurus, nameField, nameSubField }: Props) {

    // console.log("SUB: ", thesaurus.name)  

    const [openCreate, setOpenCreate] = useState(false)

    const handleClose = () => {
        setOpen({ name: "", open: false });
    };

    return (
        <>
            <Dialog
                open={thesaurus.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle id="alert-dialog-title" sx={{ display: "flex", justifyContent: "space-between" }}>
                    {thesaurus.name}
                    <IconButton onClick={handleClose} color="primary"><IoCloseSharp /></IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <SearchThesaurus 
                        openCreate={openCreate}
                        collection={thesaurus?.name}
                        setOpenCreate={setOpenCreate} 
                        setValue={setValue} 
                        nameField={nameField} 
                        setOpen={setOpen}
                        nameSubField={nameSubField} />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
            <ModalThesarusNamesCreate setOpen={setOpenCreate} open={openCreate} />
        </>
    )

}