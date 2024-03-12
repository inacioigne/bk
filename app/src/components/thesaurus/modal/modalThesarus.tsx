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
}

export default function ModalThesarus({ setOpen, setValue, thesaurus, nameField }: Props) {

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
                    {thesaurus.name === 'names' ?
                        <ThesarusNames
                            nameField={nameField}
                            setValue={setValue}
                            setOpenCreate={setOpenCreate}
                            openCreate={openCreate}
                            setOpen={setOpen} /> :
                        <ThesarusSubjects
                            setValue={setValue}
                            nameField={nameField}
                            setOpenCreate={setOpenCreate}
                            openCreate={openCreate}
                            setOpen={setOpen} />
                    }


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
            <ModalThesarusNamesCreate setOpen={setOpenCreate} open={openCreate} />
        </>
    )

}