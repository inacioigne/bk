// MUI
import {
    Box,
    Grid,
    TextField,
    IconButton,
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
    Alert,
    InputAdornment
} from "@mui/material";

import { FormEvent, useEffect, useState } from 'react';

// Schema
import { schemaAuthorityDoc } from "@/schema/solr"

// Services BiblioKeia
import { SearchModalSubjects } from "@/services/thesarus/searchModalSubjects";
import CardBkTheasaurs from "@/components/cards/cardBkThesaurus";

// React-Hook-Form
import { FcSearch } from "react-icons/fc";

interface Props {
    setValue: Function;
    nameField: string;
    setOpenCreate: Function;
    openCreate: boolean;
    setOpen: Function
}

export default function ThesarusSubjects(
    { nameField, setValue, openCreate, setOpenCreate, setOpen }: Props
) {
    const [doc, setDoc] = useState<schemaAuthorityDoc | null>(null)
    const [docs, setDocs] = useState<schemaAuthorityDoc[]>([])
    const [type, setType] = useState("*");
    const [search, setSearch] = useState("");

    useEffect(() => {
        SearchModalSubjects(type, "", setDocs)
    }, [open, openCreate])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setDoc(null)
        SearchModalSubjects(type, search, setDocs)
    };

    return (
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
                                <MenuItem value="Topic">Termo Topico</MenuItem>
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
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Alert severity="info" >
                                Sua busca não retorno nenhum resultado.
                            </Alert>
                        </Box>
                    </Grid> 
                )}
            <Grid item xs={8}>
                {doc ? <CardBkTheasaurs doc={doc} setDoc={setDoc} field={nameField} setValue={setValue} setOpen={setOpen} /> : null}
            </Grid>
        </Grid>
    )

}