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

interface Props {
    setOpen: Function;
    setValue: Function;
    thesaurus: object;
    defaultValues: any
    field: string
}

export default function ModalThesarusNames({ setOpen, setValue, thesaurus, field }: Props) {

    console.log("T:", thesaurus)
    const [type, setType] = useState("*");
    const [search, setSearch] = useState("");
    const [openCreate, setOpenCreate] = useState(false)
    const [docs, setDocs] = useState<schemaAuthorityDoc[]>([])
    const [doc, setDoc] = useState<schemaAuthorityDoc | null>(null)
    const handleClose = () => {
        setOpen({name: "", open: false});
    };

    useEffect(() => {

        SearchModalNames(type, "", setDocs)
        // console.log("E:", search )
    }, [open, openCreate])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setDoc(null)
        SearchModalNames(type, search, setDocs)
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <FormControl
                                    sx={{ width: "30%" }}
                                    size="small"
                                >
                                    <InputLabel id="label">Selecione uma opção</InputLabel>
                                    <Select
                                        labelId="label"
                                        id="demo-simple-select"
                                        value={type}
                                        label="Selecione uma opção"
                                        onChange={(e) => {
                                            setType(e.target.value)
                                        }}
                                    >
                                        <MenuItem value="*">Todos</MenuItem>
                                        <MenuItem value="Geographic">Termo Geográfico</MenuItem>
                                        <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
                                        <MenuItem value="CorporateName">Nome Coorporativo</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    sx={{ width: "70%" }}
                                    value={search}
                                    label="Assunto"
                                    size="small"
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                position="start"
                                                sx={{ cursor: "pointer" }}
                                            >
                                                <IconButton type="submit">
                                                    <FcSearch />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />
                            </Box>
                        </form>
                    </Grid>
                    {docs.length > 0 ?
                        <Grid item xs={4}>
                            <Paper elevation={3}>
                                <List dense={true}>
                                    {
                                        docs.map((doc, index) => (
                                            <div key={index}>
                                                <ListItem disablePadding >
                                                    <ListItemButton onClick={() => { setDoc(doc) }}>
                                                        <ListItemIcon>
                                                            <Avatar sx={{ width: 24, height: 24, fontSize: 15 }}>
                                                                {doc.type[0]}
                                                            </Avatar>
                                                        </ListItemIcon>
                                                        <ListItemText primary={doc.authority} />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                            </div>
                                        ))
                                    }
                                </List>
                            </Paper>
                        </Grid> : (
                            <Grid item xs={12}>
                                <Box sx={{ 
                                    display: "flex", 
                                    gap: "5px",
                                    justifyContent: "center", 
                                    flexDirection: "column",
                                    alignItems: "center" }}>
                                    <Alert severity="info" >
                                        Sua busca não retornou nenhum resultado.
                                    </Alert>
                                    {/* <Link href={"/admin/authority/names/create"}> */}
                                    <Button 
                                    variant="outlined" 
                                    size="small"
                                    onClick={() => {setOpenCreate(true)}}
                                    >Criar Autoridade</Button>                                    
                                </Box>
                            </Grid>
                        )}
                    <Grid item xs={8}>
                        {doc ? <CardBkNames doc={doc} setDoc={setDoc} field={field} setValue={setValue} setOpen={setOpen} /> : null}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
            </DialogActions>
        </Dialog>
        <ModalThesarusNamesCreate setOpen={setOpenCreate} open={openCreate} />
        </>
    )

}