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

// React-Hook-Form
import { FcSearch } from "react-icons/fc";

// BiblioKeia Services
import { solr } from "@/services/solr";

import CardBkNames from "@/components/cards/cardBkNames";

function MakeSearch(type: String, search: String, setDocs: Function, collection: string | undefined) {
    const params = new URLSearchParams();
    params.set("q", `search_general:${search}*`);
    params.set("fq", `type:${type}`);
    params.set("fl", "*,[child]");
    params.append("fq", `isMemberOfMADSCollection:${collection}`);


    solr.get("authority/query?", { params: params })
        .then(function (response) {
            // console.log("RENames:", response.data)
            const docs = response.data.response.docs;
            setDocs(docs)
        })
        .catch(function (error) {
            console.error(error);
        })
        .finally(function () {
            // setProgress(false)
        });
}

interface Props {
    setValue: Function;
    nameField: string;
    setOpenCreate: Function;
    openCreate: boolean;
    setOpen: Function;
    collection: string | undefined;
    nameSubField: string
}

export default function SearchThesaurus(
    { collection, openCreate, setOpenCreate, nameField, setValue, setOpen, nameSubField }: Props
) {
    const [doc, setDoc] = useState<schemaAuthorityDoc | null>(null)
    const [docs, setDocs] = useState<schemaAuthorityDoc[]>([])
    const [type, setType] = useState("*");
    const [search, setSearch] = useState("");

    useEffect(() => {
        MakeSearch(type, search, setDocs, collection)
    }, [open, openCreate])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setDoc(null)
        MakeSearch(type, search, setDocs, collection)
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
                                <MenuItem value="Geographic">Termo Geográfico</MenuItem>
                                <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
                                <MenuItem value="CorporateName">Nome Coorporativo</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ width: "70%" }}
                            value={search}
                            label="Busca"
                            size="small"
                            onChange={(e) => {
                                setSearch(e.target.value)
                                // SearchModalNames(type, e.target.value, setDocs)
                            }}
                            // onKeyDown={(event) => {
                            //     console.log("ENTER", event)
                            // }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        position="start"
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <IconButton >
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
            {
                docs.length > 0 ? (
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

                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        <Box sx={{
                            display: "flex",
                            gap: "5px",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <Alert severity="info" >
                                Sua busca não retornou nenhum resultado.
                            </Alert>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => { setOpenCreate(true) }}
                            >Criar Autoridade</Button>
                        </Box>
                    </Grid>
                )
            }
            <Grid item xs={8}>
                {doc ?
                    <CardBkNames
                        doc={doc}
                        setDoc={setDoc}
                        field={nameField} 
                        setValue={setValue} 
                        setOpen={setOpen} 
                        nameSubField={nameSubField} /> : null}
            </Grid>

        </Grid>
    )
}